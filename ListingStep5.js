/**
 * RentDirect - Step 5 Interactions
 * Vanilla JavaScript implementation for navigation, card interactions, edit actions, and ripple animation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Back button implementation using history.back()
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        alert("Navigating back to previous step.");
      }
    });
  }

  // 2. Edit button interactions across info cards
  //   const infoCards = document.querySelectorAll(".info-card");
  //   infoCards.forEach((card) => {
  //     const editBtn = card.querySelector(".edit-btn");
  //     const stepNum = card.getAttribute("data-step");
  //     const label = card.querySelector(".card-label").textContent;

  //     if (editBtn) {
  //       editBtn.addEventListener("click", (e) => {
  //         // e.stopPropagation(); // Prevent card click event trigger
  //         console.log(`Edit clicked for section: ${label} (Step ${stepNum})`);
  //         alert(`Redirecting to edit ${label.toLowerCase()}...`);
  //       });
  //     }

  //     card.addEventListener("click", () => {
  //       console.log(`Card clicked: ${label}`);
  //     });
  //   });

  // 3. Button Ripple & Click Animation for Submit CTA
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      // Create ripple element
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;

      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      console.log("Listing submitted for review.");
      setTimeout(() => {
        alert(
          "Success! Your listing has been submitted for review. Our team will check it within 1 working day.",
        );
      }, 200);
    });
  }
});
