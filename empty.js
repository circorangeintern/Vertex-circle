// ===========================================================
// RentDirect — "No homes yet" empty state interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  initSearchNearby();
  initChangeFilters();
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
 * "Search Lekki instead" — placeholder action for switching the
 * active area filter to the suggested nearby area.
 */
function initSearchNearby() {
  const btn = document.getElementById('searchNearbyBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    console.log('Switching search area to Lekki');
    // Hook up real navigation / filter-state update here.
  });
}

/**
 * "Change filters" — placeholder action for reopening the
 * filter sheet (see search.html) so the user can adjust criteria.
 */
function initChangeFilters() {
  const btn = document.getElementById('changeFiltersBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    console.log('Opening filter sheet');
    // Hook up navigation to the filter sheet here.
  });
}
