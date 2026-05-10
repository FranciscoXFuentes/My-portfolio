(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function escapeHTML(str) {
    return String(str ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));
  }

  function placeholderSVG(index) {
    const palettes = [
      ['#84cc16', '#0a0a0a'],
      ['#a3e635', '#1a1a1a'],
      ['#0a0a0a', '#84cc16'],
      ['#fafaf5', '#84cc16'],
    ];
    const [bg, fg] = palettes[index % palettes.length];
    const offset = (index * 23) % 100;
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="${bg}"/>
        <circle cx="${80 + offset}" cy="150" r="120" fill="${fg}" opacity="0.85"/>
        <rect x="${220 - offset / 2}" y="60" width="140" height="140" fill="${fg}" opacity="0.5"/>
        <text x="20" y="285" font-family="JetBrains Mono, monospace" font-size="14" fill="${fg}" opacity="0.7">
          0${index + 1} / preview
        </text>
      </svg>
    `;
  }

  function initReveals(scope) {
    const root = scope || document;
    const targets = root.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      targets.forEach((el) => io.observe(el));
    } else {
      targets.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const cursor = document.querySelector('.cursor');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && isFinePointer && !prefersReducedMotion) {
    let x = 0, y = 0, tx = 0, ty = 0;

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      cursor.classList.add('is-visible');
    });
    window.addEventListener('mouseleave', () =>
      cursor.classList.remove('is-visible')
    );

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    const hoverables = 'a, button, .project, .skill, [data-magnetic]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove('is-hover');
    });
  }

  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    if (prefersReducedMotion) {
      heroTitle.classList.add('is-revealed');
    } else {
      requestAnimationFrame(() => heroTitle.classList.add('is-revealed'));
    }
  }

  window.PF = { escapeHTML, placeholderSVG, initReveals, prefersReducedMotion };
})();
