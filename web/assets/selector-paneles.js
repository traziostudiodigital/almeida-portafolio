(function () {
  'use strict';
  const container = document.getElementById('arc-selector');
  if (!container) return;
  const segments = Array.from(container.querySelectorAll('.arc-segment'));
  const ROTATE_MS = 6000;
  const isDesktop = () => window.innerWidth >= 1024;
  let activeIndex = 0;
  let timer = null;
  let hovering = false;

  function setActive(index) {
    activeIndex = index;
    segments.forEach((seg, i) => {
      const active = i === index;
      seg.classList.toggle('is-active', active);
      seg.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function rotate() {
    if (!hovering) setActive((activeIndex + 1) % segments.length);
  }

  function startRotation() {
    clearInterval(timer);
    timer = setInterval(rotate, ROTATE_MS);
  }

  segments.forEach((seg, i) => {
    seg.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      hovering = true;
      setActive(i);
    });
    seg.addEventListener('mouseleave', () => { hovering = false; });
    seg.addEventListener('click', () => {
      if (isDesktop()) return;
      setActive(seg.classList.contains('is-active') ? -1 : i);
    });
    seg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActive(i);
      }
    });
  });

  setActive(0);
  startRotation();
})();