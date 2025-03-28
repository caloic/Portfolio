// DOM Elements
const burgerMenu = document.querySelector('.burger-menu');
const navMobile = document.querySelector('.nav-mobile');
const navLinks = document.querySelectorAll('.nav-mobile ul li a');
const header = document.querySelector('header');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const featuredProject = document.querySelector('.featured-project');

// Toggle mobile menu
burgerMenu.addEventListener('click', () => {
    navMobile.classList.toggle('nav-active');
    burgerMenu.classList.toggle('toggle');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('nav-active');
        burgerMenu.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Here you would normally send the data to a server
        // For now, let's just log it and show a success message
        console.log({name, email, message});

        // Show success message
        alert('Votre message a été envoyé avec succès!');

        // Reset form
        contactForm.reset();
    });
}

// Animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to sections when they come into view
    const sections = document.querySelectorAll('section');

    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    sections.forEach(section => {
        section.classList.add('fade-out');
        fadeInObserver.observe(section);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        .scrolled {
            background-color: rgba(20, 20, 20, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .project-card {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .project-hidden {
            opacity: 0;
            transform: scale(0.8);
            position: absolute;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Initialize project filters
    initProjectFilters();

    // Animation d'entrée pour les projets
    const projectCards = document.querySelectorAll('.project-card');
    const featuredProject = document.querySelector('.featured-project');

    // Observer pour détecter quand les projets entrent dans la vue
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('appear');
                }, 150);
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observer chaque projet
    if (featuredProject) projectObserver.observe(featuredProject);
    projectCards.forEach(card => projectObserver.observe(card));

    // Initialiser l'indicateur de défilement
    handleScrollIndicator();
});

// Fonction pour filtrer les projets
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const featuredProject = document.querySelector('.featured-project');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filtrer les projets normaux
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });

                // Filtrer le projet en vedette si présent
                if (featuredProject) {
                    if (filter === 'all') {
                        featuredProject.style.display = 'block';
                        setTimeout(() => {
                            featuredProject.style.opacity = '1';
                            featuredProject.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        if (featuredProject.getAttribute('data-category') === filter) {
                            featuredProject.style.display = 'block';
                            setTimeout(() => {
                                featuredProject.style.opacity = '1';
                                featuredProject.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            featuredProject.style.opacity = '0';
                            featuredProject.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                featuredProject.style.display = 'none';
                            }, 300);
                        }
                    }
                }
            });
        });
    }
}

// Typing effect for the main heading - VERSION CORRIGÉE
const typingEffect = () => {
    const heading = document.querySelector('.hero-text h1');
    if (!heading) return;

    // Récupérer le contenu original
    const originalContent = heading.innerHTML;

    // Vider le contenu actuel
    heading.innerHTML = '';

    // Indice pour suivre la progression
    let i = 0;
    let tagBuffer = '';
    let isInsideTag = false;
    let currentText = '';
    const speed = 50; // vitesse de frappe en millisecondes

    const type = () => {
        if (i < originalContent.length) {
            const char = originalContent[i];

            // Gérer les balises HTML
            if (char === '<') {
                isInsideTag = true;
                tagBuffer = '<';
            } else if (char === '>' && isInsideTag) {
                isInsideTag = false;
                tagBuffer += '>';
                currentText += tagBuffer;
                heading.innerHTML = currentText;
                tagBuffer = '';
            } else if (isInsideTag) {
                tagBuffer += char;
            } else {
                // Ajouter du texte normal caractère par caractère
                currentText += char;
                heading.innerHTML = currentText;
            }

            i++;
            setTimeout(type, isInsideTag ? 0 : speed); // Ne pas ralentir à l'intérieur des balises
        }
    };

    // Commencer à taper après un court délai
    setTimeout(type, 500);
};

// Fonction pour gérer l'indicateur de défilement
const handleScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    // Faire disparaître l'indicateur lorsque l'utilisateur commence à défiler
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.classList.add('fade-out');
        } else {
            scrollIndicator.classList.remove('fade-out');
        }
    });

    // Gérer le clic sur l'indicateur de défilement
    scrollIndicator.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            e.preventDefault();
            const targetId = e.target.closest('a').getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
};

// Initialize typing effect
window.addEventListener('load', typingEffect);

// Project cards hover effects
const enhanceProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        if (image) {
            card.addEventListener('mouseenter', () => {
                image.style.height = '220px';
            });

            card.addEventListener('mouseleave', () => {
                image.style.height = '200px';
            });
        }
    });
};

// Initialize project card enhancements
document.addEventListener('DOMContentLoaded', enhanceProjectCards);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate offset to account for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});