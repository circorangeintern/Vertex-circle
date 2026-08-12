/**
 * RentDirect - Step 4 Interactions
 * Vanilla JavaScript implementation for back navigation, chip selection, input handling, and ripple animation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Back button implementation using history.back()
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                alert('Navigating back to previous step.');
            }
        });
    }

    // 2. Chip selection logic
    const chips = document.querySelectorAll('.chip');
    const locationInput = document.getElementById('locationInput');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            
            const value = chip.getAttribute('data-value');
            if (locationInput) {
                locationInput.value = value;
            }
            console.log(`Selected location: ${value}`);
        });
    });

    // Sync input typing with chips selection state if typed manually
    if (locationInput) {
        locationInput.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            let matched = false;
            chips.forEach(chip => {
                if (chip.getAttribute('data-value').toLowerCase() === val) {
                    chip.classList.add('selected');
                    matched = true;
                } else {
                    chip.classList.remove('selected');
                }
            });
        });
    }

    // 3. Button Ripple & Click Animation for Continue CTA
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function (e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            const selectedLocation = locationInput ? locationInput.value : 'None';
            console.log(`Proceeding with location: ${selectedLocation}`);
            setTimeout(() => {
                alert(`Proceeding to Step 5 with location: ${selectedLocation || 'Not specified'}`);
            }, 200);
        });
    }

    // 4. Press & Hover micro-interactions for chips
    chips.forEach(chip => {
        chip.addEventListener('mousedown', () => {
            chip.style.transform = 'scale(0.96)';
        });
        chip.addEventListener('mouseup', () => {
            chip.style.transform = 'scale(1)';
        });
        chip.addEventListener('mouseleave', () => {
            chip.style.transform = 'scale(1)';
        });
    });
});