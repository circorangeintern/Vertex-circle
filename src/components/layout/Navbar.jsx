import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <footer className="app-footer">
      <nav className="bottom-nav" aria-label="Primary">
        <NavLink to="/home" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <button className={`nav-item ${isActive ? 'is-active' : ''}`} data-nav="home">
              <svg className="icon icon-home" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 11.5L12 4.5L20 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 10V19C6 19.55 6.45 20 7 20H17C17.55 20 18 19.55 18 19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 20V15H14V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
              <span>Find a home</span>
            </button>
          )}
        </NavLink>

        <NavLink to="/list/step-1" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <button className={`nav-item ${isActive ? 'is-active' : ''}`} data-nav="list">
              <svg className="icon icon-plus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span>List property</span>
            </button>
          )}
        </NavLink>
        
        <NavLink to="/how-it-works" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <button className={`nav-item ${isActive ? 'is-active' : ''}`} data-nav="how">
              <svg className="icon icon-help" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M9.7 9.3C9.9 8.1 10.9 7.3 12.1 7.4C13.3 7.5 14.2 8.5 14 9.7C13.85 10.7 13 11.1 12.4 11.6C11.9 12 11.6 12.4 11.6 13.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11.7" cy="15.6" r="0.9" fill="currentColor"/>
              </svg>
              <span>How it works</span>
            </button>
          )}
        </NavLink>
      </nav>
    </footer>
  );
}
