/**
 * chat-ia.js — Módulo UI del Widget de Chat IA Pericial
 * Ecosistema Digital Luis Manuel Almeida Luis
 * Arquitectura: Vanilla JS modular, Event Delegation, i18n nativo, sin dependencias externas.
 */

(function () {
  'use strict';

  const API_ENDPOINT = '/api/chat';

  // Estado del Widget
  let state = {
    isOpen: false,
    isLoading: false,
    history: [],
    language: 'es',
    sessionId: Math.random().toString(36).substr(2, 9), // Session ID efímero
    turnCount: 0 // Contador de turnos efímero
  };

  // Referencias DOM
  const els = {};

// Utilidad i18n ligera (usa window.i18nData si existe, sino keys directas)
  function t(key) {
    const lang = (window.i18nCore && window.i18nCore.currentLang) || document.documentElement.lang || state.language || 'es';
    if (window.i18nData && window.i18nData[lang] && window.i18nData[lang][key]) {
      return window.i18nData[lang][key];
    }
    if (window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key);
    }
    // Fallback hardcoded de seguridad
    const fallback = {
      'chat.header_title': 'Consulta Pericial IA',
      'chat.header_subtitle': 'Asistencia técnica basada en el archivo pericial de Almeida',
      'chat.bot_label': 'Archivo Almeida · Asistente',
      'chat.user_label': 'Usted',
      'chat.welcome_msg': 'Consulte información sobre metodologías de tasación, catalogación patrimonial o alcance pericial en los 6 nichos de especialización. Asistente técnico del ecosistema Almeida.',
      'chat.analyzing': 'Consultando dictámenes y archivo pericial...',
      'chat.input_placeholder': 'Escriba su consulta pericial...',
      'chat.footer_notice': 'Atención confidencial · Dictámenes bajo estricto secreto profesional',
      'chat.error_msg': 'No se pudo conectar con el servicio pericial. Inténtelo nuevamente o contacte directamente por los canales oficiales.',
      'chat.empty_warning': 'Por favor, formule una consulta pericial.'
    };
    return fallback[key] || key;
  }

  // Renderizar un mensaje en el DOM
  function renderMessage(role, content) {
    const container = els.messages;
    if (!container) return;

    const isBot = role === 'assistant' || role === 'bot';
    const wrapper = document.createElement('div');
    wrapper.className = isBot
      ? 'pb-3 border-b border-[#B08D57]/20 last:border-0'
      : 'pb-3 border-b border-[#B08D57]/10 last:border-0 text-right';

    const label = isBot
      ? `<span class="block text-[10px] uppercase font-semibold text-[#B08D57] mb-1" data-i18n="chat.bot_label">${t('chat.bot_label')}</span>`
      : `<span class="block text-[10px] uppercase font-semibold text-[#2E3238]/60 mb-1 text-right" data-i18n="chat.user_label">Usted</span>`;

    wrapper.innerHTML = `${label}<p class="text-xs leading-relaxed ${isBot ? 'text-[#2E3238]' : 'text-[#2E3238]'}">${escapeHtml(content)}</p>`;
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
  }

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

  // Renderizar historial completo (al abrir)
  function renderHistory() {
    if (!els.messages) return;
    els.messages.innerHTML = '';
    if (state.history.length === 0) {
      // Mensaje de bienvenida si no hay historial
      renderMessage('bot', t('chat.welcome_msg'));
    } else {
      state.history.forEach(msg => renderMessage(msg.role, msg.content));
    }
  }

  // Mostrar/Ocultar indicador de carga
  function setLoading(loading) {
    state.isLoading = loading;
    if (els.loading) els.loading.classList.toggle('hidden', !loading);
    if (els.input) els.input.disabled = loading;
    if (els.submitBtn) els.submitBtn.disabled = loading;
  }

  // Enviar mensaje al backend
async function sendMessage(text) {
     if (state.isLoading || !text.trim()) return;

     const userText = text.trim();
     renderMessage('user', userText);
     state.history.push({ role: 'user', content: userText });
     state.turnCount++;

     // LÍMITE DE SESIÓN: 8 turnos totales (user+assistant = 4 intercambios completos)
     const SESSION_TURN_LIMIT = 8;
     if (state.turnCount >= SESSION_TURN_LIMIT) {
       renderMessage('bot', t('chat.session_limit_msg'));
       if (els.input) els.input.disabled = true;
       if (els.submitBtn) els.submitBtn.disabled = true;
       return;
     }

     setLoading(true);

     try {
       const res = await fetch(API_ENDPOINT, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           messages: state.history,
           lang: state.language,
           sessionId: state.sessionId
         })
       });

       const data = await res.json();

       if (data.success && data.response) {
         renderMessage('bot', data.response);
         state.history.push({ role: 'assistant', content: data.response });
         state.turnCount++;
       } else {
         throw new Error(data.error || 'Respuesta inválida del servidor');
       }
     } catch (err) {
       console.error('[Chat IA] Error:', err);
       renderMessage('bot', t('chat.error_msg'));
     } finally {
       setLoading(false);
     }
   }

  // Toggle ventana
  function toggleWindow(open) {
    if (typeof open === 'boolean') state.isOpen = open;
    else state.isOpen = !state.isOpen;

    els.window.classList.toggle('hidden', !state.isOpen);
    els.trigger.setAttribute('aria-expanded', state.isOpen);

    if (state.isOpen) {
      // Foco en input al abrir
      setTimeout(() => els.input?.focus(), 100);
      renderHistory();
    }
  }

  // Inicializar referencias DOM
  function cacheElements() {
    els.widget = document.getElementById('chat-ia-widget');
    els.window = document.getElementById('chat-ia-window');
    els.trigger = document.getElementById('chat-ia-trigger');
    els.closeBtn = document.getElementById('chat-ia-close');
    els.messages = document.getElementById('chat-ia-messages');
    els.loading = document.getElementById('chat-ia-loading');
    els.form = document.getElementById('chat-ia-form');
    els.input = document.getElementById('chat-ia-input');
    els.submitBtn = els.form?.querySelector('button[type="submit"]');
  }

  // Event Listeners
  function bindEvents() {
    if (!els.widget) return;

    // Abrir/Cerrar
    els.trigger?.addEventListener('click', () => toggleWindow(true));
    els.closeBtn?.addEventListener('click', () => toggleWindow(false));

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) toggleWindow(false);
    });

    // Submit form
    els.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = els.input?.value || '';
      if (text.trim()) {
        els.input.value = '';
        sendMessage(text);
      }
    });

    // Click fuera para cerrar (opcional, solo si no es el trigger)
    document.addEventListener('click', (e) => {
      if (state.isOpen && !els.widget.contains(e.target)) {
        toggleWindow(false);
      }
    });
  }

  // Sincronizar idioma con i18n global
  function syncLanguage() {
    if (window.i18nCore && window.i18nCore.currentLang) {
      state.language = window.i18nCore.currentLang;
    } else if (document.documentElement.lang) {
      state.language = document.documentElement.lang;
    }
    // Actualizar placeholders y textos estáticos si el widget está abierto
    if (els.input) els.input.placeholder = t('chat.input_placeholder');
    // Re-renderizar textos con data-i18n
    if (window.i18nCore && typeof window.i18nCore.translateAll === 'function') {
      window.i18nCore.translateAll();
    }
  }

  // API Pública para control externo si se necesita
  window.ChatIA = {
    open: () => toggleWindow(true),
    close: () => toggleWindow(false),
    toggle: () => toggleWindow(),
    send: (text) => sendMessage(text)
  };

// Inicialización
   function init() {
     cacheElements();
     if (!els.widget) {
       console.warn('[Chat IA] Componente no encontrado en el DOM');
       return;
     }
     bindEvents();
     syncLanguage();
 
     // Escuchar cambios de idioma globales
     if (window.i18n && typeof window.i18n.onLangChange === 'function') {
       window.i18n.onLangChange(syncLanguage);
     }
 
     console.log('[Chat IA] Widget inicializado correctamente');
   }

  // Arranque seguro (DOMContentLoaded o inmediato si ya cargó)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();