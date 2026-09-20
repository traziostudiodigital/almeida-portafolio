/**
 * web/assets/home-interaction.js
 * Rotador de frases del hero (home.phrase.1–5). Independiente de
 * cursor-hero.js y app.js — no depende de ellos ni ellos de él.
 */
(function () {
  'use strict';

  const KEYS = ['home.phrase.1', 'home.phrase.2', 'home.phrase.3', 'home.phrase.4', 'home.phrase.5'];
  const INTERVAL = 6000;
  const FADE_MS = 400;

  let idx = 0;
  let timerId = null;
  let textEl = null;
  let attrEl = null;

  function getDict() {
    var lang = (window.i18nCore && window.i18nCore.currentLang) || document.documentElement.getAttribute('lang') || 'es';
    return (window.i18nData && window.i18nData[lang]) || {};
  }

  // Soporta dos formatos posibles en i18n-data.js:
  // 1) "home.phrase.1": "«cita» — Autor"        (atribución embebida)
  // 2) "home.phrase.1" + "home.phrase.1.autor"  (clave separada)
  function resolvePhrase(key) {
    var dict = getDict();
    var raw = dict[key];
    if (!raw) return null;

    var autorKey = key + '.autor';
    if (dict[autorKey]) return { texto: raw, autor: dict[autorKey] };

    var partes = raw.split(/\s+—\s+/);
    if (partes.length === 2) return { texto: partes[0], autor: partes[1] };

    return { texto: raw, autor: '' };
  }

  function render(key) {
    var frase = resolvePhrase(key);
    if (!frase || !textEl) return;
    textEl.textContent = frase.texto;
    if (attrEl) attrEl.textContent = frase.autor;
  }

  function next() {
    if (!textEl) return;
    textEl.setAttribute('data-estado', 'saliendo');
    setTimeout(function () {
      idx = (idx + 1) % KEYS.length;
      render(KEYS[idx]);
      textEl.removeAttribute('data-estado');
    }, FADE_MS);
  }

  function start() { stop(); timerId = setInterval(next, INTERVAL); }
  function stop() { if (timerId) { clearInterval(timerId); timerId = null; } }

  function init() {
    textEl = document.getElementById('frase-texto');
    attrEl = document.getElementById('frase-atribucion');
    if (!textEl) return;
    idx = 0;
    render(KEYS[idx]);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  ready(function () { setTimeout(init, 100); });

  window.HomeInteraction = { reinit: init };
})();