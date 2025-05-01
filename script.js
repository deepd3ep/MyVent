// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    // Select all sections except the navbar
    const sections = document.querySelectorAll('section:not(.navbar), .about, .services, .contact');
    
    // Initially hide all sections
    sections.forEach(section => {
        if (!section.classList.contains('navbar')) {
            section.classList.add('hidden');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('navbar')) {
                entry.target.classList.remove('hidden');
                // Once a section is visible, we can unobserve it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (!section.classList.contains('navbar')) {
            observer.observe(section);
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Prevent scroll when mobile menu is open
function preventScroll(e) {
    if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
        e.preventDefault();
    }
}

// Add touch event listeners for better mobile interaction
document.addEventListener('touchstart', function(e) {
    if (window.innerWidth <= 768 && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
}, { passive: true }); 