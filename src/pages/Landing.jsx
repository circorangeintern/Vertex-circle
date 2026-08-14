import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/welcome.css';

export default function Landing() {
  const navigate = useNavigate();

  const handleRipple = (e, path) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
      if (path) navigate(path);
    }, 300);
  };

  return (
    <div className="app">
      <main className="page">
        <header className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M10 21.5L24 10L38 21.5V38C38 39.1 37.1 40 36 40H12C10.9 40 10 39.1 10 38V21.5Z" fill="none"
                stroke="white" strokeWidth="3" strokeLinejoin="round" />
              <path d="M19 40V27H29V40" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round" />
            </svg>
          </div>
          <h1>RentDirect</h1>
        </header>

        <section className="hero">
          <h2>
            Find your next home.<br />
            <span className="highlight">No agent fee.</span> No extra<br className="desktop-break" /> fee.
          </h2>
          <p className="hero-description">
            Talk to the landlord yourself. Every Verified home is checked by our team first.
          </p>
        </section>

        <section className="notice">
          <div className="notice-icon">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M24 5L38 10V22C38 31.5 32.1 39.3 24 43C15.9 39.3 10 31.5 10 22V10L24 5Z" fill="none"
                stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
              <path d="M17 23.5L21.5 28L31 18.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </div>
          <p>
            Agents charge up to one extra month of rent. Here, you pay the landlord only.
          </p>
        </section>

        <section className="actions">
          <h3>What do you want to do?</h3>

          <button 
            id="findHomeBtn"
            className="button button-primary"
            onClick={(e) => handleRipple(e, '/home')}
          >
            Find a home
          </button>

          <button 
            id="listPropertyBtn"
            className="button button-primary"
            style={{ background: '#FFFFFF', color: '#25221f', border: '3px solid #d3cbbd' }}
            onClick={(e) => handleRipple(e, '/list/step-1')}
          >
            List your property
          </button>

          <button 
            id="howItWorksBtn"
            className="button button-primary"
            style={{ background: 'transparent', color: '#2d6a4f', border: 'none' }}
            onClick={(e) => handleRipple(e, '/how-it-works')}
          >
            How it works
          </button>
        </section>
      </main>
    </div>
  );
}
