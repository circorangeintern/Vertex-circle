// ===========================================================
// RentDirect — "Homes in Yaba" loading screen interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  animateLoadingStatus();
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
 * Cycles the trailing dots on "Finding homes…" so the status
 * line feels alive while listings are still loading.
 * Purely cosmetic — replace with a real fetch/render swap once
 * listing data is available.
 */
function animateLoadingStatus() {
  const status = document.getElementById('loadingStatus');
  if (!status) return;

  const baseText = 'Finding homes';
  const dotStates = ['', '.', '..', '...'];
  let step = 0;

  setInterval(() => {
    step = (step + 1) % dotStates.length;
    status.textContent = `${baseText}${dotStates[step]}`;
  }, 500);
}
