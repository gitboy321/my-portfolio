/* ===== BHARATH KUMAR — MODERN SCRIPT ===== */

// ─── INJECT GRADIENT FOR SKILL RINGS ─────────────────────────────────────────
(function injectRingGradient() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const defsSvg = document.createElementNS(svgNS, 'svg');
  defsSvg.setAttribute('width', '0');
  defsSvg.setAttribute('height', '0');
  defsSvg.style.position = 'absolute';
  defsSvg.innerHTML = `
    <defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5b5bf0"/>
        <stop offset="100%" stop-color="#9b5bf0"/>
      </linearGradient>
    </defs>`;
  document.body.appendChild(defsSvg);
})();

// ─── DARK MODE TOGGLE ────────────────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', savedTheme);
if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (themeIcon) themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ─── CURSOR GLOW ──────────────────────────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
let glowVisible = false;
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      if (!glowVisible) { cursorGlow.style.opacity = '1'; glowVisible = true; }
    }
  });
  document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
    glowVisible = false;
  });
}

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');

// ─── NAVBAR SCROLL + ACTIVE LINK ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // progress bar
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollProgress) scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;

  // active link
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ─── HAMBURGER ────────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinksEl.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('active');
    })
  );
}

// ─── TYPING ANIMATION ─────────────────────────────────────────────────────────
const roles = ['Data Analyst', 'Graphic Designer', 'Software Developer'];
let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 110;

function typeEffect() {
  const typedText = document.getElementById('typedText');
  if (!typedText) return;
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++; typingSpeed = 110;
    if (charIndex === currentRole.length) { isDeleting = true; typingSpeed = 1800; }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--; typingSpeed = 55;
    if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingSpeed = 400; }
  }
  setTimeout(typeEffect, typingSpeed);
}
typeEffect();

// Cycle bento role pills in sync
const bentoPills = document.querySelectorAll('.brole');
let bentoRoleIdx = 0;
if (bentoPills.length) {
  setInterval(() => {
    bentoPills.forEach(p => p.classList.remove('active'));
    bentoRoleIdx = (bentoRoleIdx + 1) % bentoPills.length;
    bentoPills[bentoRoleIdx].classList.add('active');
  }, 2800);
}

// ─── SKILLS TABS ─────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    const tab = document.getElementById(`tab-${target}`);
    tab?.classList.add('active');
    if (tab) animateRingsIn(tab.querySelectorAll('.ring-fill'));
  });
});

// ─── SKILL RINGS ─────────────────────────────────────────────────────────────
const CIRCUMFERENCE = 2 * Math.PI * 32; // r=32

function animateRingsIn(fills) {
  fills.forEach(fill => {
    const pct = parseFloat(fill.getAttribute('data-pct')) / 100;
    const offset = CIRCUMFERENCE * (1 - pct);
    fill.style.transition = 'none';
    fill.style.strokeDashoffset = CIRCUMFERENCE;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1) 0.2s';
        fill.style.strokeDashoffset = offset;
      });
    });
  });
}

document.querySelectorAll('.ring-fill').forEach(fill => {
  fill.style.strokeDasharray = CIRCUMFERENCE;
  fill.style.strokeDashoffset = CIRCUMFERENCE;
});

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateRingsIn(entry.target.querySelectorAll('.ring-fill'));
      ringObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.tab-content').forEach(tab => ringObserver.observe(tab));

// ─── ABOUT SLIDER TABS ────────────────────────────────────────────────────────
document.querySelectorAll('.aslide-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-slide');
    document.querySelectorAll('.aslide-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.aslide-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`aslide-${target}`)?.classList.add('active');
  });
});

// ─── PROJECTS FILTER ─────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.getAttribute('data-cat') === filter;
      if (show) {
        card.style.display = 'block';
        requestAnimationFrame(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ─── CERTIFICATES SLIDESHOW ───────────────────────────────────────────────────
const slides = document.querySelectorAll('#slideshow .slide');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0, slideshowTimer;

if (slides.length > 0 && dotsContainer) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slide-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.slide-dot')[currentSlide]?.classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.slide-dot')[currentSlide]?.classList.add('active');
    resetTimer();
  }
  function resetTimer() {
    clearInterval(slideshowTimer);
    slideshowTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }

  document.getElementById('slideNext')?.addEventListener('click', () => goToSlide(currentSlide + 1));
  document.getElementById('slidePrev')?.addEventListener('click', () => goToSlide(currentSlide - 1));

  const wrap = document.querySelector('.slideshow-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', () => clearInterval(slideshowTimer));
    wrap.addEventListener('mouseleave', resetTimer);
  }
  slideshowTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.section-title, .section-label, .skill-card, .project-card, .contact-item, ' +
  '.stat, .timeline-content, .timeline-item, .about-text p, .about-photo-wrap, ' +
  '.about-slider, .slideshow-wrap, .contact-form, .resume-btns, .bento-card'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 7) * 0.055}s`;
  revealObserver.observe(el);
});

// ─── MAGNETIC BUTTONS ─────────────────────────────────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      btn.style.transform = '';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });
  });
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        document.getElementById('formSuccess').style.display = 'block';
        contactForm.reset();
        btn.textContent = 'Sent ✓';
      } else {
        btn.textContent = 'Try again';
        btn.disabled = false;
      }
    } catch (err) {
      btn.textContent = 'Try again';
      btn.disabled = false;
    }
  });
}

// ===== GALLERY SLIDESHOW =====

const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryDotsContainer = document.getElementById('galleryDots');

let galleryCurrent = 0;
let galleryTimer;

if (gallerySlides.length > 0 && galleryDotsContainer) {

    gallerySlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slide-dot');
        if(i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => galleryGo(i));

        galleryDotsContainer.appendChild(dot);
    });

    function galleryGo(index){

        gallerySlides[galleryCurrent].classList.remove('active');
        document.querySelectorAll('#galleryDots .slide-dot')[galleryCurrent].classList.remove('active');

        galleryCurrent = (index + gallerySlides.length) % gallerySlides.length;

        gallerySlides[galleryCurrent].classList.add('active');
        document.querySelectorAll('#galleryDots .slide-dot')[galleryCurrent].classList.add('active');

        resetGallery();
    }

    function resetGallery(){
        clearInterval(galleryTimer);
        galleryTimer = setInterval(() => galleryGo(galleryCurrent + 1), 4500);
    }

    document.getElementById('galleryNext').onclick = () => galleryGo(galleryCurrent + 1);
    document.getElementById('galleryPrev').onclick = () => galleryGo(galleryCurrent - 1);

    galleryTimer = setInterval(() => galleryGo(galleryCurrent + 1),4500);
}