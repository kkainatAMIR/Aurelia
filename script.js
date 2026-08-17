/* ============================================
   BLOOM SALON — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });
    // Fallback
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ============================================
    // SPARKLE CURSOR EFFECT
    // ============================================
    const sparkleContainer = document.getElementById('sparkleContainer');
    let sparkleThrottle = 0;
    
    document.addEventListener('mousemove', (e) => {
        sparkleThrottle++;
        if (sparkleThrottle % 3 !== 0) return;
        
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    });

    // ============================================
    // HERO PARTICLES
    // ============================================
    const heroParticles = document.getElementById('heroParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        heroParticles.appendChild(particle);
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Active nav link
        updateActiveNav();
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // STAT COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statCounted = false;
    
    function animateStats() {
        if (statCounted) return;
        
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        
        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statCounted = true;
            
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    num.textContent = Math.floor(current).toLocaleString();
                }, 16);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();

    // ============================================
    // 3D TILT EFFECT ON CARDS
    // ============================================
    function addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }
    
    // Apply tilt to various cards
    document.querySelectorAll('.about-img-3d').forEach(el => addTiltEffect(el));
    document.querySelectorAll('.contact-card-3d').forEach(el => addTiltEffect(el));
    document.querySelectorAll('.pricing-card-3d').forEach(el => addTiltEffect(el));
    document.querySelectorAll('.social-link-3d').forEach(el => addTiltEffect(el));
    document.querySelectorAll('.map-wrapper-3d').forEach(el => addTiltEffect(el));

    // ============================================
    // GALLERY FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-3d');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    
    document.querySelectorAll('.gallery-item-inner').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ============================================
    // TESTIMONIAL CAROUSEL
    // ============================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card-3d');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;
    let autoPlayInterval;
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateCarousel() {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        updateCarousel();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    startAutoPlay();
    
    // Touch support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
            resetAutoPlay();
        }
    }, { passive: true });

    // ============================================
    // BOOKING FORM
    // ============================================
    const bookingForm = document.getElementById('bookingForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Booking...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Booking Confirmed!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            showToast('Your appointment has been booked! We\'ll send a confirmation email shortly.');
            
            // Create confetti effect
            createConfetti();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                bookingForm.reset();
            }, 3000);
        }, 2000);
    });
    
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 5000);
    }

    // ============================================
    // CONFETTI EFFECT
    // ============================================
    function createConfetti() {
        const colors = ['#C77B95', '#D4A574', '#C4B1D4', '#E8A5B8', '#FFD700'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: ${6 + Math.random() * 8}px;
                height: ${6 + Math.random() * 8}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10002;
                pointer-events: none;
                animation: confettiFall ${2 + Math.random() * 3}s ease-in forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }
    
    // Add confetti keyframes
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Welcome to the Bloom family! Check your inbox for a special offer.');
            newsletterForm.reset();
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATION (AOS-like)
    // ============================================
    function initScrollReveal() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => observer.observe(el));
    }
    
    initScrollReveal();

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PARALLAX EFFECT ON FLOATING SHAPES
    // ============================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.floating-shape').forEach((shape, i) => {
            const speed = 0.02 + (i * 0.01);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ============================================
    // 3D MOUSE MOVE EFFECT ON HERO CARD
    // ============================================
    const hero3dCard = document.getElementById('hero3dCard');
    if (hero3dCard) {
        hero3dCard.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;
            
            const rect = hero3dCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            const inner = hero3dCard.querySelector('.card-3d-inner');
            if (inner && !hero3dCard.matches(':hover')) {
                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        hero3dCard.addEventListener('mouseleave', () => {
            const inner = hero3dCard.querySelector('.card-3d-inner');
            if (inner) {
                inner.style.transform = '';
            }
        });
    }

    // ============================================
    // TYPING EFFECT FOR HERO BADGE
    // ============================================
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        setTimeout(() => {
            heroBadge.style.opacity = '1';
            heroBadge.style.transition = 'opacity 0.8s ease';
        }, 200);
    }

    // ============================================
    // SERVICE CARD MOUSE MOVE (non-flip side tilt)
    // ============================================
    document.querySelectorAll('.service-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const bg = card.querySelector('.service-front');
            if (bg) {
                const gradientX = (x / rect.width) * 100;
                const gradientY = (y / rect.height) * 100;
                bg.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(199,123,149,0.05) 0%, white 50%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const bg = card.querySelector('.service-front');
            if (bg) bg.style.background = '';
        });
    });

    // ============================================
    // NAVBAR LINK HOVER SOUND EFFECT (visual)
    // ============================================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // ============================================
    // PRICING CARD HOVER GLOW
    // ============================================
    document.querySelectorAll('.pricing-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #C77B95, #D4A574, #C4B1D4);
        z-index: 10001;
        transition: width 0.1s ease;
        border-radius: 0 2px 2px 0;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ============================================
    // IMAGE LAZY LOAD WITH FADE IN
    // ============================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // ============================================
    // ACCESSIBILITY: Reduce motion preference
    // ============================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
    }
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c✿ Bloom Salon ✿', 'color: #C77B95; font-size: 24px; font-weight: bold; font-family: Georgia, serif;');
console.log('%cWhere beauty blossoms into art', 'color: #D4A574; font-size: 14px; font-style: italic;');
