// NAVBAR: scroll effect + active link highlight
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  let current = '';
  sections.forEach(section => {
    const sTop = section.offsetTop - 100;
    if (window.scrollY >= sTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// HAMBURGER MENU (mobile)
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

// HERO ROLE ROTATOR (cycles every 2.2 seconds)
const roleTrack = document.querySelector('.role-track');
const roles = document.querySelectorAll('.role-item');
let currentRole = 0;

setInterval(() => {
  currentRole = (currentRole + 1) % roles.length;
  roleTrack.style.transform = `translateY(-${currentRole * 2.5}rem)`;
}, 2200);

// SKILLS TABS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    const targetEl = document.getElementById(`tab-${target}`);
    if (targetEl) targetEl.classList.add('active');
  });
});

// ABOUT SLIDER TABS
document.querySelectorAll('.aslide-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-slide');
    document.querySelectorAll('.aslide-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.aslide-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const targetEl = document.getElementById(`aslide-${target}`);
    if (targetEl) targetEl.classList.add('active');
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
        card.classList.remove('hidden');
        card.style.display = 'block';
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
  });
});

// PROJECTS FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-cat') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.style.display = 'block';
  contactForm.reset();
  setTimeout(() => formSuccess.style.display = 'none', 5000);
});
// SMOOTH SCROLL REVEAL
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .contact-item, .stat, .about-grid, .section-title, .section-label'
);

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


// Hover effect on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-card, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'rgba(204, 0, 0, 0.1)';
    cursor.style.borderColor = '#cc0000';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
    cursor.style.borderColor = '#cc0000';
  });
});

// PHOTO SLIDESHOW
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0;
let slideshowTimer;

if (slides.length > 0) {
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slide-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.slide-dot')[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.slide-dot')[currentSlide].classList.add('active');
    resetTimer();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function resetTimer() {
    clearInterval(slideshowTimer);
    slideshowTimer = setInterval(nextSlide, 4000);
  }

  document.getElementById('slideNext').addEventListener('click', nextSlide);
  document.getElementById('slidePrev').addEventListener('click', prevSlide);

  // Auto play
  slideshowTimer = setInterval(nextSlide, 4000);

  // Pause on hover
  document.querySelector('.slideshow-wrap').addEventListener('mouseenter', () => {
    clearInterval(slideshowTimer);
  });
  document.querySelector('.slideshow-wrap').addEventListener('mouseleave', () => {
    slideshowTimer = setInterval(nextSlide, 4000);
  });
}


// ABOUT SECTION SLIDER
const aslidesBtns = document.querySelectorAll('.aslide-btn');
const aslidesContent = document.querySelectorAll('.aslide-content');

aslidesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-slide');
    aslidesBtns.forEach(b => b.classList.remove('active'));
    aslidesContent.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`aslide-${target}`).classList.add('active');
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
  { title: 'Data Analyst Projects', section: '#projects', icon: '📊' },
  { title: 'Graphic Design Projects', section: '#projects', icon: '🎨' },
  { title: 'Developer Projects', section: '#projects', icon: '💻' },
  { title: 'Contact Me', section: '#contact', icon: '📧' },
  { title: 'Download Resume', section: '#about', icon: '📄' },
  { title: 'Additional Works', section: '#additional', icon: '📸' },
  { title: 'Sales Dashboard', section: '#projects', icon: '📈' },
  { title: 'Hospital Dashboard', section: '#projects', icon: '🏥' },
  { title: 'Car Price Predictor', section: '#projects', icon: '🚗' },
  { title: 'London Airbnb', section: '#projects', icon: '🏠' },
  { title: 'Bank Customer Churn', section: '#projects', icon: '🏦' },
];

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) { searchResults.style.display = 'none'; return; }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      searchResults.style.display = 'none';
      return;
    }

    searchResults.innerHTML = filtered.map(item => `
      <div class="search-result-item" onclick="goToSection('${item.section}')">
        <span>${item.icon}</span>
        <span>${item.title}</span>
      </div>
    `).join('');

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
  searchResults.style.display = 'none';
  searchInput.value = '';
  document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
}

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// TYPING ANIMATION
const roles = ['Data Analyst', 'Graphic Designer', 'Software Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const roleSlider = document.querySelector('.role-slider');
if (roleSlider) {
  roleSlider.innerHTML = '<span class="typed-text" id="typedText"></span><span class="typed-cursor">|</span>';
}

function typeEffect() {
  const typedText = document.getElementById('typedText');
  if (!typedText) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000;
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 300;
    }
  }
  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// PARTICLE EFFECTS
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      const colors = [
        `rgba(204,0,0,${this.opacity})`,
        `rgba(0,100,255,${this.opacity})`,
        `rgba(100,0,255,${this.opacity})`,
        `rgba(0,200,100,${this.opacity})`,
        `rgba(255,150,0,${this.opacity})`,
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width ||
          this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Connect nearby particles
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(204,0,0,${0.1 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}