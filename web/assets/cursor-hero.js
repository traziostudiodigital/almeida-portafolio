/**
 * cursor-hero.js
 * Dos líneas (horizontal + vertical) que siguen al cursor con lag distinto,
 * cruce a 90° con gap en la intersección + rotación de frases.
 */
(function () {
  'use strict';

  let canvas = null;
  let ctx = null;
  let phraseEl = null;
  let phrases = [];
  let currentPhraseIndex = 0;
  let phraseTimer = null;
  let animationFrameId = null;
  let mousePos = { x: -9999, y: -9999 };
  let linePos = { x: 0, y: 0 };
  let isDesktop = false;
  let isInitialized = false;

  const CONFIG = {
    phraseRotationInterval: 6000,
    lineOpacity: 0.5,
    lineWidth: 1,
    gap: 22,           // hueco en la intersección
    lagH: 0.045,         // suavizado línea horizontal
    lagV: 0.03,         // suavizado línea vertical (más lenta = sensación de profundidad)
    desktopBreakpoint: 768
  };

  function checkDesktop() { return window.innerWidth >= CONFIG.desktopBreakpoint; }

  function initCanvas() {
    const container = document.getElementById('canvas-container');
    if (!container) return false;
    canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 z-0 pointer-events-none';
    canvas.style.display = 'block';
    container.insertBefore(canvas, container.firstChild);
    ctx = canvas.getContext('2d');
    resizeCanvas();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        const wasDesktop = isDesktop;
        isDesktop = checkDesktop();
        if (wasDesktop !== isDesktop) { isDesktop ? startAnimation() : stopAnimation(); }
      }, 150);
    }, { passive: true });

    return true;
  }

  function resizeCanvas() {
    if (!canvas) return;
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    linePos.x = rect.width / 2;
    linePos.y = rect.height / 2;
  }

  function onMouseMove(e) {
    if (!isDesktop) return;
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  }

  function drawCross() {
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    ctx.clearRect(0, 0, width, height);

    // Lag distinto por eje: la vertical "persigue" más lento que la horizontal
    linePos.x += (mousePos.x - linePos.x) * CONFIG.lagH;
    linePos.y += (mousePos.y - linePos.y) * CONFIG.lagV;

    const cx = linePos.x;
    const cy = linePos.y;
    const g = CONFIG.gap;

    ctx.save();
    ctx.globalAlpha = CONFIG.lineOpacity;
    ctx.strokeStyle = '#B08D57';
    ctx.lineWidth = CONFIG.lineWidth;
    ctx.lineCap = 'round';

    // Horizontal: corta en [cx-g, cx+g]
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(cx - g, cy);
    ctx.moveTo(cx + g, cy);
    ctx.lineTo(width, cy);
    ctx.stroke();

    // Vertical: corta en [cy-g, cy+g]
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, cy - g);
    ctx.moveTo(cx, cy + g);
    ctx.lineTo(cx, height);
    ctx.stroke();

    ctx.restore();
  }

  function animate() {
    if (!isDesktop) return;
    drawCross();
    animationFrameId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (!isDesktop || animationFrameId) return;
    animate();
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  function stopAnimation() {
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
    document.removeEventListener('mousemove', onMouseMove);
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function initPhraseRotator() {
    phraseEl = document.getElementById('rotating-phrase-text');
    const container = document.getElementById('phrase-rotator-container');
    if (!phraseEl || !container) return;

    if (window.i18nData && window.i18nCore && window.i18nCore.currentLang) {
      const lang = window.i18nCore.currentLang;
      const data = window.i18nData[lang];
      if (data) {
        phrases = [data['home.phrase.1'], data['home.phrase.2'], data['home.phrase.3'], data['home.phrase.4']].filter(Boolean);
      }
    }
    if (phrases.length === 0) phrases = [phraseEl.textContent.trim()];

    currentPhraseIndex = 0;
    updatePhrase(0);
    startPhraseRotation();
    container.addEventListener('mouseenter', pausePhraseRotation);
    container.addEventListener('mouseleave', resumePhraseRotation);
  }

  function updatePhrase(index) {
    if (!phraseEl || phrases.length === 0) return;
    phraseEl.style.opacity = '0';
    phraseEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
      phraseEl.textContent = phrases[index];
      phraseEl.style.opacity = '1';
      phraseEl.style.transform = 'translateY(0)';
    }, 250);
  }

  function startPhraseRotation() {
    if (phrases.length <= 1) return;
    phraseTimer = setInterval(() => {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      updatePhrase(currentPhraseIndex);
    }, CONFIG.phraseRotationInterval);
  }
  function pausePhraseRotation() { if (phraseTimer) { clearInterval(phraseTimer); phraseTimer = null; } }
  function resumePhraseRotation() { if (!phraseTimer && phrases.length > 1) startPhraseRotation(); }

  function init() {
    if (isInitialized) return;
    isDesktop = checkDesktop();
    if (!isDesktop) { initPhraseRotator(); isInitialized = true; return; }
    if (initCanvas()) startAnimation();
    initPhraseRotator();
    isInitialized = true;
  }

  function onLanguageChange(newLang) {
    if (!phraseEl || !window.i18nData || !window.i18nData[newLang]) return;
    const data = window.i18nData[newLang];
    phrases = [data['home.phrase.1'], data['home.phrase.2'], data['home.phrase.3'], data['home.phrase.4']].filter(Boolean);
    currentPhraseIndex = 0;
    updatePhrase(0);
  }

  window.CursorHero = { init, onLanguageChange, isDesktop: () => isDesktop };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(() => setTimeout(init, 50));
})();