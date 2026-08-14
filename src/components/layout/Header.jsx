import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Header({ showBack, title }) {
  const navigate = useNavigate();

  if (showBack) {
    return (
      <header className="app-header">
        <button
          className="back-btn"
          id="backBtn"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon icon-arrow">
            <path d="M19 12H5" stroke="#26221C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="#26221C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {title && <h1 className="app-title">{title}</h1>}
      </header>
    );
  }

  return (
    <header className="app-header">
      <Link to="/home" className="brand" style={{ textDecoration: 'none' }}>
        <span className="brand-mark" aria-hidden="true">R</span>
        <span className="brand-name">RentDirect</span>
      </Link>
      <button
        className="btn-accent"
        id="listPropertyBtn"
        onClick={() => navigate('/list/step-1')}
      >
        List your property
      </button>
    </header>
  );
}
