/* ============================================================
   ANU&CO – Shared Components Script
   Navbar · Mobile Menu · Scroll Top · Counters · AOS · Forms
   ============================================================ */

// ─── Navbar Scroll ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

function updateNav() {
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('transparent');
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.add('transparent');
  }
}
window.addEventListener('scroll', () => {
  updateNav();
  if (scrollTopBtn) {
    window.scrollY > 500
      ? scrollTopBtn.classList.add('show')
      : scrollTopBtn.classList.remove('show');
  }
}, { passive: true });
updateNav(); // run on load

// ─── Mobile Menu ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── Scroll To Top ────────────────────────────────────────────
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ─── Animated Counters ────────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 2200;
  const increment = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  counterEls.forEach(el => obs.observe(el));
}

// ─── Active Nav Link ──────────────────────────────────────────
(function setActive() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-menu a[href]').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    a.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
  });
})();

// ─── AOS Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 750, easing: 'ease-out-quart', once: true, offset: 70 });
  }
});

// ─── Smooth anchor scroll ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h'), 10) || 76;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ─── Form Submission (demo) ───────────────────────────────────
document.querySelectorAll('form[data-demo]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Submitted! We\'ll contact you within 2 hours.';
    btn.style.background = 'linear-gradient(135deg,#059669,#0d9488)';
    btn.disabled = true;
    form.querySelectorAll('.form-control').forEach(f => { f.style.opacity = '.6'; f.disabled = true; });
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.querySelectorAll('.form-control').forEach(f => { f.style.opacity = ''; f.disabled = false; });
      form.reset();
    }, 5000);
  });
});

// ─── Greeting Banner ─────────────────────────────────────────
// Small touch for the "hero-eyebrow" urgency if needed
(function () {
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good Morning' : hr < 18 ? 'Good Afternoon' : 'Good Evening';
  const el = document.getElementById('heroGreeting');
  if (el) el.textContent = greet + ' · ' + el.dataset.suffix;
})();
