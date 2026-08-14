import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/states.css';

export default function Error() {
  const navigate = useNavigate();

  return (
    <section className="state-container">
      <div className="state-icon" style={{ background: '#FDF3F1' }}>
        <svg viewBox="0 0 24 24" fill="none" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8.5" stroke="#A33B2E" strokeWidth="1.6"/>
          <path d="M12 7.8V12.6" stroke="#A33B2E" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="12" cy="15.8" r="0.9" fill="#A33B2E"/>
        </svg>
      </div>

      <h2 className="state-title">Couldn't load listings</h2>
      <p className="state-desc">Check your internet connection, then try again. Your search is saved.</p>

      <button className="btn-primary" onClick={() => navigate('/home')}>
        <span className="btn-label">Try again</span>
      </button>
    </section>
  );
}
