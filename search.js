// ===========================================================
// RentDirect — "Filter homes" bottom sheet interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initCloseButton();
  initChipGroups();
  initVerifiedSwitch();
  initClearAll();
  initRipple(document.getElementById('showResultsBtn'));
  initBottomNav();
});

/**
 * Close button dismisses the sheet by returning to the previous
 * screen in history (the "Find a home" screen behind it).
 */
function initCloseButton() {
  const closeBtn = document.getElementById('closeBtn');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  });
}

/**
 * Each chip row behaves as a single-select group: tapping a chip
 * selects it and deselects any sibling chip in the same group.
 */
function initChipGroups() {
  const groups = document.querySelectorAll('.chip-row[data-group]');

  groups.forEach((group) => {
    const chips = group.querySelectorAll('.chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('chip-selected'));
        chip.classList.add('chip-selected');
      });
    });
  });
}

/**
 * Toggles the "Verified homes only" switch on click, updating
 * both the visual state and the aria-checked attribute.
 */
function initVerifiedSwitch() {
  const toggle = document.getElementById('verifiedSwitch');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isOn = toggle.classList.toggle('is-on');
    toggle.setAttribute('aria-checked', String(isOn));
  });
}

/**
 * "Clear all" resets every chip group to no selection and turns
 * the verified switch off.
 */
function initClearAll() {
  const clearBtn = document.getElementById('clearBtn');
  if (!clearBtn) return;

  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((chip) => {
      chip.classList.remove('chip-selected');
    });

    const toggle = document.getElementById('verifiedSwitch');
    if (toggle) {
      toggle.classList.remove('is-on');
      toggle.setAttribute('aria-checked', 'false');
    }
  });
}

/**
 * Adds a material-style ripple animation to the primary CTA
 * button, centered on the pointer position.
 */
function initRipple(button) {
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
