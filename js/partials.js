/**
 * Anu&Co – Shared UI Partials Injector
 * Injects navbar + footer + floating buttons into every page
 */
(function () {

  // ─── Brand Logo HTML (no emoji) ──────────────────────────────
  const brandLogoHTML = `
    <a href="index.html" class="navbar-brand">
      <div class="brand-logo" style="padding:2cap">
        <div class="brand-logo-mark">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <span class="brand-wordmark">Anu<span class="amp">&amp;</span>Co</span>
      </div>
    </a>
  `;

  const footerBrandHTML = `
    <div class="footer-brand-logo">
      <div class="brand-logo-mark">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <span class="brand-wordmark">Anu<span class="amp">&amp;</span>Co</span>
    </div>
  `;

  document.querySelectorAll('.navbar-brand').forEach(el => {
    if (!el.querySelector('.brand-logo')) el.outerHTML = brandLogoHTML;
  });

  document.querySelectorAll('.footer-brand-logo-placeholder').forEach(el => {
    el.innerHTML = footerBrandHTML;
  });

})();
