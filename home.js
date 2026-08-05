// ===========================================================
// RentDirect — "Find a home" screen interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initFilterChips();
  initRipple(document.getElementById('listPropertyBtn'), 'rgba(255,255,255,0.35)');
  initBottomNav();
  initCardPress();
});

/**
 * Toggles the "selected" state on filter chips. Multiple chips
 * can be active at once, matching typical filter-bar behavior.
 */
function initFilterChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('chip-selected');
    });
  });
}

/**
 * Adds a material-style ripple animation to a button on click,
 * centered on the pointer position.
 */
function initRipple(button, color) {
  if (!button) return;

  button.style.position = button.style.position || 'relative';
  button.style.overflow = 'hidden';

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
    if (color) ripple.style.background = color;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
}

/**
 * Bottom navigation: only one tab is active at a time.
 * Swaps the "is-active" class to whichever tab was tapped.
 */
function initBottomNav() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navItems.forEach((el) => el.classList.remove('is-active'));
      item.classList.add('is-active');
    });
  });
}

/**
 * Adds a keyboard-accessible press animation on listing cards
 * (mouse press is already handled by the CSS :active state).
 */
function initCardPress() {
  const cards = document.querySelectorAll('.listing-card');
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
