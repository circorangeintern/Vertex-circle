// ===========================================================
// RentDirect — Landlord contact reveal interactions
// ===========================================================

const PHONE_NUMBER = '0803 456 7890';
const PHONE_DIAL = '08034567890';

document.addEventListener('DOMContentLoaded', () => {
  initBackdropDismiss();
  initCopyOnHold();
  initCallButton();
  initWhatsAppButton();
});

/**
 * Tapping the dimmed backdrop behind the sheet dismisses it,
 * returning to the previous screen (the listing detail page).
 */
function initBackdropDismiss() {
  const backdrop = document.querySelector('.backdrop');
  if (!backdrop) return;

  backdrop.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  });
}

/**
 * Long-press (or long-click on desktop) the phone number card to
 * copy the number to the clipboard, matching "Tap and hold to copy".
 */
function initCopyOnHold() {
  const card = document.getElementById('phoneCard');
  const hint = document.getElementById('phoneHint');
  if (!card || !hint) return;

  const HOLD_DURATION = 500;
  let holdTimer = null;

  const startHold = () => {
    holdTimer = setTimeout(() => copyPhoneNumber(hint), HOLD_DURATION);
  };

  const cancelHold = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  };

  card.addEventListener('mousedown', startHold);
  card.addEventListener('touchstart', startHold, { passive: true });

  ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach((evt) => {
    card.addEventListener(evt, cancelHold);
  });

  // Prevent the native context menu from interrupting the long-press.
  card.addEventListener('contextmenu', (event) => event.preventDefault());
}

/**
 * Copies the phone number to the clipboard and briefly swaps the
 * hint text to confirm the action.
 */
function copyPhoneNumber(hint) {
  const originalText = 'Tap and hold to copy';

  const showCopied = () => {
    hint.textContent = 'Copied!';
    hint.classList.add('is-copied');
    setTimeout(() => {
      hint.textContent = originalText;
      hint.classList.remove('is-copied');
    }, 1500);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PHONE_NUMBER).then(showCopied).catch(showCopied);
  } else {
    showCopied();
  }
}

/**
 * "Call now" opens the device dialer with the landlord's number.
 */
function initCallButton() {
  const button = document.getElementById('callBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    addRipple(button, event);
    window.location.href = `tel:${PHONE_DIAL}`;
  });
}

/**
 * "WhatsApp" opens a WhatsApp chat with the landlord's number.
 */
function initWhatsAppButton() {
  const button = document.getElementById('whatsappBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    addRipple(button, event);
    window.open(`https://wa.me/234${PHONE_DIAL.slice(1)}`, '_blank', 'noopener');
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
