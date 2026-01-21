// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const menuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  if (navLinks.classList.contains('active')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link, .btn-hire').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
scrollIndicator.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '-100px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // If it's a skill category, animate tags with delay
      if (entry.target.classList.contains('skill-category')) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, index) => {
          setTimeout(() => {
            tag.classList.add('visible');
          }, index * 50);
        });
      }
      
      // If it's contact info wrapper, animate social links
      if (entry.target.classList.contains('contact-info-wrapper')) {
        const socialLinks = entry.target.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add('visible');
          }, 600 + index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.highlight-card').forEach(card => observer.observe(card));
document.querySelectorAll('.about-content').forEach(content => observer.observe(content));
document.querySelectorAll('.skill-category').forEach(category => observer.observe(category));
document.querySelectorAll('.project-card').forEach(card => observer.observe(card));
document.querySelectorAll('.contact-form-wrapper').forEach(wrapper => observer.observe(wrapper));
document.querySelectorAll('.contact-info-wrapper').forEach(wrapper => observer.observe(wrapper));

// Form submission
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message, duration = 3000) {
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Mock form submission (in real app, you would send this to a server)
  console.log('Form submitted:', { name, email, message });
  
  // Show success message
  showToast("Message sent successfully! I'll get back to you soon.");
  
  // Reset form
  contactForm.reset();
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add stagger animation to highlight cards
const highlightCards = document.querySelectorAll('.highlight-card');
const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200);
    }
  });
}, observerOptions);

highlightCards.forEach(card => highlightObserver.observe(card));

// Add stagger animation to project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

projectCards.forEach(card => projectObserver.observe(card));

// Add stagger animation to skill categories
const skillCategories = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

skillCategories.forEach(category => skillObserver.observe(category));

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Prevent default behavior for project links (since they're placeholder links)
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') {
      e.preventDefault();
      showToast('This is a demo link. Replace with actual project URLs!');
    }
  });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//   const heroTitle = document.querySelector('.hero-title');
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 50);
// });

// Handle window resize for mobile menu
let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
  if (window.innerWidth !== windowWidth) {
    windowWidth = window.innerWidth;
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    }
  }
});


// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-konamiSequence.length);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    showToast('🎮 Konami Code Activated! You found the easter egg!', 5000);
    document.body.style.animation = 'rainbow 2s infinite';
  }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

