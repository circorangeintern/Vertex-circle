import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/listStep.css';

export default function ListingStep4() {
  const navigate = useNavigate();
  const [locationText, setLocationText] = useState('');

  const handleQuickArea = (area) => {
    setLocationText(area);
  };

  const handleContinue = () => {
    if (!locationText.trim()) return;
    navigate('/list/step-5');
  };

  return (
    <>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '80%' }}></div>
      </div>

      <section className="section-intro">
        <h1 className="section-title">Property location</h1>
        <p className="section-desc">
          Specify the area or street address in Lagos. Accurate locations get visited faster.
        </p>
      </section>

      <form className="listing-form" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
        <div className="field-group">
          <label className="field-label" htmlFor="locationInput">
            Location / Area
          </label>
          <input
            id="locationInput"
            type="text"
            className="field-input"
            placeholder="e.g. Behind First Bank, Yaba, Lagos"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            autoComplete="off"
          />
          <p className="field-hint">e.g. Yaba, Surulere, Ikeja, Lekki Phase 1</p>
        </div>

        {/* Quick popular areas */}
        <div className="chip-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
          {['Yaba', 'Surulere', 'Ikeja', 'Maryland', 'Lekki Phase 1', 'Gbagada'].map((area) => (
            <button
              key={area}
              type="button"
              className="chip"
              onClick={() => handleQuickArea(area)}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Unified Continue Bar */}
        <div className="continue-bar">
          <button
            type="button"
            className="btn-primary"
            id="continueBtn"
            disabled={!locationText.trim()}
            onClick={handleContinue}
          >
            <span className="btn-label">Continue to Step 5</span>
          </button>
        </div>
      </form>
    </>
  );
}
