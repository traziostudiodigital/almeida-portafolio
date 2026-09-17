/**
 * web/assets/app.js
 * Módulo de inicialización global, control de menú móvil con bloqueo de scroll,
 * gestión de modal de contacto y validación de formulario de encargo pericial.
 *
 * Subfase 5.3.5 del Roadmap. Sigue las directrices de docs/ARCHITECTURE.md:
 * - Event Delegation para handlers dinámicos
 * - Atributos data-i18n gestionados por i18n-core.js
 * - Integración con otros módulos via API pública (window.CursorHero, window.SelectorPaneles)
 *
 * Dependencias: i18n-data.js, i18n-core.js (cargados antes en el HTML)
 */

(function () {
  'use strict';

  // ==========================================
  // ESTADO DEL MÓDULO
  // ==========================================
  let isInitialized = false;
  let scrollPosition = 0; // Para restauración de scroll al desbloquear
  let lastActiveElement = null; // Para restauración de foco

  // ==========================================
  // SELECTORES (IDs y clases de los componentes)
  // ==========================================
  const SELECTORS = {
    // Header
    header: '#main-header',

    // Mobile Menu
    mobileTrigger: '#mobile-menu-trigger',
    mobileClose: '#mobile-menu-close',
    mobileOverlay: '#mobile-overlay',

    // Modal de Contacto
    modal: '#contact-modal',
    modalContainer: '#modal-container',
    modalClose: '#modal-close',
    modalWhatsApp: '#modal-whatsapp-btn',
    modalFormBtn: '#modal-form-btn',

    // Formulario Slide-over
    formOverlay: '#contact-form-overlay',
    formClose: '#contact-form-close',
    form: '#encargo-pericial-form',

    // Botones que abren el modal (desde header y mobile overlay)
    ctaHeaderBtn: '#cta-header-btn',
    ctaMobileBtn: '#mobile-overlay-cta-btn',

    // Botones que abren el formulario slide-over (desde páginas de nicho)
    openFormBtn: '#open-form-btn',

    // Botones de WhatsApp en páginas de nicho
    whatsappBtn: '.whatsapp-btn',

    // Para cerrar modales haciendo click fuera
    modalBackdrop: '#contact-modal',
    formBackdrop: '#contact-form-overlay'
  };

  // ==========================================
  // FUNCIONES DE UTILIDAD
  // ==========================================

  /**
   * Bloquea/desbloquea el scroll del body, manteniendo la posición visual.
   * Usa la técnica de position:fixed estándar para evitar saltos en iOS.
   */
  function toggleBodyScroll(lock) {
    if (lock) {
      scrollPosition = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPosition + 'px';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPosition);
    }
  }

  /**
   * Encuentra el primer elemento enfocable dentro de un contenedor
   */
  function getFirstFocusableElement(container) {
    if (!container) return null;
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    const elements = container.querySelectorAll(focusableSelectors);
    return elements.length > 0 ? elements[0] : null;
  }

  // ==========================================
  // WHATSAPP BUTTONS (DYNAMIC HREFS)
  // ==========================================

  function updateWhatsAppButtons() {
    const buttons = document.querySelectorAll(SELECTORS.whatsappBtn);
    // TODO: El número de teléfono de WhatsApp podría ser dinámico o configurable si se requiere.
    const phoneNumber = '34666555444'; // Asumo un número de teléfono fijo, el problema no menciona que sea dinámico.

    buttons.forEach(button => {
      const i18nKey = button.getAttribute('data-i18n-whatsapp');
      if (i18nKey && window.i18nCore && window.i18nData) {
        const currentLang = window.i18nCore.currentLang;
        // i18nData usa claves planas (ej. "n1.cta.whatsapp"), acceso directo sin anidación.
        const dict = window.i18nData[currentLang];
        const whatsappMessage = dict ? dict[i18nKey] : undefined;

        if (whatsappMessage) {
          const encodedMessage = encodeURIComponent(whatsappMessage);
          button.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        } else {
          console.warn(`[WhatsApp] Mensaje no encontrado para la clave "${i18nKey}" en idioma "${currentLang}"`);
          button.href = `https://wa.me/${phoneNumber}`; // Fallback a un enlace sin mensaje
        }
      }
    });
  }

  // ==========================================
  // MENÚ MÓVIL
  // ==========================================

  function openMobileMenu() {
    var overlay = document.querySelector(SELECTORS.mobileOverlay);
    var trigger = document.querySelector(SELECTORS.mobileTrigger);
    if (!overlay) return;

    overlay.classList.remove('translate-x-full', 'pointer-events-none');
    overlay.classList.add('translate-x-0', 'pointer-events-auto');
    overlay.setAttribute('aria-hidden', 'false');

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'true');
    }

    // Guardar elemento activo para restaurar foco al cerrar
    lastActiveElement = document.activeElement;

    toggleBodyScroll(true);
  }

  function closeMobileMenu() {
    var overlay = document.querySelector(SELECTORS.mobileOverlay);
    var trigger = document.querySelector(SELECTORS.mobileTrigger);
    if (!overlay) return;

    overlay.classList.add('translate-x-full', 'pointer-events-none');
    overlay.classList.remove('translate-x-0', 'pointer-events-auto');
    overlay.setAttribute('aria-hidden', 'true');

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }

    toggleBodyScroll(false);

    // Restaurar foco al trigger
    if (trigger) {
      trigger.focus();
    }
    lastActiveElement = null;
  }

  // ==========================================
  // MODAL DE CONTACTO
  // ==========================================

  function openModal() {
    var modal = document.querySelector(SELECTORS.modal);
    var container = document.querySelector(SELECTORS.modalContainer);
    if (!modal) return;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    if (container) {
      container.classList.remove('scale-95');
      container.classList.add('scale-100');
    }

    // Guardar elemento activo
    lastActiveElement = document.activeElement;

    toggleBodyScroll(true);

    // Mover foco al modal tras la transición
    setTimeout(function () {
      var firstFocusable = getFirstFocusableElement(modal);
      if (firstFocusable) firstFocusable.focus();
    }, 150);
  }

  function closeModal(restoreFocus) {
    var modal = document.querySelector(SELECTORS.modal);
    var container = document.querySelector(SELECTORS.modalContainer);
    if (!modal) return;

    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    if (container) {
      container.classList.add('scale-95');
      container.classList.remove('scale-100');
    }

    toggleBodyScroll(false);

    // Restaurar foco al elemento que abrió el modal
    if (restoreFocus !== false && lastActiveElement) {
      lastActiveElement.focus();
    }
    lastActiveElement = null;
  }

  // ==========================================
  // FORMULARIO SLIDE-OVER
  // ==========================================

  function openFormOverlay() {
    // Cerrar modal primero si está abierto
    closeModal(false);

    var overlay = document.querySelector(SELECTORS.formOverlay);
    if (!overlay) return;

    overlay.classList.remove('translate-x-full');
    overlay.classList.add('translate-x-0');

    // Guardar elemento activo
    lastActiveElement = document.activeElement;

    toggleBodyScroll(true);

    // Mover foco al primer campo del formulario
    setTimeout(function () {
      var form = document.querySelector(SELECTORS.form);
      if (form) {
        var firstInput = form.querySelector('input:not([type="hidden"]):not([type="checkbox"])');
        if (firstInput) firstInput.focus();
      }
    }, 350); // Después de la transición slide
  }

  function closeFormOverlay() {
    var overlay = document.querySelector(SELECTORS.formOverlay);
    if (!overlay) return;

    overlay.classList.remove('translate-x-0');
    overlay.classList.add('translate-x-full');

    toggleBodyScroll(false);

    // Restaurar foco
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
    lastActiveElement = null;
  }

  // ==========================================
  // VALIDACIÓN Y ENVÍO DEL FORMULARIO
  // ==========================================

  function handleFormSubmit(e) {
    e.preventDefault();

    var form = e.target;

    // Validación HTML5 nativa
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    var originalText = submitBtn.textContent || 'Enviar';
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    var formData = new FormData(form);
    var action = form.getAttribute('action');

    // Envío mediante Fetch con fallback a mailto
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        // Redirigir a página de confirmación
        window.location.href = 'gracias.html';
      } else {
        throw new Error('Error de envío (código ' + response.status + ')');
      }
    })
    .catch(function () {
      // Fallback: restaurar botón y abrir mailto con datos del formulario
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      var name = formData.get('nombre') || '';
      var email = formData.get('email') || '';
      var message = formData.get('mensaje') || '';
      var nicho = formData.get('nicho_interes') || '';
      var telefono = formData.get('telefono') || '';

      var subject = 'Hoja de Encargo - ' + name;
      var body = 'Nombre: ' + name + '%0D%0A' +
                 'Email: ' + email + '%0D%0A' +
                 'Teléfono: ' + telefono + '%0D%0A' +
                 'Área de Interés: ' + nicho + '%0D%0A%0D%0A' +
                 'Mensaje:%0D%0A' + message;

      window.location.href = 'mailto:luisluisalmeida58@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + body;

      // Mostrar notificación al usuario
      alert('El envío directo no pudo completarse. Se ha abierto su cliente de correo para que complete el envío manualmente.');
    });
  }

  // ==========================================
  // EVENTOS DE TECLADO (Escape para cerrar)
  // ==========================================

  function handleKeydown(e) {
    if (e.key !== 'Escape') return;

    var modal = document.querySelector(SELECTORS.modal);
    var formOverlay = document.querySelector(SELECTORS.formOverlay);
    var mobileOverlay = document.querySelector(SELECTORS.mobileOverlay);

    // Orden de cierre: modal -> form overlay -> menú móvil
    if (modal && !modal.classList.contains('opacity-0')) {
      closeModal(true);
      e.preventDefault();
    } else if (formOverlay && !formOverlay.classList.contains('translate-x-full')) {
      closeFormOverlay();
      e.preventDefault();
    } else if (mobileOverlay && mobileOverlay.classList.contains('translate-x-0')) {
      closeMobileMenu();
      e.preventDefault();
    }
  }

  // ==========================================
  // EVENT DELEGATION (un solo listener en document)
  // ==========================================

  function handleDocumentClick(e) {
    var target = e.target;

    // --- Mobile Menu Trigger ---
    if (target.closest(SELECTORS.mobileTrigger)) {
      e.preventDefault();
      openMobileMenu();
      return;
    }

    // --- Mobile Menu Close ---
    if (target.closest(SELECTORS.mobileClose)) {
      e.preventDefault();
      closeMobileMenu();
      return;
    }

    // --- CTA Header Button (abre modal) ---
    if (target.closest(SELECTORS.ctaHeaderBtn)) {
      e.preventDefault();
      closeMobileMenu(); // Por si el menú móvil está abierto
      openModal();
      return;
    }

    // --- CTA Mobile Overlay Button (abre modal) ---
    if (target.closest(SELECTORS.ctaMobileBtn)) {
      e.preventDefault();
      closeMobileMenu(); // Cerrar menú primero
      openModal();
      return;
    }

    // --- Modal Close ---
    if (target.closest(SELECTORS.modalClose)) {
      e.preventDefault();
      closeModal(true);
      return;
    }

    // --- Modal: Click en botón "Enviar Formulario" ---
    if (target.closest(SELECTORS.modalFormBtn)) {
      e.preventDefault();
      openFormOverlay();
      return;
    }

    // --- Open Form Button (desde nicho pages) ---
    if (target.closest(SELECTORS.openFormBtn)) {
      e.preventDefault();
      openFormOverlay();
      return;
    }

    // --- Form Overlay Close ---
    if (target.closest(SELECTORS.formClose)) {
      e.preventDefault();
      closeFormOverlay();
      return;
    }

    // --- Click fuera del modal (backdrop) ---
    if (target.matches(SELECTORS.modalBackdrop)) {
      closeModal(true);
      return;
    }

    // --- Click fuera del form overlay (backdrop) ---
    if (target.matches(SELECTORS.formBackdrop)) {
      closeFormOverlay();
      return;
    }
  }

  // ==========================================
  // HEADER: EFECTO DE SOMBRA AL SCROLL
  // ==========================================

  function initHeaderScrollEffect() {
    var header = document.querySelector(SELECTORS.header);
    if (!header) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;

      if (scrollY > 50) {
        header.classList.add('shadow-sm');
        header.style.backgroundColor = 'rgba(234, 231, 226, 0.95)';
      } else {
        header.classList.remove('shadow-sm');
        header.style.backgroundColor = 'rgba(234, 231, 226, 0.9)';
      }
    }, { passive: true });
  }

  // ==========================================
  // NOTIFICACIÓN DE CAMBIO DE IDIOMA
  // ==========================================

  /**
   * Observa cambios en el atributo lang del <html> (modificado por i18n-core.js)
   * y notifica a los otros módulos que exponen API pública.
   */
  function setupLanguageObserver() {
    var target = document.documentElement;

    var observer = new MutationObserver(function () {
      var newLang = target.getAttribute('lang');

      // Notificar a CursorHero si está presente
      if (window.CursorHero && typeof window.CursorHero.onLanguageChange === 'function') {
        window.CursorHero.onLanguageChange(newLang);
      }

// Notificar a SelectorPaneles si está presente
         if (window.SelectorPaneles && typeof window.SelectorPaneles.onLanguageChange === 'function') {
           window.SelectorPaneles.onLanguageChange();
         }

         // Notificar a HeroStagger si está presente
         if (window.HeroStagger && typeof window.HeroStagger.reinit === 'function') {
           window.HeroStagger.reinit();
         }

         // Actualizar los botones de WhatsApp
        updateWhatsAppButtons();
      });

    observer.observe(target, { attributes: true, attributeFilter: ['lang'] });
  }

  // ==========================================
  // INICIALIZACIÓN PRINCIPAL
  // ==========================================

  function init() {
    if (isInitialized) return;

    // Registrar event delegation global (un solo listener)
    document.addEventListener('click', handleDocumentClick, { passive: false });

    // Keyboard handler global (Escape)
    document.addEventListener('keydown', handleKeydown, { passive: false });

    // Efecto de scroll en el header
    initHeaderScrollEffect();

    // Observar cambios de idioma para notificar a otros módulos
    setupLanguageObserver();

    // Actualizar los href de los botones de WhatsApp
    updateWhatsAppButtons();

    // Vincular submit del formulario
    var form = document.querySelector(SELECTORS.form);
    if (form) {
      form.addEventListener('submit', handleFormSubmit, { passive: false });
    }

    isInitialized = true;
  }

  // ==========================================
  // ARRANQUE SEGURO (readyState check)
  // ==========================================

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  // Delay para asegurar que i18n-core.js, cursor-hero.js y selector-paneles.js
  // ya se inicializaron (todos usan setTimeout de 50-100ms en su ready)
  ready(function () {
    setTimeout(init, 250);
  });

  // ==========================================
  // API PÚBLICA
  // ==========================================

  window.App = {
    init: init,
    openModal: openModal,
    closeModal: closeModal,
    openFormOverlay: openFormOverlay,
    closeFormOverlay: closeFormOverlay,
    openMobileMenu: openMobileMenu,
    closeMobileMenu: closeMobileMenu
  };

})();