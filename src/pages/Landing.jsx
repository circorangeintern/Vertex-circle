import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BrandLogo from '../components/layout/BrandLogo';
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
      <main className="page welcome-page">
        <header className="landing-header">
          <BrandLogo size="lg" to="/home" />
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

          <div className="actions-buttons">
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
              style={{ background: '#FFFFFF', color: '#25221f', border: '2px solid #CFC7B8' }}
              onClick={(e) => handleRipple(e, '/list/step-1')}
            >
              List your property
            </button>

            <button 
              id="howItWorksBtn"
              className="button button-primary"
              style={{ background: 'transparent', color: '#2D6A4F', border: '2px solid #2D6A4F' }}
              onClick={(e) => handleRipple(e, '/how-it-works')}
            >
              How it works
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
