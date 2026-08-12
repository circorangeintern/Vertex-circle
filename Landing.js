// ===========================================================
// RentDirect — Landing / splash screen interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initRipple(document.getElementById('findHomeBtn'));
  initRipple(document.getElementById('listPropertyBtn'), 'rgba(45,106,79,0.18)');
  initNavigation();
});

/**
 * Adds a material-style ripple animation to a button on click,
 * centered on the pointer position.
 */
function initRipple(button, color) {
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
    if (color) ripple.style.background = color;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
}

/**
 * Placeholder navigation for the three entry points — wire each
 * of these to the real screen once routing is in place
 * (home.html, ListStep1.html, index.html respectively).
 */
function initNavigation() {
  const findHomeBtn = document.getElementById('findHomeBtn');
  const listPropertyBtn = document.getElementById('listPropertyBtn');
  const howItWorksBtn = document.getElementById('howItWorksBtn');

  findHomeBtn?.addEventListener('click', () => {
    console.log('Navigate to: Find a home');
  });

  listPropertyBtn?.addEventListener('click', () => {
    console.log('Navigate to: List your property');
  });

  howItWorksBtn?.addEventListener('click', () => {
    console.log('Navigate to: How it works');
  });
}
