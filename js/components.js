/* =========================================================
   FakeNewsPrank — Shared header/footer component loader
   Injects /components/header.html and footer.html into
   #site-header and #site-footer, then runs nav init.
   ========================================================= */

(function () {
  'use strict';

  var LOG_COMPONENTS = false; // set true for debugging

  function log(msg) {
    if (LOG_COMPONENTS && typeof console !== 'undefined' && console.log) {
      console.log('[FakeNewsPrank components]', msg);
    }
  }

  function getBasePath() {
    var path = window.location.pathname || '/';
    if (path.indexOf('/') === -1) return '/';
    var lastSlash = path.lastIndexOf('/');
    var base = lastSlash <= 0 ? '/' : path.slice(0, lastSlash + 1);
    return base || '/';
  }

  function loadComponent(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Component fetch failed: ' + res.status);
      return res.text();
    });
  }

  function inject(elId, html) {
    var el = document.getElementById(elId);
    if (!el) {
      log('Placeholder not found: #' + elId);
      return;
    }
    el.innerHTML = html;
    log('Injected into #' + elId);
  }

  function runNavInit() {
    if (typeof window.initFakenewsprankNav === 'function') {
      window.initFakenewsprankNav();
      log('Nav init called');
    }
  }

  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  if (!headerEl && !footerEl) {
    log('No #site-header or #site-footer placeholders; skipping component load');
    return;
  }

  var base = getBasePath();
  var baseNorm = base === '/' ? '' : base;
  var headerUrl = baseNorm + 'components/header.html';
  var footerUrl = baseNorm + 'components/footer.html';

  log('Loading components from base: ' + base);

  Promise.all([
    headerEl ? loadComponent(headerUrl) : Promise.resolve(''),
    footerEl ? loadComponent(footerUrl) : Promise.resolve(''),
  ])
    .then(function (results) {
      if (headerEl && results[0]) inject('site-header', results[0]);
      if (footerEl && results[1]) inject('site-footer', results[1]);
      runNavInit();
    })
    .catch(function (err) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[FakeNewsPrank components]', err);
      }
      runNavInit();
    });
})();
