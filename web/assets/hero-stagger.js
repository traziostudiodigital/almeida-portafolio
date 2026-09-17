(function () {
  'use strict';
  function wrapWords(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="stagger-word" style="animation-delay:${i * 60}ms">${w}</span>`
    ).join(' ');
  }
  function initStagger() {
    document.querySelectorAll('.hero-stagger').forEach(wrapWords);
  }
  // Ejecutar DESPUÉS de que i18n-core.js traduzca (usar el mismo delay pattern que cursor-hero.js)
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }
  ready(() => setTimeout(initStagger, 80)); // Después de i18n-core (que corre en DOMContentLoaded directo)
  window.HeroStagger = { reinit: initStagger };
})();