(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initDrawer() {
    const drawer = document.querySelector('[data-mobile-drawer]');
    const openers = document.querySelectorAll('[data-mobile-open]');
    const closers = document.querySelectorAll('[data-mobile-close]');
    if (!drawer) return;
    const open = () => {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-open');
      const firstLink = drawer.querySelector('a, button');
      if (firstLink) firstLink.focus();
    };
    const close = () => {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
    };
    openers.forEach((button) => button.addEventListener('click', open));
    closers.forEach((button) => button.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  function initSliders() {
    document.querySelectorAll('[data-hero-slider]').forEach((slider) => {
      const slides = Array.from(slider.querySelectorAll('.hero-slide'));
      const dots = Array.from(document.querySelectorAll(`[data-slider-dot="${slider.id}"]`));
      if (!slides.length) return;
      let index = 0;
      const show = (next) => {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          slide.classList.toggle('is-active', i === index);
          slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        });
        dots.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'));
      };
      dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
      show(0);
      if (!prefersReduced && slides.length > 1) {
        window.setInterval(() => show(index + 1), 3000);
      }
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const run = (node) => {
      const target = Number(node.dataset.counter || '0');
      const suffix = node.dataset.suffix || '';
      if (prefersReduced) {
        node.textContent = target.toLocaleString('tr-TR') + suffix;
        return;
      }
      const started = performance.now();
      const duration = 1300;
      const tick = (now) => {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased).toLocaleString('tr-TR') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            run(entry.target);
          }
        });
      }, { threshold: 0.35 });
      counters.forEach((counter) => observer.observe(counter));
    } else {
      counters.forEach(run);
    }
  }

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((root) => {
      const buttons = Array.from(root.querySelectorAll('[data-tab-button]'));
      const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
      const activate = (id) => {
        buttons.forEach((button) => button.setAttribute('aria-selected', button.dataset.tabButton === id ? 'true' : 'false'));
        panels.forEach((panel) => {
          const active = panel.dataset.tabPanel === id;
          panel.hidden = !active;
        });
      };
      buttons.forEach((button) => button.addEventListener('click', () => activate(button.dataset.tabButton)));
      if (buttons[0]) activate(buttons[0].dataset.tabButton);
    });
  }

  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach((root) => {
      root.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const panel = document.getElementById(trigger.getAttribute('aria-controls'));
          const open = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', String(!open));
          if (panel) panel.hidden = open;
        });
      });
    });
  }

  function initHotspots() {
    document.querySelectorAll('[data-hotspot]').forEach((button) => {
      button.addEventListener('click', () => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        const open = button.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.hotspot-popover').forEach((popover) => { popover.hidden = true; });
        document.querySelectorAll('[data-hotspot]').forEach((hotspot) => hotspot.setAttribute('aria-expanded', 'false'));
        if (panel) {
          panel.hidden = open;
          button.setAttribute('aria-expanded', String(!open));
        }
      });
    });
  }

  function initLightbox() {
    const lightbox = document.querySelector('[data-lightbox-root]');
    if (!lightbox) return;
    const title = lightbox.querySelector('[data-lightbox-title]');
    const body = lightbox.querySelector('[data-lightbox-body]');
    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    document.querySelectorAll('[data-lightbox]').forEach((item) => {
      item.addEventListener('click', () => {
        if (title) title.textContent = item.dataset.lightboxTitle || item.textContent.trim();
        if (body) body.textContent = item.dataset.lightboxBody || 'Belge ve görsel ön izlemesi burada gösterilir.';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    lightbox.querySelectorAll('[data-lightbox-close]').forEach((button) => button.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  function initForms() {
    document.querySelectorAll('.prototype-form').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let valid = true;
        form.querySelectorAll('[required]').forEach((field) => {
          const error = form.querySelector(`[data-error-for="${field.id}"]`);
          if (!field.value.trim()) {
            valid = false;
            field.setAttribute('aria-invalid', 'true');
            if (error) error.textContent = 'Bu alan zorunludur.';
          } else {
            field.removeAttribute('aria-invalid');
            if (error) error.textContent = '';
          }
        });
        const status = form.querySelector('[data-form-status]');
        if (status) {
          status.textContent = valid ? 'Talep taslak olarak doğrulandı. Gerçek entegrasyonda CRM kaydı açılır.' : 'Lütfen zorunlu alanları tamamlayın.';
        }
      });
    });
  }

  function initCharts() {
    if (!window.Chart) return;
    const footprint = document.getElementById('footprintChart');
    if (footprint) {
      new Chart(footprint, {
        type: 'line',
        data: {
          labels: ['2022', '2023', '2024', '2025', '2026'],
          datasets: [{
            label: 'Ton başına CO2e',
            data: [1.24, 1.12, 1.04, 0.94, 0.82],
            borderColor: '#0D4525',
            backgroundColor: 'rgba(13, 69, 37, 0.12)',
            tension: 0.42,
            fill: true
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
    const tonnage = document.getElementById('tonnageChart');
    if (tonnage) {
      new Chart(tonnage, {
        type: 'bar',
        data: {
          labels: ['Un', 'Yem', 'Toz Biber', 'Pul Biber', 'Silaj'],
          datasets: [{
            label: 'Yıllık tonaj',
            data: [42000, 36000, 9800, 7400, 68000],
            backgroundColor: ['#0D4525', '#3D8B5E', '#C0392B', '#D4A017', '#8B4513']
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
    const pie = document.getElementById('productPieChart');
    if (pie) {
      new Chart(pie, {
        type: 'doughnut',
        data: {
          labels: ['Değirmen', 'Biber', 'Silaj'],
          datasets: [{
            data: [48, 22, 30],
            backgroundColor: ['#0D4525', '#C0392B', '#D4A017']
          }]
        },
        options: { responsive: true, cutout: '62%' }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initHeader();
    initDrawer();
    initSliders();
    initCounters();
    initTabs();
    initAccordions();
    initHotspots();
    initLightbox();
    initForms();
    initCharts();
  });
})();
