// ===== SCROLL REVEAL =====
const revealElements = () => {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-cascade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => observer.observe(el));
};

// ===== NAVBAR =====
const initNav = () => {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-menu');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close mobile menu on clicking links
    menu.querySelectorAll('.nav-link:not(.nav-dropdown-trigger), .nav-dropdown-item, .nav-menu-cta').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Mobile dropdown
  document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = trigger.closest('.nav-dropdown');
        parent.classList.toggle('open');
      }
    });
  });
};

// ===== COUNTER ANIMATION =====
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const duration = 1500; // ms
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }, stepTime);
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
};

// ===== PARALLAX & HERO SCROLL =====
const initParallax = () => {
  const heroImg = document.querySelector('.hero-bg img');
  if (!heroImg) return;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      heroImg.style.transform = `scale(1.1) translateY(${scroll * 0.35}px)`;
    }
  });
};

// ===== INTERACTIVE CARD DECORATION (Multi-layer Parallax Hover) =====
const initCardHoverEffects = () => {
  const cards = document.querySelectorAll('.fleet-card, .service-card, .testimonial-card, .tour-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  revealElements();
  initNav();
  animateCounters();
  initParallax();
  initCardHoverEffects();
});
