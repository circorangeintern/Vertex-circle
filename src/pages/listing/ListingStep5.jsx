import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/listStep.css';

export default function ListingStep5() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/success');
  };

  return (
    <>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '100%' }}></div>
      </div>

      <section className="section-intro">
        <h1 className="section-title">Review listing</h1>
        <p className="section-desc">
          Double check your details before submitting for verification.
        </p>
      </section>

      <div className="listing-form">
        {/* Card 1: Title & Contact */}
        <div className="summary__card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)' }}>STEP 1</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/list/step-1')}
            >
              Edit
            </button>
          </div>
          <p style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700 }}>Self-contained room in Yaba</p>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--ink-soft)' }}>Phone: 0803 123 4567</p>
        </div>

        {/* Card 2: Photos */}
        <div className="summary__card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)' }}>STEP 2</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/list/step-2')}
            >
              Edit
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>3 property photos attached</p>
        </div>

        {/* Card 3: Rent */}
        <div className="summary__card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)' }}>STEP 3</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/list/step-3')}
            >
              Edit
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>₦450,000 / year</p>
        </div>

        {/* Card 4: Location */}
        <div className="summary__card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)' }}>STEP 4</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/list/step-4')}
            >
              Edit
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Behind First Bank, Yaba, Lagos</p>
        </div>

        {/* Unified Continue / Submit Bar */}
        <div className="continue-bar">
          <button
            type="button"
            className="btn-primary btn-accent-submit"
            id="submitBtn"
            onClick={handleSubmit}
          >
            <span className="btn-label">Submit for review</span>
          </button>
        </div>
      </div>
    </>
  );
}
