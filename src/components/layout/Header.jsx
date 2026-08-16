import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Header({ showBack, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close drawer whenever route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          {showBack ? (
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
          ) : (
            <BrandLogo size="md" to="/home" />
          )}

          {title && <h1 className="app-title">{title}</h1>}
        </div>

        <div className="header-right">
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
            className="btn-accent header-list-btn"
            id="listPropertyBtn"
            onClick={() => navigate('/list/step-1')}
          >
            List property
          </button>

          {/* Hamburger Toggle Button */}
          <button
            className={`hamburger-btn ${isMenuOpen ? 'is-active' : ''}`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </header>

      {/* Hamburger Navigation Drawer Overlay */}
      {isMenuOpen && (
        <div className="hamburger-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="hamburger-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <BrandLogo size="md" to="/home" onClick={() => setIsMenuOpen(false)} />
              <button className="drawer-close-btn" onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
                ✕
              </button>
            </div>

            <nav className="drawer-nav">
              <NavLink to="/home" className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}>
                <svg className="drawer-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 11.5L12 4.5L20 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 10V19C6 19.55 6.45 20 7 20H17C17.55 20 18 19.55 18 19V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Find a home</span>
              </NavLink>

              <NavLink to="/list/step-1" className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}>
                <svg className="drawer-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>List your property</span>
              </NavLink>

              <NavLink to="/how-it-works" className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}>
                <svg className="drawer-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.7 9.3C9.9 8.1 10.9 7.3 12.1 7.4C13.3 7.5 14.2 8.5 14 9.7C13.85 10.7 13 11.1 12.4 11.6C11.9 12 11.6 12.4 11.6 13.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="11.7" cy="15.6" r="0.9" fill="currentColor"/>
                </svg>
                <span>How it works</span>
              </NavLink>

              <NavLink to="/admin" className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}>
                <svg className="drawer-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
                </svg>
                <span>Admin Verification</span>
              </NavLink>
            </nav>

            <div className="drawer-footer">
              <button
                className="btn-primary"
                style={{ width: '100%', height: '48px' }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/list/step-1');
                }}
              >
                + List Property Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


