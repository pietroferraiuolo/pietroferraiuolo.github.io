/* ==========================================================================
   Pietro Ferraiuolo — site interactions
   Vanilla JS, no dependencies: theme toggle, mobile nav drawer, scroll-spy,
   reveal-on-scroll, email copy with toast, footer year.
   ========================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;

  /* --- Theme toggle (initial value set by the inline script in <head>) ----- */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const syncThemeBtn = () => {
      const dark = root.getAttribute('data-theme') !== 'light';
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    };
    syncThemeBtn();
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('pf-theme', next); } catch (e) { /* private mode */ }
      syncThemeBtn();
    });
  }

  /* --- Mobile navigation drawer ---------------------------------------------- */
  const nav = document.getElementById('site-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const setNav = (open) => {
    nav.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  if (nav && navToggle && navLinks) {
    navToggle.addEventListener('click', () => setNav(!nav.classList.contains('nav-open')));
    navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* --- Nav border once the page is scrolled ------------------------------------ */
  const onScroll = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Scroll-spy: highlight the current section in the nav --------------------- */
  const spyLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'))
    .filter((a) => a.getAttribute('href').length > 1);
  const spyTargets = spyLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && spyTargets.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        spyLinks.forEach((a) => {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    spyTargets.forEach((s) => spy.observe(s));
  }

  /* --- Reveal on scroll ----------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* --- Toast + email assembly / copy ---------------------------------------------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };
  document.querySelectorAll('[data-user][data-domain]').forEach((el) => {
    el.dataset.email = el.dataset.user + '@' + el.dataset.domain;
    if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + el.dataset.email);
  });
  document.querySelectorAll('#copy-email, #hero-copy-email').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const addr = btn.dataset.email;
      if (!addr) return;
      try {
        await navigator.clipboard.writeText(addr);
        showToast('Email copied: ' + addr);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = addr;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showToast('Email copied: ' + addr);
        } catch (e2) {
          showToast(addr);
        }
        ta.remove();
      }
    });
  });

  /* --- Footer year ------------------------------------------------------------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
