/**
 * cursor-hero.js
 * Dos líneas (horizontal + vertical) que siguen al cursor con lag distinto,
 * cruce a 90° con gap en la intersección.
 * Optimizado para alto rendimiento: GPU-accelerated, cero forced reflow en mousemove,
 * reposo automático del bucle RAF en inactividad y chequeo de puntero fino.
 */
(function () {
  'use strict';

  let canvas = null;
  let ctx = null;
  let container = null;
  let cachedRect = null;

  let animationFrameId = null;
  let isLoopRunning = false;
  let mousePos = { x: -9999, y: -9999 };
  let linePos = { x: 0, y: 0 };
  let isDesktop = false;
  let isInitialized = false;

  const CONFIG = {
    lineOpacity: 0.4,
    lineWidth: 1,
    gap: 22,           // hueco en la intersección
    lagH: 0.045,       // suavizado línea horizontal
    lagV: 0.03,        // suavizado línea vertical
    settleThreshold: 0.08, // tolerancia de reposo en px
    desktopBreakpoint: 768
  };

  function hasFinePointer() {
    return window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function checkDesktop() {
    return window.innerWidth >= CONFIG.desktopBreakpoint && hasFinePointer() && !prefersReducedMotion();
  }

  function updateRect() {
    if (!container) {
      container = document.getElementById('canvas-container');
    }
    if (container) {
      cachedRect = container.getBoundingClientRect();
    }
  }

  function initCanvas() {
    container = document.getElementById('canvas-container');
    if (!container) return false;

    canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 z-0 pointer-events-none';
    canvas.style.display = 'block';
    canvas.style.willChange = 'transform';
    canvas.style.transform = 'translate3d(0, 0, 0)';
    container.insertBefore(canvas, container.firstChild);
    ctx = canvas.getContext('2d', { alpha: true });

    updateRect();
    resizeCanvas();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasDesktop = isDesktop;
        isDesktop = checkDesktop();
        updateRect();
        resizeCanvas();
        if (wasDesktop !== isDesktop) {
          isDesktop ? startAnimation() : stopAnimation();
        } else if (isDesktop) {
          wakeUp();
        }
      }, 150);
    }, { passive: true });

    window.addEventListener('scroll', () => {
      updateRect();
    }, { passive: true });

    return true;
  }

  function resizeCanvas() {
    if (!canvas || !container) return;
    const rect = cachedRect || container.getBoundingClientRect();
    cachedRect = rect;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    if (mousePos.x === -9999) {
      linePos.x = rect.width / 2;
      linePos.y = rect.height / 2;
      mousePos.x = linePos.x;
      mousePos.y = linePos.y;
    }
  }

  function onMouseMove(e) {
    if (!isDesktop) return;
    if (!cachedRect) updateRect();
    if (!cachedRect) return;

    mousePos.x = e.clientX - cachedRect.left;
    mousePos.y = e.clientY - cachedRect.top;

    wakeUp();
  }

  function drawCross() {
    if (!canvas || !ctx) return false;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    const dx = mousePos.x - linePos.x;
    const dy = mousePos.y - linePos.y;

    linePos.x += dx * CONFIG.lagH;
    linePos.y += dy * CONFIG.lagV;

    const isSettled = Math.abs(dx) < CONFIG.settleThreshold && Math.abs(dy) < CONFIG.settleThreshold;
    if (isSettled) {
      linePos.x = mousePos.x;
      linePos.y = mousePos.y;
    }

    ctx.clearRect(0, 0, width, height);

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

    return !isSettled;
  }

  function renderLoop() {
    if (!isDesktop) {
      isLoopRunning = false;
      return;
    }
    const continues = drawCross();
    if (continues) {
      animationFrameId = requestAnimationFrame(renderLoop);
    } else {
      isLoopRunning = false;
      animationFrameId = null;
    }
  }

  function wakeUp() {
    if (!isDesktop || isLoopRunning) return;
    isLoopRunning = true;
    animationFrameId = requestAnimationFrame(renderLoop);
  }

  function startAnimation() {
    if (!isDesktop) return;
    wakeUp();
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    isLoopRunning = false;
    document.removeEventListener('mousemove', onMouseMove);
    if (ctx && canvas) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
  }

  function init() {
    if (isInitialized) return;
    isDesktop = checkDesktop();
    if (!isDesktop) {
      isInitialized = true;
      return;
    }
    if (initCanvas()) {
      startAnimation();
    }
    isInitialized = true;
  }

  window.CursorHero = {
    init,
    isDesktop: () => isDesktop,
    onLanguageChange: () => {}
  };

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }
  ready(() => setTimeout(init, 50));

  window.addEventListener('componentLoaded', (e) => {
    if (e.detail && e.detail.id === 'canvas-cursor-placeholder') {
      init();
    }
  });
})();
