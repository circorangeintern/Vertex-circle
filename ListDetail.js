/**
 * RentDirect - Listing Detail Interactions
 * Vanilla JavaScript implementation for navigation, hover effects, and ripple animation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Back button implementation using history.back()
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback action if no history exists
                alert('Navigating back to listings overview.');
            }
        });
    }

    // 2. Button Ripple & Click Animation for Primary CTA
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Action simulation for contact reveal event
            console.log('contact_revealed event triggered.');
            setTimeout(() => {
                alert("Landlord Contact: 08012345678 (Mr. Adebayo)");
            }, 200);
        });
    }

    // 3. Interactive Pagination Dots Simulator for Hero Carousel
    const dots = document.querySelectorAll('.pagination-dots .dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            console.log(`Switched to image slide ${index + 1}`);
        });
    });

    // 4. Press & Hover micro-interactions for Chips & Info Cards
    const cards = document.querySelectorAll('.info-card, .chip');
    cards.forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'scale(0.98)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
});