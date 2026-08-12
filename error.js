// ===========================================================
// RentDirect — "Couldn't load listings" error state interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  initTryAgain();
});

/**
 * Back button navigates to the previous screen in history.
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
 * "Try again" — adds a ripple for feedback and re-triggers the
 * listings fetch. Wire the retry call into loadListings().
 */
function initTryAgain() {
  const button = document.getElementById('tryAgainBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    addRipple(button, event);
    loadListings();
  });
}

/**
 * Adds a material-style ripple animation centered on the
 * pointer position.
 */
function addRipple(button, event) {
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
}

/**
 * Placeholder retry action — replace with the real listings
 * fetch (e.g. re-run the saved search from loading.html).
 */
function loadListings() {
  console.log('Retrying: fetching homes in Yaba…');
}
