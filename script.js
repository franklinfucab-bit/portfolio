/* ============================================
   Portfolio interactivity
   ============================================ */

(function () {
    'use strict';

    /* ----- English / 中文 ----- */

    let currentLang = 'en';

    const pageCopy = {
        en: {
            title: 'Franklin Fu — Portfolio',
            description: 'Franklin Fu — UW ECE student working on robotics, embedded systems, and machine learning research.'
        },
        zh: {
            title: 'Franklin Fu — 作品集',
            description: 'Franklin Fu，华盛顿大学 ECE 学生，从事机器人、嵌入式系统与机器学习研究。'
        }
    };

    function galleryLabels() {
        return currentLang === 'zh'
            ? { show: '展开更多', hide: '收起' }
            : { show: 'Show more', hide: 'Show less' };
    }

    function updateLightboxLabels() {
        if (!lightbox) return;
        const zh = currentLang === 'zh';
        lightbox.setAttribute('aria-label', zh ? '图片查看' : 'Photo viewer');
        lightbox.querySelector('.lightbox-close')?.setAttribute('aria-label', zh ? '关闭 (Esc)' : 'Close (Esc)');
        lightbox.querySelector('.lightbox-prev')?.setAttribute('aria-label', zh ? '上一张' : 'Previous');
        lightbox.querySelector('.lightbox-next')?.setAttribute('aria-label', zh ? '下一张' : 'Next');
    }

    function applyLanguage(lang) {
        currentLang = lang === 'zh' ? 'zh' : 'en';
        const zh = currentLang === 'zh';
        document.documentElement.lang = zh ? 'zh-Hans' : 'en';

        document.querySelectorAll('[data-zh]').forEach((el) => {
            if (!el.dataset.en) el.dataset.en = el.textContent;
            el.textContent = zh ? el.dataset.zh : el.dataset.en;
        });

        document.querySelectorAll('[data-zh-html]').forEach((el) => {
            if (!el.dataset.enHtml) el.dataset.enHtml = el.innerHTML;
            el.innerHTML = zh ? el.dataset.zhHtml : el.dataset.enHtml;
        });

        document.querySelectorAll('[data-zh-alt]').forEach((el) => {
            if (!el.dataset.enAlt) el.dataset.enAlt = el.getAttribute('alt') || '';
            el.setAttribute('alt', zh ? el.dataset.zhAlt : el.dataset.enAlt);
        });

        document.querySelectorAll('[data-zh-aria]').forEach((el) => {
            if (!el.dataset.enAria) el.dataset.enAria = el.getAttribute('aria-label') || '';
            const label = zh ? el.dataset.zhAria : el.dataset.enAria;
            el.setAttribute('aria-label', label);
            if (el.hasAttribute('title') && el.classList.contains('icon-button')) {
                el.setAttribute('title', label);
            }
        });

        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', pageCopy[currentLang].description);
        document.title = pageCopy[currentLang].title;

        const heroName = document.querySelector('.hero-name h1');
        if (heroName) {
            let cn = heroName.querySelector('.name-cn');
            if (zh) {
                if (!cn) {
                    cn = document.createElement('span');
                    cn.className = 'name-cn';
                    cn.textContent = '傅振洋';
                    heroName.appendChild(cn);
                }
            } else if (cn) {
                cn.remove();
            }
        }

        const toggle = document.getElementById('lang-toggle');
        if (toggle) {
            toggle.textContent = zh ? 'EN' : '中文';
            toggle.setAttribute('aria-pressed', zh ? 'true' : 'false');
            toggle.setAttribute('aria-label', zh ? 'Switch to English' : '切换到中文');
        }

        document.querySelectorAll('.gallery-toggle').forEach((button) => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            const labels = galleryLabels();
            button.textContent = expanded ? labels.hide : labels.show;
        });

        updateLightboxLabels();

        try {
            localStorage.setItem('portfolio-lang', currentLang);
        } catch (err) {
            /* ignore private-mode storage failures */
        }
    }

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
        lightbox.setAttribute('aria-label', currentLang === 'zh' ? '图片查看' : 'Photo viewer');
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
        updateLightboxLabels();

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

    /* ----- Gallery show-more ----- */

    document.querySelectorAll('.gallery-toggle').forEach((button) => {
        const gallery = document.getElementById(button.getAttribute('aria-controls') || '');
        if (!gallery) return;
        button.addEventListener('click', () => {
            const expanded = gallery.classList.toggle('is-collapsed') === false;
            button.setAttribute('aria-expanded', String(expanded));
            const labels = galleryLabels();
            button.textContent = expanded ? labels.hide : labels.show;
        });
    });

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLanguage(currentLang === 'zh' ? 'en' : 'zh');
        });
    }

    let savedLang = 'en';
    try {
        savedLang = localStorage.getItem('portfolio-lang') === 'zh' ? 'zh' : 'en';
    } catch (err) {
        savedLang = 'en';
    }
    applyLanguage(savedLang);
})();
