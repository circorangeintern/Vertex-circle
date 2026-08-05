/* =========================================================
   RentDirect — Listing Step 3 interactions
   Vanilla JS only.
   ========================================================= */
(function () {
  "use strict";

  var STEP = 3;
  var TOTAL_STEPS = 5;
  var STORAGE_KEY = "rentdirect.listing.step3";

  var backBtn      = document.getElementById("backBtn");
  var continueBtn  = document.getElementById("continueBtn");
  var progressFill = document.getElementById("progressFill");
  var rentInput    = document.getElementById("rentInput");
  var rentField    = document.getElementById("rentField");
  var summaryValue = document.querySelector(".summary__value");
  var summaryCard  = document.querySelector(".summary__card");
  var chips        = Array.prototype.slice.call(document.querySelectorAll(".chip"));

  /* ---------- Helpers ---------- */

  /** "350000" -> "350,000" */
  function formatAmount(raw) {
    var digits = String(raw).replace(/\D/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function currentAmount() {
    return rentInput.value.replace(/\D/g, "");
  }

  /* ---------- Progress bar ---------- */
  requestAnimationFrame(function () {
    progressFill.style.width = (STEP / TOTAL_STEPS) * 100 + "%";
  });

  /* ---------- Back button ---------- */
  backBtn.addEventListener("click", function () {
    history.back();
  });

  /* ---------- Input: live format + summary sync + autosave ---------- */
  function syncSummary() {
    var formatted = formatAmount(rentInput.value);
    summaryValue.textContent = "\u20A6" + (formatted || "0");
    syncChips();
    save();
  }

  rentInput.addEventListener("input", function () {
    chipsInteracted = true;
    rentInput.value = formatAmount(rentInput.value);
    syncSummary();
  });

  rentInput.addEventListener("focus", function () {
    rentField.classList.add("is-focused");
  });

  rentInput.addEventListener("blur", function () {
    rentField.classList.remove("is-focused");
  });

  /* ---------- Chips ---------- */
  var chipsInteracted = false;

  function syncChips() {
    if (!chipsInteracted) return;      // no chip is pre-selected on load
    var value = currentAmount();
    chips.forEach(function (chip) {
      chip.classList.toggle("is-selected", chip.dataset.amount === value);
      chip.setAttribute("aria-pressed", chip.dataset.amount === value ? "true" : "false");
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chipsInteracted = true;
      rentInput.value = formatAmount(chip.dataset.amount);
      syncSummary();
    });
  });

  /* ---------- Card press animation ---------- */
  if (summaryCard) {
    ["pointerdown", "pointerup", "pointerleave", "pointercancel"].forEach(function (evt) {
      summaryCard.addEventListener(evt, function (e) {
        summaryCard.classList.toggle("is-pressed", e.type === "pointerdown");
      });
    });
  }

  /* ---------- Ripple on the primary CTA ---------- */
  continueBtn.addEventListener("pointerdown", function (event) {
    var rect = continueBtn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var ripple = document.createElement("span");

    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (event.clientX - rect.left - size / 2) + "px";
    ripple.style.top  = (event.clientY - rect.top  - size / 2) + "px";

    continueBtn.appendChild(ripple);
    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
  });

  continueBtn.addEventListener("click", function () {
    save();
    // Wire this to the next step of the flow.
    console.log("Continue with rent:", currentAmount());
  });

  /* ---------- Autosave per step (localStorage) ---------- */
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ rentPerYear: currentAmount() }));
    } catch (err) {
      /* storage unavailable — non-fatal */
    }
  }

  function restore() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && saved.rentPerYear) {
        rentInput.value = formatAmount(saved.rentPerYear);
      }
    } catch (err) {
      /* ignore malformed data */
    }
    syncSummary();
  }

  restore();
})();
