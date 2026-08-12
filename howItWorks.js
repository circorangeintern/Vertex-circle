// ===========================================================
// RentDirect — "How it works" screen interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  initRipple();
  initCardPress();
});

/**
 * Back button navigates to the previous screen in history.
 * Falls back gracefully if there is no previous entry.
 */
function initBackButton() {
  const backBtn = document.getElementById('backBtn');
  if (!backBtn) return;

  backBtn.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  });
}

/**
 * Adds a material-style ripple animation to the primary CTA button
 * on click, centered on the pointer position.
 */
function initRipple() {
  const button = document.getElementById('startBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });

    // Placeholder action — hook up real navigation here.
    console.log('Start searching tapped');
  });
}

/**
 * Adds a subtle press-down effect on info cards for touch/keyboard
 * interactions, on top of the CSS hover/active states.
 */
function initCardPress() {
  const cards = document.querySelectorAll('.info-card');

  cards.forEach((card) => {
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.add('is-pressed');
        setTimeout(() => card.classList.remove('is-pressed'), 150);
      }
    });
  });
}
