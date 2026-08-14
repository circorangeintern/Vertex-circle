import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/search.css';

export default function Search() {
  const navigate = useNavigate();

  const [area, setArea] = useState('yaba');
  const [price, setPrice] = useState('300-500');
  const [houseType, setHouseType] = useState('1bed-duplex');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClearAll = () => {
    setArea('');
    setPrice('');
    setHouseType('');
    setVerifiedOnly(false);
    setSearchQuery('');
  };

  return (
    <main className="sheet" id="filterSheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
      <div className="sheet-handle" aria-hidden="true"></div>

      <div className="sheet-scroll">
        <div className="sheet-header">
          <h1 className="sheet-title" id="sheetTitle">Filter homes</h1>
          <button className="close-btn" id="closeBtn" aria-label="Close filters" onClick={() => navigate(-1)}>
            <svg className="icon icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="#26221C" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 6L6 18" stroke="#26221C" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Where */}
        <section className="filter-group">
          <h2 className="filter-label">Where?</h2>
          <label className="search-field" htmlFor="areaSearch">
            <svg className="icon icon-search" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="6.5" stroke="#8A8175" strokeWidth="1.8"/>
              <path d="M20 20L15.8 15.8" stroke="#8A8175" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              id="areaSearch"
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Or Search any area, e.g. Maitama"
              autoComplete="off"
            />
          </label>

          <div className="chip-row chip-row-wrap" data-group="area">
            {['yaba', 'maitama', 'lekki', 'ikeja', 'jos', 'uyo'].map((loc) => (
              <button 
                key={loc}
                className={`chip ${area === loc ? 'chip-selected' : ''}`}
                onClick={() => setArea(loc)}
              >
                {loc.charAt(0).toUpperCase() + loc.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* How much */}
        <section className="filter-group">
          <h2 className="filter-label">How much per year?</h2>
          <div className="chip-row chip-row-wrap" data-group="price">
            {[
              { id: 'u300', label: 'Under ₦300k' },
              { id: '300-500', label: '₦300k – ₦500k' },
              { id: '500-1m', label: '₦500k – ₦1m' },
              { id: 'above1m', label: 'Above ₦1m' },
              { id: 'u200', label: 'Under ₦200k' },
            ].map((p) => (
              <button 
                key={p.id}
                className={`chip ${price === p.id ? 'chip-selected' : ''}`}
                onClick={() => setPrice(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Type */}
        <section className="filter-group">
          <h2 className="filter-label">What type of house are you looking for?</h2>
          <div className="chip-row chip-row-wrap" data-group="type">
            {[
              { id: 'self-con', label: 'Self–con' },
              { id: '1bed-duplex', label: '1 bedroom duplex' },
              { id: 'mini-flat', label: 'Mini–flat' },
              { id: 'above1m-type', label: 'Above ₦1m' },
              { id: '3bed-flat', label: '3 bedroom flat' },
            ].map((t) => (
              <button 
                key={t.id}
                className={`chip ${houseType === t.id ? 'chip-selected' : ''}`}
                onClick={() => setHouseType(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* Verified toggle */}
        <section className="toggle-card">
          <span className="toggle-icon" aria-hidden="true">
            <svg className="icon icon-shield" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3.5L18.5 5.8V11C18.5 15.3 15.8 18.3 12 20.2C8.2 18.3 5.5 15.3 5.5 11V5.8L12 3.5Z" stroke="#2D6A4F" strokeWidth="1.7" strokeLinejoin="round"/>
              <path d="M9.3 11.2L11.1 13L14.7 9.2" stroke="#2D6A4F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <span className="toggle-copy">
            <span className="toggle-title">Verified homes only</span>
            <span className="toggle-sub">Checked by our team</span>
          </span>

          <button
            className={`switch ${verifiedOnly ? 'is-on' : ''}`}
            id="verifiedSwitch"
            role="switch"
            aria-checked={verifiedOnly}
            aria-label="Verified homes only"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
          >
            <span className="switch-knob"></span>
          </button>
        </section>
      </div>

      <div className="sheet-actions">
        <button className="btn-clear" id="clearBtn" onClick={handleClearAll}>Clear all</button>
        <button className="btn-primary" id="showResultsBtn" onClick={() => navigate('/search-listing')}>
          <span className="btn-label">Show <span id="resultCount">14</span> homes</span>
        </button>
      </div>
    </main>
  );
}
