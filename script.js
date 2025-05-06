document.addEventListener('DOMContentLoaded', function() {
    // Scroll effect on navigation
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('show');
      mobileNavOverlay.classList.toggle('show');
      document.body.style.overflow = mobileNav.classList.contains('show') ? 'hidden' : '';
    });

    mobileNavOverlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('show');
      mobileNavOverlay.classList.remove('show');
      document.body.style.overflow = '';
    });

    // Mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        const targetId = this.getAttribute('data-toggle');
        const targetDropdown = document.getElementById(targetId);
        targetDropdown.classList.toggle('show');
      });
    });

    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.mobile-nav-item')) {
        const openDropdowns = document.querySelectorAll('.mobile-dropdown.show');
        const activeToggles = document.querySelectorAll('.mobile-dropdown-toggle.active');
        
        openDropdowns.forEach(dropdown => {
          dropdown.classList.remove('show');
        });
        
        activeToggles.forEach(toggle => {
          toggle.classList.remove('active');
        });
      }
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission
    const form = document.getElementById('address-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show success message
      successMessage.style.opacity = '1';
      successMessage.style.pointerEvents = 'all';
    });
    
    closeSuccessBtn.addEventListener('click', () => {
      successMessage.style.opacity = '0';
      successMessage.style.pointerEvents = 'none';
      
      // Reset form
      form.reset();
    });

    // Animate counter stats
    function animateValue(id, start, end, duration) {
      const obj = document.getElementById(id);
      const range = end - start;
      const stepTime = Math.abs(Math.floor(duration / range));
      
      let current = start;
      const timer = setInterval(() => {
        current += 1;
        obj.textContent = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
    
    // Start the counter animations
    setTimeout(() => {
      animateValue("users-count", 0, 25, 1500);
      animateValue("replies-count", 0, 1, 1000);
      animateValue("growth-count", 0, 300, 2000);
    }, 500);
  });
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animations to section titles
            const title = entry.target.querySelector('.section-title');
            if (title) title.classList.add('animate');

            // Add animations to feature cards
            const featureCards = entry.target.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, 200 * index);
            });

            // Add animations to testimonials
            const testimonial = entry.target.querySelector('.testimonial');
            if (testimonial) testimonial.classList.add('animate');

            // Add animations to CTA section
            const ctaText = entry.target.querySelector('.cta-text');
            const ctaForm = entry.target.querySelector('.cta-form');
            if (ctaText) ctaText.classList.add('animate');
            if (ctaForm) ctaForm.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Testimonials Slider Functionality
const testimonialsData = [
    {
        text: "ReplyFi transformed how I handle social media. With the AI-powered replies, I've increased my engagement by 320% while cutting my response time in half!",
        name: "Sarah Johnson",
        role: "Marketing Director"
    },
    {
        text: "As a content creator, I was drowning in comments. ReplyFi helped me maintain authentic connections with my audience while scaling my reach exponentially.",
        name: "Mark Williams",
        role: "YouTube Creator"
    },
    {
        text: "The analytics dashboard gives me insights I never had before. I can now see exactly what works and what doesn't in my social strategy.",
        name: "Jennifer Lopez",
        role: "Small Business Owner"
    }
];

let currentSlide = 0;
const track = document.querySelector('.testimonials-track');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');

// Create testimonial slides
function createSlides() {
    track.innerHTML = '';
    testimonialsData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'testimonial';
        slide.innerHTML = `
            <div class="testimonial-content">
                <p class="testimonial-text">${item.text}</p>
            </div>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="./don.jpg" alt="${item.name}">
                </div>
                <div class="author-info">
                    <h4 class="author-name">${item.name}</h4>
                    <p class="author-role">${item.role}</p>
                </div>
            </div>
        `;
        track.appendChild(slide);
    });
    
    updateSlider();
}

function updateSlider() {
    const slideWidth = track.clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Add animation class to current slide
    document.querySelectorAll('.testimonial').forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('animate');
        } else {
            slide.classList.remove('animate');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialsData.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialsData.length) % testimonialsData.length;
    updateSlider();
}

// Initialize slider
createSlides();
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Handle window resize
window.addEventListener('resize', () => {
    updateSlider();
});

// Form submission (prevent default for demo)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your interest! In a real implementation, this form would submit your information.');
    });
}

