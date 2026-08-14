import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/howItWorks.css';

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <>
      {/* Section: If you are looking for a home */}
      <section className="group">
        <h2 className="group-label">If you are looking for a home</h2>

        <article className="info-card" tabIndex={0}>
          <span className="info-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <circle cx="11" cy="11" r="6.5" stroke="#2D6A4F" strokeWidth="1.8"/>
              <path d="M20 20L15.8 15.8" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="info-copy">
            <span className="info-title">Search homes near you</span>
            <span className="info-desc">Choose an area and a price you can pay.</span>
          </span>
        </article>

        <article className="info-card" tabIndex={0}>
          <span className="info-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <path d="M12 3L19 5.5V11C19 15.6 16 18.9 12 21C8 18.9 5 15.6 5 11V5.5L12 3Z" stroke="#2D6A4F" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M9 11.3L11.1 13.4L15.2 9.2" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="info-copy">
            <span className="info-title">Look for the green Verified mark</span>
            <span className="info-desc">It means our team has checked the listing.</span>
          </span>
        </article>

        <article className="info-card" tabIndex={0}>
          <span className="info-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <path d="M7.5 3.5H10L11.5 7.2L9.5 8.7C10.3 10.6 11.9 12.2 13.8 13L15.3 11L19 12.5V15C19 16.1 18.1 17 17 17C11.5 17 7 12.5 7 7C7 5.9 6.9 4.6 7.5 3.5Z" stroke="#2D6A4F" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="info-copy">
            <span className="info-title">Contact the landlord yourself</span>
            <span className="info-desc">Call or WhatsApp. You pay no agent fee.</span>
          </span>
        </article>
      </section>

      {/* Section: If you have a property to rent out */}
      <section className="group">
        <h2 className="group-label">If you have a property to rent out</h2>

        <article className="info-card" tabIndex={0}>
          <span className="info-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <path d="M4 8.5C4 7.4 4.9 6.5 6 6.5H8.2L9.2 5H14.8L15.8 6.5H18C19.1 6.5 20 7.4 20 18.5V16.5C20 17.6 19.1 18.5 18 18.5H6C4.9 18.5 4 17.6 4 16.5V8.5Z" stroke="#2D6A4F" strokeWidth="1.8" strokeLinejoin="round"/>
              <circle cx="12" cy="12.5" r="3.2" stroke="#2D6A4F" strokeWidth="1.8"/>
            </svg>
          </span>
          <span className="info-copy">
            <span className="info-title">Add your property</span>
            <span className="info-desc">Photos, price, and location. It takes about 5 minutes.</span>
          </span>
        </article>

        <article className="info-card" tabIndex={0}>
          <span className="info-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <circle cx="12" cy="12" r="8.5" stroke="#2D6A4F" strokeWidth="1.8"/>
              <path d="M8.3 12.3L10.8 14.8L15.7 9.6" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="info-copy">
            <span className="info-title">We check it</span>
            <span className="info-desc">Our team reviews it, usually within 2 days.</span>
          </span>
        </article>

        <article className="info-card" tabIndex={0}>
          <span className="info-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <path d="M7.5 3.5H10L11.5 7.2L9.5 8.7C10.3 10.6 11.9 12.2 13.8 13L15.3 11L19 12.5V15C19 16.1 18.1 17 17 17C11.5 17 7 12.5 7 7C7 5.9 6.9 4.6 7.5 3.5Z" stroke="#2D6A4F" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="info-copy">
            <span className="info-title">Tenants contact you</span>
            <span className="info-desc">Interested people call or message you directly.</span>
          </span>
        </article>
      </section>

      <button className="btn-primary" id="startBtn" onClick={() => navigate('/home')} style={{ marginTop: '24px' }}>
        <span className="btn-label">Start searching</span>
      </button>
    </>
  );
}
