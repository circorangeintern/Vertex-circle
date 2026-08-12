// ===========================================================
// RentDirect — Listing detail screen interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {
  initBackButton();
  initMediaDots();
  initContactReveal();
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
 * Lets the photo-pagination dots be tapped directly, and tracks
 * horizontal swipes over the media area to move between photos.
 * (Swaps the "is-active" dot only — wire in real photo sources
 * once the gallery has actual images.)
 */
function initMediaDots() {
  const carousel = document.getElementById('mediaCarousel');
  const dots = Array.from(document.querySelectorAll('#mediaDots .dot'));
  if (!carousel || dots.length === 0) return;

  let activeIndex = 0;

  const setActive = (index) => {
    if (index < 0 || index >= dots.length) return;
    dots[activeIndex].classList.remove('is-active');
    dots[activeIndex].setAttribute('aria-selected', 'false');
    activeIndex = index;
    dots[activeIndex].classList.add('is-active');
    dots[activeIndex].setAttribute('aria-selected', 'true');
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => setActive(index));
  });

  // Basic swipe detection (touch) to move between photos.
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    const swipeThreshold = 40;

    if (delta > swipeThreshold) {
      setActive(activeIndex - 1);
    } else if (delta < -swipeThreshold) {
      setActive(activeIndex + 1);
    }
  }, { passive: true });
}

/**
 * "Show Landlord's contact" — per RentDirect behavior spec, the
 * contact_revealed event must fire before the contact sheet is
 * shown. Adds a ripple for feedback, dispatches the event, then
 * reveals contact info (placeholder — wire in the real sheet).
 */
function initContactReveal() {
  const button = document.getElementById('showContactBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    addRipple(button, event);

    // Fire the tracking event before showing the contact sheet.
    document.dispatchEvent(new CustomEvent('contact_revealed', {
      detail: { listing: 'self-contained-apartment-yaba' }
    }));

    showContactSheet();
  });
}

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
 * Placeholder for the contact bottom sheet (phone / WhatsApp).
 * Replace with the real sheet component once it's built.
 */
function showContactSheet() {
  console.log('Showing landlord contact sheet…');
}
