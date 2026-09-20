/**
 * cursor-hero.js
 * Dos líneas (horizontal + vertical) que siguen al cursor con lag distinto,
 * cruce a 90° con gap en la intersección + rotación de frases.
 */
(function () {
  'use strict';

  let canvas = null;
  let ctx = null;

  let animationFrameId = null;
  let mousePos = { x: -9999, y: -9999 };
  let linePos = { x: 0, y: 0 };
  let isDesktop = false;
  let isInitialized = false;

  const CONFIG = {
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









  function init() {
    if (isInitialized) return;
    isDesktop = checkDesktop();
    if (!isDesktop) { isInitialized = true; return; }
    if (initCanvas()) startAnimation();
    isInitialized = true;
  }



  window.CursorHero = { init, isDesktop: () => isDesktop };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(() => setTimeout(init, 50));

  // Eliminar cualquier resto del rotador si se hubiera llamado por evento
  window.addEventListener('componentLoaded', (e) => {
    if (e.detail.id === 'canvas-cursor-placeholder') {
      init();
    }
  });
})();