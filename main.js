/**
 * Progressive interactions for the portfolio.
 * Keeps content usable when JavaScript is unavailable and respects reduced-motion preferences.
 */
(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', () => {
        revealSections(prefersReducedMotion);

        if (prefersReducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        initTiltCards();
        initMagneticButtons();
    });

    function revealSections(reducedMotion) {
        const sections = document.querySelectorAll('section');

        if (!sections.length) {
            return;
        }

        if (!('IntersectionObserver' in window) || reducedMotion) {
            sections.forEach(section => section.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -15% 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
    }

    function initTiltCards() {
        document.querySelectorAll('[data-tilt]').forEach(item => {
            item.addEventListener('mousemove', event => {
                const rect = item.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }

    function initMagneticButtons() {
        document.querySelectorAll('.btn, .vermas').forEach(button => {
            button.addEventListener('mousemove', event => {
                const rect = button.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
})();
