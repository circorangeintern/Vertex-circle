import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ContactReveal.css';

export default function ContactReveal() {
  const navigate = useNavigate();
  const [copiedHint, setCopiedHint] = useState('Tap and hold to copy');
  const timerRef = useRef(null);

  const phoneNumber = '0803 456 7890';
  const phoneDial = '08034567890';

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phoneNumber);
    }
    setCopiedHint('Copied!');
    setTimeout(() => {
      setCopiedHint('Tap and hold to copy');
    }, 1500);
  };

  const startHold = () => {
    timerRef.current = setTimeout(handleCopy, 500);
  };

  const cancelHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="app">
      {/* Dimmed backdrop */}
      <div 
        className="backdrop" 
        aria-hidden="true" 
        onClick={() => navigate(-1)}
        style={{ cursor: 'pointer', height: '200px' }}
      />

      {/* Contact bottom sheet */}
      <main className="sheet" id="contactSheet" role="dialog" aria-modal="true" aria-labelledby="landlordName">
        <div className="sheet-handle" aria-hidden="true"></div>

        <div className="sheet-content">
          {/* Landlord identity */}
          <div className="landlord-row">
            <span className="avatar" aria-hidden="true">A</span>
            <span className="landlord-copy">
              <span className="landlord-name" id="landlordName">Mr. Adebayo O.</span>
              <span className="landlord-sub">Landlord &middot; Self–contained, Yaba</span>
            </span>
          </div>

          {/* Phone card with long press / tap */}
          <button 
            className="phone-card" 
            id="phoneCard" 
            aria-label="Copy phone number"
            onMouseDown={startHold}
            onTouchStart={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchEnd={cancelHold}
            onClick={handleCopy}
          >
            <span className="phone-label">Phone / WhatsApp</span>
            <span className="phone-number" id="phoneNumber">{phoneNumber}</span>
            <span className={`phone-hint ${copiedHint === 'Copied!' ? 'is-copied' : ''}`} id="phoneHint">
              {copiedHint}
            </span>
          </button>

          {/* Actions */}
          <div className="action-row">
            <button 
              className="btn-call" 
              id="callBtn"
              onClick={() => window.location.href = `tel:${phoneDial}`}
            >
              Call now
            </button>
            <button 
              className="btn-whatsapp" 
              id="whatsappBtn"
              onClick={() => window.open(`https://wa.me/234${phoneDial.slice(1)}`, '_blank', 'noopener')}
            >
              WhatsApp
            </button>
          </div>

          <p className="footnote">Mention RentDirect when you call. Never pay before inspecting in person.</p>
        </div>
      </main>
    </div>
  );
}
