// ===========================================================
// RentDirect — List property · Step 1 of 5 interactions
// ===========================================================

const STORAGE_KEY = 'rentdirect_listing_step1';

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  restoreSavedValues();
  initAutosave();
  initContinueButton();
  initBottomNav();
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
 * Restores any values the user already typed for this step,
 * per the RentDirect behavior spec: "Stepper autosaves per step
 * to localStorage."
 */
function restoreSavedValues() {
  const saved = readSavedValues();
  if (!saved) return;

  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const phoneInput = document.getElementById('phoneInput');

  if (titleInput && saved.title) titleInput.value = saved.title;
  if (descriptionInput && saved.description) descriptionInput.value = saved.description;
  if (phoneInput && saved.phone) phoneInput.value = saved.phone;
}

/**
 * Saves form field values to localStorage on every input, so
 * progress isn't lost if the user leaves mid-step.
 */
function initAutosave() {
  const form = document.getElementById('listingForm');
  if (!form) return;

  form.addEventListener('input', () => {
    const data = {
      title: document.getElementById('titleInput')?.value || '',
      description: document.getElementById('descriptionInput')?.value || '',
      phone: document.getElementById('phoneInput')?.value || ''
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Autosave failed:', err);
    }
  });
}

function readSavedValues() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Could not read saved listing data:', err);
    return null;
  }
}

/**
 * "Continue" validates the required fields, marking any empty
 * ones with the error state, and adds a ripple for feedback.
 */
function initContinueButton() {
  const button = document.getElementById('continueBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    addRipple(button, event);

    if (validateStep()) {
      console.log('Step 1 complete — advancing to Step 2 of 5');
      // Hook up real navigation to the next step here.
      setTimeout(() => {
        window.location.href = button.getAttribute('href') || './ListingStep2.html';
      }, 350); // delay to let ripple animation play
    }
  });
}

/**
 * Marks empty required fields with the error state defined in
 * the RentDirect component spec (error border + tinted fill).
 */
function validateStep() {
  const fields = [
    { input: document.getElementById('titleInput'), group: 'title-group' },
    { input: document.getElementById('phoneInput'), group: 'phone-group' }
  ];

  let isValid = true;

  fields.forEach(({ input }) => {
    if (!input) return;
    const group = input.closest('.field-group');
    const isEmpty = input.value.trim().length === 0;

    if (group) {
      group.classList.toggle('has-error', isEmpty);
    }
    if (isEmpty) isValid = false;
  });

  return isValid;
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
 * Bottom navigation: swaps the active tab on click.
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
