/* =========================================================
   FakeNewsPrank — Landing Page Script
   ========================================================= */

(function () {
  'use strict';

  /* ── Sticky Nav ─────────────────────────────────────── */
  const navHeader = document.getElementById('nav-header');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── Mobile Menu ─────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ── Smooth Scroll for Anchor Links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = navHeader.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── Reveal on Scroll ────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  function onRevealIntersect(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(onRevealIntersect, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });
    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── FAQ Accordion ───────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ── Mockup card subtle parallax on hero ─────────────── */
  const mockupCard = document.querySelector('.mockup-card');

  if (mockupCard) {
    const heroSection = document.querySelector('.hero');

    document.addEventListener('mousemove', function (e) {
      if (window.innerWidth < 768) return;
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / rect.width;
      const dy = (e.clientY - centerY) / rect.height;

      const rotateY = dx * 6;
      const rotateX = -dy * 4;

      mockupCard.style.transform =
        'perspective(800px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
    });

    heroSection.addEventListener('mouseleave', function () {
      mockupCard.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
  }

})();
