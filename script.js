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
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');
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