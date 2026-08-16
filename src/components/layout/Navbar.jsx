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

        <NavLink to="/admin" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <button className={`nav-item ${isActive ? 'is-active' : ''}`} data-nav="admin">
              <svg className="icon icon-admin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
              </svg>
              <span>Admin</span>
            </button>
          )}
        </NavLink>
      </nav>
    </footer>
  );
}
