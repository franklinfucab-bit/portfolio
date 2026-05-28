/* ============================================
   Portfolio interactivity
   ============================================ */

(function () {
    'use strict';

    /* ----- Smooth scroll for in-page anchors ----- */

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;
        const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                smoothScrollTo(href.slice(1));
                history.replaceState(null, '', href);
            }
        });
    });

    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            if (href.length > 1) {
                e.preventDefault();
                smoothScrollTo(href.slice(1));
            }
        });
    });

    /* ----- Active-section highlight in navbar ----- */

    let scrollTicking = false;
    function updateActiveLink() {
        const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 0;
        const fromTop = window.scrollY + navHeight + 80;

        let current = sections[0]?.id;
        for (const section of sections) {
            if (section.offsetTop <= fromTop) {
                current = section.id;
            }
        }

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${current}`;
            link.classList.toggle('active', isActive);
        });
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    updateActiveLink();

    /* ----- Reveal-on-scroll animation ----- */

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    }

    /* ----- Auto-update footer year ----- */

    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ----- Hero portrait slideshow ----- */

    const heroPortrait = document.querySelector('.hero-portrait');
    if (heroPortrait) {
        const heroImages = Array.from(heroPortrait.querySelectorAll('img'));
        const heroDots = Array.from(heroPortrait.querySelectorAll('.hero-dot'));
        if (heroImages.length > 1) {
            const SLIDE_MS = 5500;
            let currentSlide = 0;
            let timer = null;

            const showSlide = (next) => {
                heroImages[currentSlide]?.classList.remove('is-active');
                heroDots[currentSlide]?.classList.remove('is-active');
                currentSlide = (next + heroImages.length) % heroImages.length;
                heroImages[currentSlide]?.classList.add('is-active');
                heroDots[currentSlide]?.classList.add('is-active');
            };

            const restart = () => {
                if (timer) clearInterval(timer);
                timer = setInterval(() => showSlide(currentSlide + 1), SLIDE_MS);
            };

            heroDots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    showSlide(i);
                    restart();
                });
            });

            heroPortrait.addEventListener('mouseenter', () => timer && clearInterval(timer));
            heroPortrait.addEventListener('mouseleave', restart);

            restart();
        }
    }

    /* ----- Gallery: missing-image placeholder fallback ----- */

    document.querySelectorAll('.gallery-item img').forEach((img) => {
        img.addEventListener('error', () => {
            const figure = img.closest('.gallery-item');
            if (!figure) return;
            figure.classList.add('is-placeholder');
            const slot = figure.dataset.slot || '';
            img.removeAttribute('src');
            img.setAttribute('alt', `Photo slot ${slot}`);
        }, { once: true });
    });

    /* ----- Lightbox (scoped per gallery) ----- */

    let lightbox = null;
    let lightboxImg = null;
    let lightboxCaption = null;
    let activePhotos = [];
    let lightboxIndex = 0;

    function ensureLightbox() {
        if (lightbox) return;
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Photo viewer');
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close (Esc)">&times;</button>
            <button class="lightbox-prev" aria-label="Previous (\u2190)">&#10094;</button>
            <figure class="lightbox-figure">
                <img class="lightbox-img" alt="">
                <figcaption class="lightbox-caption"></figcaption>
            </figure>
            <button class="lightbox-next" aria-label="Next (\u2192)">&#10095;</button>
        `;
        document.body.appendChild(lightbox);
        lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxCaption = lightbox.querySelector('.lightbox-caption');

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
    }

    function showCurrent() {
        const figure = activePhotos[lightboxIndex];
        if (!figure) return;
        const img = figure.querySelector('img');
        const cap = figure.querySelector('figcaption')?.textContent || '';
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent = cap;
    }

    function openLightbox(galleryEl, startIndex) {
        const photos = Array.from(galleryEl.querySelectorAll('.gallery-item:not(.is-placeholder)'));
        if (!photos.length) return;
        ensureLightbox();
        activePhotos = photos;
        lightboxIndex = (startIndex + photos.length) % photos.length;
        showCurrent();
        lightbox.classList.add('is-open');
        document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    }

    function navigate(delta) {
        if (!activePhotos.length) return;
        lightboxIndex = (lightboxIndex + delta + activePhotos.length) % activePhotos.length;
        showCurrent();
    }

    document.querySelectorAll('.gallery-item').forEach((figure) => {
        figure.addEventListener('click', () => {
            if (figure.classList.contains('is-placeholder')) return;
            const gallery = figure.closest('.gallery');
            if (!gallery) return;
            const photos = Array.from(gallery.querySelectorAll('.gallery-item:not(.is-placeholder)'));
            const i = photos.indexOf(figure);
            if (i >= 0) openLightbox(gallery, i);
        });
        figure.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !figure.classList.contains('is-placeholder')) {
                e.preventDefault();
                figure.click();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') navigate(-1);
        else if (e.key === 'ArrowRight') navigate(1);
    });
})();
