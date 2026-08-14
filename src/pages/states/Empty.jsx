import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/states.css';

export default function Empty() {
  const navigate = useNavigate();

  return (
    <section className="state-container">
      <div className="state-icon">
        <svg viewBox="0 0 24 24" fill="none" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 11.5L12 4.8L19.5 11.5" stroke="#8A8175" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.3 10V18C6.3 18.55 6.75 19 7.3 19H16.7C17.25 19 17.7 18.55 17.7 18V10" stroke="#8A8175" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.3 19V14.3H13.7V19" stroke="#8A8175" strokeWidth="1.7" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="state-title">No homes in Ajah yet</h2>
      <p className="state-desc">New homes are added every week. Try a nearby area or a different price.</p>

      <button className="btn-primary" onClick={() => navigate('/search-listing')}>
        Search Lekki instead
      </button>

      <button className="btn-clear" onClick={() => navigate('/search')} style={{ marginTop: '8px' }}>
        Change filters
      </button>
    </section>
  );
}
