// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkillBars = () => {
    skillBars.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        const skillVisible = skillTop < window.innerHeight - 100;

        if (skillVisible && !skill.classList.contains('animated')) {
            skill.classList.add('animated');
            const width = skill.style.width;
            skill.style.width = '0';

            setTimeout(() => {
                skill.style.width = width;
            }, 200);
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Here you would normally send the data to a server
        // For this demo, we'll just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

        // Reset form
        contactForm.reset();
    });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.reveal-3d, .reveal-3d-left, .reveal-3d-right');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = elementTop < window.innerHeight - 100;

        if (elementVisible) {
            element.classList.add('active');
        }
    });
};

// Initial setup for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal classes to elements
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('reveal-3d'));
    document.querySelectorAll('.about-content').forEach(el => el.classList.add('reveal-3d-left'));
    document.querySelectorAll('.about-highlights').forEach(el => el.classList.add('reveal-3d-right'));
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right');
    });
    document.querySelectorAll('.project-card-3d').forEach((el, index) => {
        el.classList.add('reveal-3d', `delay-${index * 100}`);
        el.style.transitionDelay = `${index * 100}ms`;
    });
    document.querySelectorAll('.achievement-item').forEach((el, index) => {
        el.classList.add('reveal-3d');
        el.style.transitionDelay = `${index * 100}ms`;
    });
    document.querySelectorAll('.vision-content').forEach((el, index) => {
        el.classList.add('reveal-3d');
        el.style.transitionDelay = `${index * 100}ms`;
    });

    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 500);
}

// Add 3D parallax effect to hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');
const floatingShapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.3}px) rotateX(${scrollY * 0.01}deg)`;
    }

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px) translateZ(${scrollY * 0.05}px)`;
    }

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.25}px) translateZ(${scrollY * 0.1}px) rotateY(${scrollY * 0.02}deg)`;
    }

    // Animate floating shapes with different speeds
    floatingShapes.forEach((shape, index) => {
        const speed = 0.05 + (index * 0.02);
        const rotation = scrollY * speed;
        shape.style.transform = `translateY(${scrollY * speed * 0.5}px) rotate(${rotation}deg) scale(${1 + scrollY * 0.0005})`;
    });
});

// Add 3D hover effect to project cards
const projectCards3D = document.querySelectorAll('.project-card-3d');
projectCards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 8; // Increased sensitivity
        const rotateY = (centerX - x) / 8; // Increased sensitivity

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add 3D hover effect to achievement items
const achievementItems = document.querySelectorAll('.achievement-item');
achievementItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 8; // Increased sensitivity
        const rotateY = (centerX - x) / 8; // Increased sensitivity

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

        const icon = item.querySelector('.achievement-icon');
        if (icon) {
            icon.style.transform = `scale(1.1) rotate(${rotateX + rotateY}deg) translateZ(10px)`;
        }
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';

        const icon = item.querySelector('.achievement-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0) translateZ(0)';
        }
    });
});

// Add 3D hover effect to vision content
const visionContents = document.querySelectorAll('.vision-content');
visionContents.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 8; // Increased sensitivity
        const rotateY = (centerX - x) / 8; // Increased sensitivity

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add 3D mouse tracking effect to the entire page
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    // Apply subtle 3D transform to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const depth = 1 + (index * 0.1);
        const moveX = mouseX * 10 * depth;
        const moveY = mouseY * 10 * depth;
        const rotateY = mouseX * 2 * depth;
        const rotateX = -mouseY * 2 * depth;

        section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${moveX}px) translateY(${moveY}px)`;
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* 3D responsive adjustments */
    @media (max-width: 768px) {
        .profile-3d-container {
            animation: none;
            transform: none;
        }
        
        .hero-title {
            animation: none;
        }
        
        .project-card-3d:hover {
            transform: none;
        }
        
        .achievement-item:hover {
            transform: none;
        }
        
        .vision-content:hover {
            transform: none;
        }
        
        .cursor-dot, .cursor-outline {
            display: none;
        }
        
        body {
            cursor: auto;
        }
    }
`;
document.head.appendChild(style);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows cursor instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

const animateCursor = () => {
    // Smooth Lerp (Linear Interpolation)
    // The 0.15 factor determines the "lag" or smoothness. Lower = smoother/slower.
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
};
animateCursor();

// Cursor Hover Effects
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .achievement-item, .vision-content');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.backgroundColor = 'rgba(0, 168, 232, 0.1)';
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});