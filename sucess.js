/**
 * RentDirect - Listing Status Interactions
 * Vanilla JavaScript implementation for tab navigation, timeline interactivity, and micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Bottom Navigation Tab Switching
    const navItems = document.querySelectorAll('.footer-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => {
                nav.classList.remove('active');
                // Reset SVG stroke colors in inactive tabs
                const svgPath = nav.querySelector('svg path');
                if (svgPath && nav.getAttribute('data-tab') !== 'find') {
                    // non-active icons use default ink-soft
                }
            });

            this.classList.add('active');
            const tabName = this.getAttribute('data-tab');
            console.log(`Switched to tab: ${tabName}`);
        });
    });

    // 2. Card Press & Hover Feedback
    const cards = document.querySelectorAll('.info-card');
    cards.forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'scale(0.99)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(-1px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // 3. Timeline Item Interactive feedback
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const title = item.querySelector('.timeline-title').textContent;
            console.log(`Timeline step clicked: ${title} (Step ${index + 1})`);
        });
    });
});