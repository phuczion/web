document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
    }
    if(closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
    }
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });

    // Audio Player
    const playBtn = document.getElementById('play-btn');
    const bgMusic = document.getElementById('bg-music');
    if (playBtn && bgMusic) {
        const enableAudio = () => {
            if (bgMusic.paused) {
                bgMusic.volume = 0.3;
                bgMusic.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(error => console.log('Autoplay prevented.'));
            }
            document.body.removeEventListener('click', enableAudio);
        };
        document.body.addEventListener('click', enableAudio, { once: true });

        playBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                bgMusic.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    // Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(element => scrollObserver.observe(element));

    // Smooth Scrolling for anchor links on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Member Card 3D effect
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Lightbox Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (galleryItems.length > 0 && lightbox) {
        const closeBtn = lightbox.querySelector('.lightbox-close');

        const openLightbox = (imgUrl) => {
            lightboxImg.setAttribute('src', imgUrl);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                openLightbox(item.dataset.src || item.href);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            this.reset();
        });
    }
});