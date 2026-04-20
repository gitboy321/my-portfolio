// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });
}

// TYPING ANIMATION for roles
const roles = ['Data Analyst', 'Graphic Designer', 'Software Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

const roleSlider = document.querySelector('.role-slider');
if (roleSlider) {
  roleSlider.innerHTML = '<span class="typed-text" id="typedText"></span><span class="typed-cursor">|</span>';
  function typeEffect() {
    const typedText = document.getElementById('typedText');
    if (!typedText) return;
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      typedText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
      }
    } else {
      typedText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }
    }
    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();
}

// SKILLS TABS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    const el = document.getElementById(`tab-${target}`);
    if (el) el.classList.add('active');
  });
});

// ABOUT SLIDER TABS
document.querySelectorAll('.aslide-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-slide');
    document.querySelectorAll('.aslide-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.aslide-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const el = document.getElementById(`aslide-${target}`);
    if (el) el.classList.add('active');
  });
});

// PROJECTS FILTER
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-cat') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// PHOTO SLIDESHOW
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0;
let slideshowTimer;

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
    slideshowTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
  }

  const nextBtn = document.getElementById('slideNext');
  const prevBtn = document.getElementById('slidePrev');
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

  const wrap = document.querySelector('.slideshow-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', () => clearInterval(slideshowTimer));
    wrap.addEventListener('mouseleave', resetTimer);
  }

  slideshowTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .contact-item, .stat, .timeline-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 3D TILT ON PROJECT CARDS
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// SEARCH BAR
const searchInput = document.getElementById('navSearch');
const searchResults = document.getElementById('searchResults');

const searchData = [
  { title: 'About Me', section: '#about', icon: '👤' },
  { title: 'Experience', section: '#experience', icon: '💼' },
  { title: 'Skills', section: '#skills', icon: '⚡' },
  { title: 'Projects', section: '#projects', icon: '🚀' },
  { title: 'Contact Me', section: '#contact', icon: '📧' },
  { title: 'Download Resume', section: '#about', icon: '📄' },
  { title: 'Sales Dashboard', section: '#projects', icon: '📊' },
  { title: 'Hospital Dashboard', section: '#projects', icon: '🏥' },
  { title: 'Car Price Predictor', section: '#projects', icon: '🚗' },
  { title: 'London Airbnb', section: '#projects', icon: '🏠' },
  { title: 'Bank Customer Churn', section: '#projects', icon: '🏦' },
];

if (searchInput && searchResults) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) { searchResults.style.display = 'none'; return; }
    const filtered = searchData.filter(item => item.title.toLowerCase().includes(query));
    if (!filtered.length) { searchResults.style.display = 'none'; return; }
    searchResults.innerHTML = filtered.map(item =>
      `<div class="search-result-item" onclick="goToSection('${item.section}')">${item.icon} ${item.title}</div>`
    ).join('');
    searchResults.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search')) {
      searchResults.style.display = 'none';
      searchInput.value = '';
    }
  });
}

function goToSection(section) {
  if (searchResults) searchResults.style.display = 'none';
  if (searchInput) searchInput.value = '';
  document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
}

// PARTICLES
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    color: ['rgba(204,0,0,0.4)', 'rgba(0,100,255,0.3)', 'rgba(100,0,255,0.3)', 'rgba(0,180,100,0.3)'][Math.floor(Math.random() * 4)]
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}