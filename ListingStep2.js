// ===========================================================
// RentDirect — List property · Step 2 of 5 interactions
// ===========================================================

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  initAddPhoto();
  initRemoveButtons();
  updatePhotoCount();
  initContinueButton();
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
 * Clicking the dashed "Add photo" tile opens the native file
 * picker; selected files are appended as new photo tiles.
 */
function initAddPhoto() {
  const addTile = document.getElementById('addPhotoTile');
  const fileInput = document.getElementById('fileInput');
  const grid = document.getElementById('photoGrid');
  if (!addTile || !fileInput || !grid) return;

  addTile.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const currentCount = grid.querySelectorAll('.photo-tile-filled').length;
    const remainingSlots = MAX_PHOTOS - currentCount;

    Array.from(fileInput.files)
      .slice(0, remainingSlots)
      .forEach((file) => addPhotoTile(file));

    fileInput.value = ''; // allow re-selecting the same file later
    updatePhotoCount();
  });
}

/**
 * Builds a new photo tile with a real image preview (via an
 * object URL for the selected file) and inserts it before the
 * "Add photo" tile so that tile always stays first.
 */
function addPhotoTile(file) {
  const grid = document.getElementById('photoGrid');
  const addTile = document.getElementById('addPhotoTile');
  if (!grid || !addTile) return;

  const filename = file.name || 'photo.jpg';
  const previewUrl = URL.createObjectURL(file);

  const tile = document.createElement('div');
  tile.className = 'photo-tile photo-tile-filled';
  tile.dataset.filename = filename;
  tile.dataset.previewUrl = previewUrl;
  tile.innerHTML = `
    <img class="photo-preview" src="${previewUrl}" alt="${escapeHtml(filename)}" />
    <span class="photo-filename">${escapeHtml(filename)}</span>
    <button class="remove-btn" aria-label="Remove ${escapeHtml(filename)}">
      <svg class="icon icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6L14 14" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M14 6L6 14" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  grid.insertBefore(tile, addTile.nextSibling);
  bindRemoveButton(tile.querySelector('.remove-btn'));
}

/**
 * Wires up the "X" remove button already present on each
 * server-rendered photo tile.
 */
function initRemoveButtons() {
  document.querySelectorAll('.photo-tile-filled .remove-btn').forEach(bindRemoveButton);
}

function bindRemoveButton(button) {
  if (!button || button.dataset.bound) return;
  button.dataset.bound = 'true';

  button.addEventListener('click', () => {
    const tile = button.closest('.photo-tile-filled');
    if (tile) {
      if (tile.dataset.previewUrl) {
        URL.revokeObjectURL(tile.dataset.previewUrl);
      }
      tile.remove();
      updatePhotoCount();
    }
  });
}

/**
 * Updates the "X of 5 minimum added" caption and toggles whether
 * "Add photo" is available once the max is reached.
 */
function updatePhotoCount() {
  const grid = document.getElementById('photoGrid');
  const countLabel = document.getElementById('photoCount');
  const addTile = document.getElementById('addPhotoTile');
  if (!grid || !countLabel) return;

  const count = grid.querySelectorAll('.photo-tile-filled').length;
  countLabel.textContent = `${count} of ${MIN_PHOTOS} minimum added`;
  // e.g. "0 of 3 minimum added" → "5 of 3 minimum added" once past the minimum

  if (addTile) {
    const atMax = count >= MAX_PHOTOS;
    addTile.style.display = atMax ? 'none' : '';
  }

  syncContinueState(count);
}

/**
 * Disables "Continue" until the minimum photo count is met.
 */
function syncContinueState(count) {
  const continueBtn = document.getElementById('continueBtn');
  if (!continueBtn) return;
  continueBtn.disabled = count < MIN_PHOTOS;
}

/**
 * "Continue" adds a ripple for feedback and advances to the
 * next step once the minimum photo requirement is met.
 */
function initContinueButton() {
  const button = document.getElementById('continueBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    if (button.disabled) return;
    addRipple(button, event);
    console.log('Step 2 complete — advancing to Step 3 of 5');
    // Hook up real navigation to the next step here.
    setTimeout(() => {
      window.location.href = './home.html';
    }, 350); // delay to let ripple animation play
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
 * Minimal HTML-escaping for filenames inserted via innerHTML.
 */
function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}
