/* =========================================================
   FakeNewsPrank — Landing Page Script
   Nav/hamburger/smooth-scroll init can run on load (index)
   or after component injection (legal pages) via initFakenewsprankNav().
   ========================================================= */

(function () {
  'use strict';

  /**
   * Initialize sticky nav, mobile menu, and smooth scroll.
   * Safe to call when header is static (index) or after components.js injects header.
   * Exposed globally so components.js can call it after injecting #site-header.
   */
  window.initFakenewsprankNav = function () {
    var navHeader = document.getElementById('nav-header');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');

    if (!navHeader) return;

    /* ── Sticky Nav ─────────────────────────────────────── */
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
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      navLinks.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

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
    }

    /* ── Smooth Scroll for Anchor Links ─────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var navHeight = navHeader.offsetHeight;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  };

  /* ── Reveal on Scroll ────────────────────────────────── */
  var revealElements = document.querySelectorAll('.reveal');

  function onRevealIntersect(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }

  if (revealElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(onRevealIntersect, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });
    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else if (revealElements.length) {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── FAQ Accordion ───────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');

    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          var q = openItem.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ── Mockup card subtle parallax on hero ─────────────── */
  var mockupCard = document.querySelector('.mockup-card');

  if (mockupCard) {
    var heroSection = document.querySelector('.hero');

    if (heroSection) {
      document.addEventListener('mousemove', function (e) {
        if (window.innerWidth < 768) return;

        var rect = heroSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var dx = (e.clientX - centerX) / rect.width;
        var dy = (e.clientY - centerY) / rect.height;

        var rotateY = dx * 6;
        var rotateX = -dy * 4;

        mockupCard.style.transform =
          'perspective(800px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
      });

      heroSection.addEventListener('mouseleave', function () {
        mockupCard.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      });
    }
  }

  /* Run nav init now if this page has static header (no placeholder). */
  if (!document.getElementById('site-header')) {
    window.initFakenewsprankNav();
  }
})();
