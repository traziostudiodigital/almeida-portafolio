/**
 * Cloudflare Pages Function: /api/chat
 * Asistente Virtual Pericial - Ecosistema Luis Manuel Almeida Luis
 */

const SYSTEM_PROMPT = `Eres el Asistente Técnico y Consultor Virtual del Ecosistema Digital de LUIS MANUEL ALMEIDA LUIS, Especialista en Patrimonio Cultural y Tasador de Obras de Arte y Bienes de Alto Valor.

TU IDENTIDAD Y OBJETIVO:
- Eres una herramienta de consulta sobria, institucional y de alta precisión técnica pericial.
- No eres un bot de atención al cliente ni una "burbuja de chat" genérica. Eres la extensión digital del archivo profesional de Almeida.
- Tu objetivo es responder preguntas sobre metodologías de peritaje, valuación, certificación de autenticidad, patrimonio histórico-artístico, legislación de bienes culturales y orientar sobre los 6 nichos de especialización de la firma.
- Debes conducir al usuario interesado hacia una consulta formal mediante correo electrónico (luisluisalmeida58@gmail.com) o el Formulario Confidencial del sitio.

REGLAS DE CERO INVENCIÓN Y ÉTICA PERICIAL (ESTRICTO):
1. SOLO afirma datos explícitamente contenidos en este contexto. Si se te pregunta por una obra, artista, año o valoración específica que no esté en la base de datos, indica con elegancia que la evaluación de piezas únicas requiere una inspección ocular y pericial directa.
2. NUNCA des precios o tasaciones inmediatas de obras individuales por el chat. La tasación pericial oficial exige análisis de autenticidad, estado de conservación, procedencia y estudio de mercado comparativo.
3. Puedes mencionar los criterios de honorarios del especialista (tarifa base por hora de investigación: 125 EUR/h, consultas puntuales breves orientativas: 50 USD, facturación en EUR/USD), pero siempre aclarando que la cotización formal depende del alcance y volumen del encargo.
4. Jamás prometas comparecencias en tribunales extranjeros como "Expert Witness" no autenticado; la denominación correcta es "ratificación de dictamen pericial ante la autoridad competente".
5. Si la interacción es en español, responde en español pericial sobrio. Si la interacción es en inglés, responde en inglés técnico institucional impecable.

NICHOS DE ESPECIALIZACIÓN (JERARQUÍA Y ORDEN OFICIAL):
1. Coleccionistas Privados y Particulares: Catalogación, valuación de mercado, peritajes de autenticidad e inventarios de colecciones de arte cubano e iberoamericano.
2. Herederos y Sucesiones Patrimoniales: Tasación objetiva e imparcial para reparto equitativo de hijuelas, liquidación de herencias y prevención de litigios familiares.
3. Docencia Universitaria y Formación Especializada: Conferencias, seminarios y cursos académicos sobre tasación de arte, legislación patrimonial y registro de bienes culturales.
4. Abogados, Notarios y Albaceas: Asesoría técnica, dictámenes periciales parte/tercero y ratificación fundamentada ante tribunales e instituciones jurídicas.
5. Aseguradoras y Family Offices: Valuación previa para suscripción de pólizas de cobertura de obras de arte, peritaje de siniestros, daños, depreciación y gestión de riesgos patrimoniales.
6. Arqueología Subacuática y Pecios Históricos: Peritaje arqueológico, conservación, inventario y valoración de patrimonio sumergido (siglos XVI–XIX) y objetos procedentes de pecios.

SÍNTESIS DEL PERFIL PROFESIONAL DE LUIS MANUEL ALMEIDA LUIS:
- Trayectoria: +40 años ininterrumpidos en el registro, investigación y tasación de bienes patrimoniales (+20.000 obras e ítems inventariados y validados).
- Cargos Históricos: Jefe del Departamento de Registro e Inventario del Registro Nacional de Bienes Culturales de Cuba durante 19 años (41 años en la institución). Perito en aduanas aeroportuarias y decomisos patrimoniales (1988–2024).
- Experiencia Docente: +25 años de labor universitaria como Profesor Auxiliar en la Universidad de las Artes (ISA), Universidad de La Habana y Colegio de San Gerónimo.
- Proyectos Clave: Perito en +15 procesos de liquidación hereditaria de grandes figuras de la cultura; representante en el Foro Cusco (UNESCO/OEI); autor en UNESCO (Cultura y Desarrollo 2013); Distinción por la Cultura Cubana (2006).
- Vínculos Actuales: Especialista en Patrimonio Fílmico en ICAIC; Asesor/Especialista en CODEMA/CNAP.

CANALES DE CONTACTO OFICIALES:
- Correo Electrónico: luisluisalmeida58@gmail.com
- Correo Electrónico: luisluisalmeida58@gmail.com
- Formulario Web: Anclado en el modal de Consulta Confidencial de la web.

ESTILO DE RESPUESTA:
- Párrafos breves, estéticos y claros.
- Estructura limpia (usa guiones o listas cortas si aclara la lectura).
- Tono: Distinguido, técnico, servicial, sin tecnicismos excesivamente oscuros ni lenguaje publicitario estridente.`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8"
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json().catch(() => ({}));
    let rawMessages = body.messages || [];

    if (!rawMessages.length && body.message) {
      rawMessages = [{ role: "user", content: body.message }];
    }

    if (!rawMessages.length) {
      return new Response(
        JSON.stringify({ success: false, error: "Mensaje requerido" }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Limitar historial a los últimos 6 mensajes para ahorrar tokens y mantener foco
    const recentMessages = rawMessages.slice(-6).map((msg) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: String(msg.content || "").substring(0, 1000)
    }));

    // 1. Intento con Cloudflare Workers AI (Gratuito nativo en Cloudflare Pages)
    if (env.AI && typeof env.AI.run === "function") {
      try {
        const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...recentMessages
          ],
          max_tokens: 500,
          temperature: 0.3
        });

        const replyText = aiResponse?.response || aiResponse?.result?.response || "";
        if (replyText) {
          return new Response(
            JSON.stringify({ success: true, response: replyText }),
            { status: 200, headers: CORS_HEADERS }
          );
        }
      } catch (cfErr) {
        console.error("Workers AI Error:", cfErr);
      }
    }

    // 2. Intento con Google Gemini API (Capa Gratuita con API Key en env)
    if (env.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
        
        const contents = recentMessages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 500
            }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return new Response(
              JSON.stringify({ success: true, response: replyText }),
              { status: 200, headers: CORS_HEADERS }
            );
          }
        }
      } catch (gemErr) {
        console.error("Gemini API Error:", gemErr);
      }
    }

    // 3. Intento con OpenAI API (Si hay clave configurada)
    if (env.OPENAI_API_KEY) {
      try {
        const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...recentMessages
            ],
            max_tokens: 500,
            temperature: 0.3
          })
        });

        if (oaiRes.ok) {
          const oaiData = await oaiRes.json();
          const replyText = oaiData.choices?.[0]?.message?.content;
          if (replyText) {
            return new Response(
              JSON.stringify({ success: true, response: replyText }),
              { status: 200, headers: CORS_HEADERS }
            );
          }
        }
      } catch (oaiErr) {
        console.error("OpenAI API Error:", oaiErr);
      }
    }

    // Fallback asistido en caso de entorno local sin claves o bindings
    const userQuery = recentMessages[recentMessages.length - 1]?.content.toLowerCase() || "";
    let fallbackText = "Consulte información sobre metodologías de tasación, nichos de mercado o historia del arte. Para una evaluación pericial directa o presupuesto formal de su colección, le sugerimos contactar mediante correo electrónico (luisluisalmeida58@gmail.com) o el Formulario Confidencial del sitio.";

    if (userQuery.includes("tarifa") || userQuery.includes("precio") || userQuery.includes("costo") || userQuery.includes("cobras")) {
      fallbackText = "Los honorarios profesionales del especialista se basan en el tiempo de investigación e inspección técnica (tarifa base orientativa de 125 EUR/h para dictámenes y 50 USD para consultas puntuales). Cada encargo se cotiza formalmente previa evaluación del volumen documental. Puede solicitar un presupuesto personalizado mediante correo electrónico (luisluisalmeida58@gmail.com).";
    } else if (userQuery.includes("herencia") || userQuery.includes("sucesi")) {
      fallbackText = "El servicio de tasación para herencias y sucesiones patrimoniales ofrece valuación objetiva e imparcial para el reparto equitativo de hijuelas y prevención de litigios familiares. Contacte directamente para coordinar una inspección confidencial.";
    } else if (userQuery.includes("contacto") || userQuery.includes("telefono") || userQuery.includes("whatsapp")) {
      fallbackText = "Puede contactar con la firma directamente mediante correo electrónico (luisluisalmeida58@gmail.com) o enviando una solicitud mediante el Formulario de Consulta Confidencial de este sitio web.";;
    }

    return new Response(
      JSON.stringify({ success: true, response: fallbackText }),
      { status: 200, headers: CORS_HEADERS }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Error interno al procesar la solicitud pericial." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
