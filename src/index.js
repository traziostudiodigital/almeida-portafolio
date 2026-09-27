/**
 * Cloudflare Worker: /api/chat
 * Asistente Virtual Pericial - Ecosistema Luis Manuel Almeida Luis
 * Implementación real con Groq + KV + Detección de Nicho
 * Adaptado para Worker estándar (sin Pages Functions)
 */

import { CONTEXT_BLOCKS, NICHE_KEYWORDS, getI18nMessage } from './context/index.js';

const ALLOWED_ORIGINS = [
  'https://almeidatasacion.com',
  'https://www.almeidatasacion.com'
];

const DAILY_CAP = 600;
const KV_KEY_PREFIX = 'chat_count:';
const KV_SESSION_PREFIX = 'chat_session:';
const KV_TTL_SECONDS = 90000; // ~25 hours
const SESSION_TTL_SECONDS = 604800; // 7 days (7 * 24 * 60 * 60)
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const RELAY_ENDPOINT = 'https://traziostudio--1892a740ba7911f19bc11607ee4eb77e.web.val.run';
const MODEL_FALLBACK_CHAIN = [
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
  'llama-3.3-70b-versatile'
];
const MAX_TOKENS = 220;
const TEMPERATURE = 0.3;

function getCorsHeaders(origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin"
  };
}

function detectNiche(lastUserMessage, lang = 'es') {
  const text = (lastUserMessage || '').toLowerCase();
  const scores = {};

  for (const [niche, keywords] of Object.entries(NICHE_KEYWORDS)) {
    const langKeywords = keywords[lang] || keywords.es;
    let count = 0;
    for (const kw of langKeywords) {
      if (text.includes(kw.toLowerCase())) count++;
    }
    if (count > 0) scores[niche] = count;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (sorted.length >= 2 && sorted[0][1] > 0 && sorted[1][1] > 0) {
    return [sorted[0][0], sorted[1][0]];
  }
  if (sorted.length >= 1 && sorted[0][1] > 0) {
    return [sorted[0][0]];
  }
  return ['perfil'];
}

function buildSystemPrompt(detectedNiches, lang) {
  const isEn = lang === 'en';

  const toneInstruction = isEn
    ? 'You are a senior art appraisal expert. Tone: formal, clinical, sober. No marketing adjectives. Neutral English (no regionalisms).'
    : 'Eres un perito tasador senior de arte. Tono: formal, clínico, sobrio. Sin adjetivos de marketing. Español neutro sin argentinismos.';

  const zeroInventionRule = isEn
    ? 'ZERO INVENTION RULE: Never invent data outside the provided CONTEXT. If information is not in the context, state that it is not available in the technical archive.'
    : 'REGLA DE CERO INVENCIÓN: Nunca inventes datos fuera del CONTEXTO proporcionado. Si la información no está en el contexto, indica que no consta en el archivo técnico.';

  const closingRule = isEn
    ? 'CLOSING RULE: Naturally invite the user to write by email for a confidential evaluation. Never sound like a marketing CTA or tech support. Never mention WhatsApp.'
    : 'REGLA DE CIERRE: Invita naturalmente a escribir por correo para evaluación confidencial. Nunca suenes a CTA de marketing ni soporte técnico. Nunca menciones WhatsApp.';

  const contextBlocks = detectedNiches
    .map(n => CONTEXT_BLOCKS[n]?.[lang] || '')
    .filter(Boolean)
    .join('\n\n---\n\n');

  const lengthRule = isEn
    ? 'LENGTH RULE: Adapt response length to the actual complexity of the question. - Simple/direct questions: 2-4 concise sentences. - Technical explanations requiring methodological detail (e.g., appraisal process, case methodological breakdown): up to 6-7 sentences, never more. - NEVER use preambles, NEVER repeat the user question, go DIRECTLY to the point.'
    : 'REGLA DE LONGITUD: Adapta la extensión a la complejidad real de la pregunta. - Preguntas simples/directas: 2-4 oraciones concisas. - Preguntas técnicas que requieren explicación metodológica (ej. proceso de tasación, desglose metodológico de un caso documentado): hasta 6-7 oraciones, nunca más. - NUNCA uses preámbulos, NUNCA repitas la pregunta del usuario, ve SIEMPRE directo al punto.';

  return `${toneInstruction}\n\n${zeroInventionRule}\n\n${closingRule}\n\n${lengthRule}\n\n=== CONTEXTO TÉCNICO ===\n${contextBlocks}`;
}

async function callGroq(messages, systemPrompt, apiKey, relaySecret) {
  for (const model of MODEL_FALLBACK_CHAIN) {
    const payload = {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE
    };

    let response;
    try {
      response = await fetch(RELAY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-relay-secret': relaySecret,
          'x-groq-key': apiKey
        },
        body: JSON.stringify(payload)
      });
    } catch (networkErr) {
      // Network errors should fail immediately - not a model issue
      throw { status: 503, message: 'Network error contacting relay', data: networkErr };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // 429 (rate limit) or 404 (model unavailable) - try next model
      if (response.status === 429 || response.status === 404) {
        console.warn(`[callGroq] Model ${model} failed with status ${response.status}, trying next...`);
        continue;
      }
      
      // Any other error (401, 500, etc.) - fail immediately
      throw { status: response.status, message: errorData.error?.message || 'Relay/Groq API error', data: errorData };
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
  }

  // All models exhausted
  throw { 
    status: 502, 
    message: `Se agotó la cadena de fallback de modelos: ${MODEL_FALLBACK_CHAIN.join(', ')}`,
    data: { tried: MODEL_FALLBACK_CHAIN }
  };
}

async function checkDailyCounter(env, lang) {
  const today = new Date().toISOString().split('T')[0];
  const key = `${KV_KEY_PREFIX}${today}`;
  const count = parseInt(await env.CHAT_KV.get(key) || '0', 10);

  if (count >= DAILY_CAP) {
    const msg = getI18nMessage('chat.daily_limit_msg', lang);
    return { limitReached: true, response: msg, key, count };
  }
  return { limitReached: false, key, count };
}

async function incrementDailyCounter(env, key) {
  const newCount = parseInt(await env.CHAT_KV.get(key) || '0', 10) + 1;
  await env.CHAT_KV.put(key, String(newCount), { expirationTtl: KV_TTL_SECONDS });
  return newCount;
}

async function getSessionHistory(env, sessionId) {
  if (!env?.CHAT_KV || !sessionId) return [];
  try {
    const raw = await env.CHAT_KV.get(`${KV_SESSION_PREFIX}${sessionId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[Chat API] Error al leer historial de KV:', err);
    return [];
  }
}

async function saveSessionHistory(env, sessionId, history) {
  if (!env?.CHAT_KV || !sessionId || !Array.isArray(history)) return;
  try {
    const trimmed = history.slice(-20);
    await env.CHAT_KV.put(
      `${KV_SESSION_PREFIX}${sessionId}`,
      JSON.stringify(trimmed),
      { expirationTtl: SESSION_TTL_SECONDS }
    );
  } catch (err) {
    console.error('[Chat API] Error al guardar historial en KV:', err);
  }
}

async function handleChatRequest(request, env) {
  const origin = request.headers.get('Origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const body = await request.json().catch(() => ({}));
    let messages = body.messages || [];
    const lang = (body.lang || 'es').toLowerCase();
    const validLang = ['es', 'en'].includes(lang) ? lang : 'es';
    const sessionId = body.sessionId || body.session_id || null;

    // Si sessionId existe, sincronizar/recuperar historial desde KV
    if (sessionId && env?.CHAT_KV) {
      const storedHistory = await getSessionHistory(env, sessionId);
      if (storedHistory.length > 0) {
        if (!messages.length) {
          messages = storedHistory;
        } else if (messages.length === 1 && messages[0].role === 'user') {
          // El cliente envió únicamente el nuevo mensaje del usuario
          messages = [...storedHistory, messages[0]];
        }
      }
    }

    if (!messages.length) {
      return new Response(
        JSON.stringify({ success: false, error: 'Mensaje requerido' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Último mensaje del usuario
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) {
      return new Response(
        JSON.stringify({ success: false, error: 'No se encontró mensaje de usuario' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. Verificar límite diario ANTES de llamar a Groq
    const dailyCheck = await checkDailyCounter(env, validLang);
    if (dailyCheck.limitReached) {
      return new Response(
        JSON.stringify({ success: true, response: dailyCheck.response, limitReached: true }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 2. Detectar nicho(s) por keywords en último mensaje user
    const detectedNiches = detectNiche(lastUserMessage.content, validLang);

    // 3. Construir system prompt dinámico
    const systemPrompt = buildSystemPrompt(detectedNiches, validLang);

    // 4. Llamar a Groq
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('[Chat API] GROQ_API_KEY no configurada');
      return new Response(
        JSON.stringify({ success: false, error: 'Configuración de servidor incompleta' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const relaySecret = env.RELAY_SECRET;
    if (!relaySecret) {
      console.error('[Chat API] RELAY_SECRET no configurada');
      return new Response(
        JSON.stringify({ success: false, error: 'Configuración de servidor incompleta' }),
        { status: 500, headers: corsHeaders }
      );
    }

    let groqResponse;
    try {
      groqResponse = await callGroq(messages, systemPrompt, apiKey, relaySecret);
    } catch (groqErr) {
      if (groqErr.status === 429) {
        const msg = getI18nMessage('chat.error_msg', validLang);
        return new Response(
          JSON.stringify({ success: true, response: msg, limitReached: true }),
          { status: 200, headers: corsHeaders }
        );
      }
      console.error('[Chat API] Error Groq:', groqErr);
      console.error('[DEBUG] groqErr completo:', JSON.stringify(groqErr));
      throw groqErr;
    }

    // 5. Incrementar contador KV SOLO tras éxito
    await incrementDailyCounter(env, dailyCheck.key);

    // 6. Guardar historial actualizado en KV
    if (sessionId) {
      const updatedHistory = [
        ...messages,
        { role: 'assistant', content: groqResponse }
      ];
      await saveSessionHistory(env, sessionId, updatedHistory);
    }

    // 7. Respuesta exitosa
    return new Response(
      JSON.stringify({ success: true, response: groqResponse, sessionId }),
      { status: 200, headers: corsHeaders }
    );

} catch (error) {
      console.error("[Chat API Error]:", error);
      const errorDetail = error.message || JSON.stringify(error, Object.getOwnPropertyNames(error)) || "Error desconocido";
      return new Response(
        JSON.stringify({ success: false, error: errorDetail }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Enrutar al Chat IA
    if (url.pathname === '/api/chat') {
      return handleChatRequest(request, env);
    }

    // Fallback: Servir los archivos estáticos de la web
    return env.ASSETS.fetch(request);
  }
};