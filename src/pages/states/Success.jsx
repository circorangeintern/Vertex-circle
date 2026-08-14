import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/states.css';

export default function Success() {
  const navigate = useNavigate();

  return (
    <>
      <section className="info-card success-card">
        <div className="success-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="card-title" style={{ margin: 0 }}>Your listing is in</h1>
        <p className="card-desc" style={{ margin: 0 }}>
          We'll review it within 1 working day. Save this page — it's your private link to check status and edit.
        </p>
      </section>

      <section className="info-card status-card" style={{ marginTop: '20px' }}>
        <h2 className="status-heading" style={{ margin: '0 0 16px 0' }}>STATUS</h2>
        
        <div className="timeline">
          {/* Step 1 */}
          <div className="timeline-item completed">
            <div className="timeline-indicator">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="timeline-content">
              <span className="timeline-title">Submitted</span>
              <span className="timeline-subtitle">Today, 2:14 pm</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="timeline-item active">
            <div className="timeline-indicator">
              <div className="inner-dot"></div>
            </div>
            <div className="timeline-content">
              <span className="timeline-title">Under review</span>
              <span className="timeline-subtitle">In progress</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="timeline-item pending">
            <div className="timeline-indicator"></div>
            <div className="timeline-content">
              <span className="timeline-title">Live & verified</span>
            </div>
          </div>
        </div>
      </section>

      <button
        className="btn-primary"
        style={{ marginTop: '24px' }}
        onClick={() => navigate('/home')}
      >
        Return to Find a Home
      </button>
    </>
  );
}
