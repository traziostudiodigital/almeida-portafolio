/**
 * chat-ia.js — Módulo UI del Widget de Chat IA Pericial
 * Ecosistema Digital Luis Manuel Almeida Luis
 * Arquitectura: Vanilla JS modular, Event Delegation, i18n nativo, sin dependencias externas.
 */

(function () {
  'use strict';

  const API_ENDPOINT = '/api/chat';
  const STORAGE_KEY = 'almeida_chat_history';

  // Estado del Widget
  let state = {
    isOpen: false,
    isLoading: false,
    history: [],
    language: 'es'
  };

  // Referencias DOM
  const els = {};

  // Utilidad i18n ligera (usa window.i18n si existe, sino keys directas)
  function t(key) {
    if (window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key);
    }
    // Fallback hardcoded solo para claves del chat (evita flicker si i18n tarda)
    const fallback = {
      'chat.header_title': 'Consulta Pericial IA',
      'chat.header_subtitle': 'IA entrenada con el archivo profesional de Almeida',
      'chat.bot_label': 'Archivo Almeida · Asistente',
      'chat.welcome_msg': 'Consulte información sobre metodologías de tasación, nichos de mercado o legislación patrimonial. Asistente técnico del ecosistema Almeida.',
      'chat.analyzing': 'Consultando dictámenes y archivo pericial...',
      'chat.input_placeholder': 'Escriba su consulta pericial...',
      'chat.footer_notice': 'Atención confidencial · WhatsApp: +53 52493677',
      'chat.error_msg': 'No se pudo conectar con el archivo pericial. Inténtelo de nuevo o contacte por WhatsApp.',
      'chat.empty_warning': 'Por favor, escriba una consulta.'
    };
    return fallback[key] || key;
  }

  // Cargar historial desde localStorage (persistencia ligera entre recargas)
  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          state.history = parsed.slice(-12); // límite de 12 mensajes guardados
        }
      }
    } catch (e) {
      console.warn('[Chat IA] Error cargando historial:', e);
    }
  }

  // Guardar historial
  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history));
    } catch (e) {
      console.warn('[Chat IA] Error guardando historial:', e);
    }
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
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, ''');
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
    saveHistory();

    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: state.history })
      });

      const data = await res.json();

      if (data.success && data.response) {
        renderMessage('bot', data.response);
        state.history.push({ role: 'assistant', content: data.response });
        saveHistory();
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
    if (window.i18n && typeof window.i18n.getLang === 'function') {
      state.language = window.i18n.getLang();
    }
    // Actualizar placeholders y textos estáticos si el widget está abierto
    if (els.input) els.input.placeholder = t('chat.input_placeholder');
    // Re-renderizar textos con data-i18n si el motor global no lo hace automáticamente
    if (window.i18n && typeof window.i18n.translatePage === 'function') {
      window.i18n.translatePage(state.language);
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
    loadHistory();
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