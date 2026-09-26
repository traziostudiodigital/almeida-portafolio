/**
 * assets/scroll-reveal.js
 * Motor de animación de entrada scroll-reveal usando IntersectionObserver.
 * Alternancia rítmica: izquierda (left) y derecha (right) según data-reveal.
 * Sigue la Subfase 5.3.4 del Roadmap y las directrices de ARCHITECTURE.md.
 * 
 * Funcionamiento:
 * - Los elementos con data-reveal se ocultan inicialmente mediante opacity-0
 * - Al entrar en viewport, se añade opacity-100 y se anima el transform
 * - Usa clases Tailwind definidas en el CSS (transition-all, duration-700, ease-out)
 */

(function () {
  'use strict';

  // ==========================================
  // ESTADO DEL MÓDULO
  // ==========================================
  let observer = null;
  let isInitialized = false;
  let elementsToReveal = [];

  // ==========================================
  // CONFIGURACIÓN
  // ==========================================
  const CONFIG = {
    threshold: 0.1, // 10% del elemento visible para disparar
    rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de entrar en viewport
  };

  // ==========================================
  // SELECTORES
  // ==========================================
  const SELECTORS = {
    revealElements: '[data-reveal]',
    hiddenClass: 'opacity-0',
    visibleClass: 'opacity-100'
  };

  // ==========================================
  // UTILIDADES
  // ==========================================

  /**
   * Aplica la transición de revelado a un elemento
   */
  function revealElement(element) {
    if (!element) return;

    const revealType = element.getAttribute('data-reveal');

    // Agregar opacidad visible
    element.classList.add(SELECTORS.visibleClass);

    // Aplicar transform según tipo - usando estilos inline para control preciso
    element.style.transform = 'translateX(0)';

    // Asegurar que el elemento no tenga opacity-0
    element.classList.remove(SELECTORS.hiddenClass);

    // FASE C: Activar animación de línea SVG si existe dentro del elemento revelado
    const lineDrawSvg = element.querySelector('.line-draw-svg');
    if (lineDrawSvg) lineDrawSvg.classList.add('is-drawn');
    // FASE F: Revelar contenedor de imagen duotono si existe
    const photoDuotone = element.querySelector('.photo-duotone');
    if (photoDuotone) photoDuotone.classList.add('is-revealed');

    // Remover observer de este elemento ya que se reveló
    if (observer && element) {
      observer.unobserve(element);
    }
  }

  /**
   * Inicializa transform para elementos ocultos
   */
  function initializeElements() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrowMobile = window.innerWidth < 640;

  elementsToReveal = Array.from(document.querySelectorAll(SELECTORS.revealElements));

  if (prefersReduced || isNarrowMobile) {
    // Revelar todo instantáneamente, sin observer, sin transform inicial
    elementsToReveal.forEach(el => {
      revealElement(el);
      el.style.transform = 'none';
    });
    elementsToReveal = []; // Vaciar para que initObserver() no observe nada
    return;
  }

  elementsToReveal.forEach(function (element) {
      const revealType = element.getAttribute('data-reveal');

      // Estado inicial: invisibilidad
      element.classList.add(SELECTORS.hiddenClass);

      // Estado inicial: desplazamiento según tipo
      // Estas transiciones se aplican vía CSS Tailwind en los templates
      // Solo necesitamos establecer el estado inicial aquí
      switch (revealType) {
        case 'left':
          element.style.transform = 'translateX(-30px)';
          break;
        case 'right':
          element.style.transform = 'translateX(30px)';
          break;
        case 'up':
        default:
          element.style.transform = 'translateY(30px)';
          break;
      }
    });
  }

  /**
   * Callback del IntersectionObserver
   */
  function handleIntersection(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        revealElement(entry.target);
      }
    });
  }

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================

  /**
   * Inicializa el observer de intersección
   */
  function initObserver() {
    // Fallback para navegadores sin IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      console.warn('[ScrollReveal] IntersectionObserver no soportado, revelando elementos inmediatamente');
      elementsToReveal.forEach(revealElement);
      return;
    }

    observer = new IntersectionObserver(handleIntersection, {
      threshold: CONFIG.threshold,
      rootMargin: CONFIG.rootMargin
    });

    elementsToReveal.forEach(function (element) {
      observer.observe(element);
    });
  }

  /**
   * Inicialización principal
   */
  function init() {
    if (isInitialized) return;

    initializeElements();
    initObserver();

    isInitialized = true;
  }

  /**
   * Destruye el observer y limpia
   */
  function destroy() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    elementsToReveal = [];
    isInitialized = false;
  }

  /**
   * Fuerza la revelación de todos los elementos
   */
  function revealAll() {
    elementsToReveal.forEach(revealElement);
  }

  // ==========================================
  // ARRANQUE SEGURO
  // ==========================================

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    init();
  });

  // ==========================================
  // API PÚBLICA
  // ==========================================

  window.ScrollReveal = {
    init,
    destroy,
    revealAll,
    isInitialized: function () {
      return isInitialized;
    }
  };

})();
