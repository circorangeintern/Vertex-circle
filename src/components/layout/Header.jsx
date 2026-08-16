import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Header({ showBack, title }) {
  const navigate = useNavigate();

  if (showBack) {
    return (
      <header className="app-header">
        <div className="header-left">
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
        </div>

        <nav className="desktop-header-nav">
          <NavLink to="/home" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
            Find a home
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
            How it works
          </NavLink>
        </nav>
      </header>
    );
  }

  return (
    <header className="app-header">
      <BrandLogo size="md" to="/home" />

        <nav className="desktop-header-nav">
          <NavLink to="/home" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
            Find a home
          </NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
            How it works
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
            Admin Queue
          </NavLink>
        </nav>

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

