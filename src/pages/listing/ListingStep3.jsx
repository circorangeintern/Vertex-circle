import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/listStep.css';

const STORAGE_KEY = 'rentdirect.listing.step3';

export default function ListingStep3() {
  const navigate = useNavigate();
  const [rentAmount, setRentAmount] = useState('');
  const [formattedSummary, setFormattedSummary] = useState('₦0');

  const formatAmount = (numStr) => {
    if (!numStr) return '';
    const digits = numStr.replace(/\D/g, '');
    if (!digits) return '';
    return Number(digits).toLocaleString('en-US');
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRentAmount(saved);
        setFormattedSummary(`₦${formatAmount(saved)}`);
      }
    } catch (e) {
      console.warn('Could not restore step 3 rent data:', e);
    }
  }, []);

  const handleInput = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    setRentAmount(rawVal);
    setFormattedSummary(rawVal ? `₦${formatAmount(rawVal)}` : '₦0');

    try {
      localStorage.setItem(STORAGE_KEY, rawVal);
    } catch (err) {
      console.warn('Could not save step 3 rent data:', err);
    }
  };

  const handleQuickPick = (val) => {
    const rawVal = String(val);
    setRentAmount(rawVal);
    setFormattedSummary(`₦${formatAmount(rawVal)}`);

    try {
      localStorage.setItem(STORAGE_KEY, rawVal);
    } catch (err) {
      console.warn('Could not save step 3 rent data:', err);
    }
  };

  const handleContinue = () => {
    if (!rentAmount || Number(rentAmount) <= 0) return;
    navigate('/list/step-4');
  };

  return (
    <>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '60%' }}></div>
      </div>

      <section className="section-intro">
        <h1 className="section-title">Rent amount</h1>
        <p className="section-desc">
          Enter the annual rent amount. No hidden fees or agent commissions.
        </p>
      </section>

      <form className="listing-form" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
        <div className="field-group">
          <label className="field-label" htmlFor="rentInput">
            Yearly rent (₦)
          </label>
          <input
            id="rentInput"
            type="text"
            className="field-input"
            placeholder="e.g. 450,000"
            value={formatAmount(rentAmount)}
            onChange={handleInput}
            autoComplete="off"
          />
          <p className="field-hint">Enter numbers only.</p>
        </div>

        {/* Quick pick chips */}
        <div className="chip-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
          {[350000, 450000, 650000, 800000].map((val) => (
            <button
              key={val}
              type="button"
              className="chip"
              onClick={() => handleQuickPick(val)}
            >
              ₦{formatAmount(String(val))}
            </button>
          ))}
        </div>

        {/* Live summary card */}
        <div className="summary__card">
          <div className="summary__row">
            <span className="summary__label">Total Yearly Rent</span>
            <span className="summary__value">{formattedSummary}</span>
          </div>
        </div>

        {/* Unified Continue Bar */}
        <div className="continue-bar">
          <button
            type="button"
            className="btn-primary"
            id="continueBtn"
            disabled={!rentAmount || Number(rentAmount) <= 0}
            onClick={handleContinue}
          >
            <span className="btn-label">Continue to Step 4</span>
          </button>
        </div>
      </form>
    </>
  );
}
