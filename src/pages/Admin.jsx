import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingListings, reviewListing } from '../services/api';
import '../styles/admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [pendingListings, setPendingListings] = useState([]);
  const [approvedCount, setApprovedCount] = useState(12);
  const [rejectedCount, setRejectedCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Check if session passcode was already entered
  useEffect(() => {
    const isAuthed = sessionStorage.getItem('rd_admin_authed') === 'true';
    if (isAuthed) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getPendingListings();
    setPendingListings(data);
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'password123') {
      sessionStorage.setItem('rd_admin_authed', 'true');
      setIsAuthenticated(true);
      setPasscodeError(false);
      fetchData();
    } else {
      setPasscodeError(true);
    }
  };

  const handleChecklistToggle = (listingId, key) => {
    setPendingListings(prev =>
      prev.map(item => {
        if (item.id === listingId) {
          const currentChecklist = item.checklist || { phone: true, address: true, photos: true };
          return {
            ...item,
            checklist: {
              ...currentChecklist,
              [key]: !currentChecklist[key]
            }
          };
        }
        return item;
      })
    );
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleApprove = async (listing) => {
    await reviewListing(listing.id, {
      decision: 'approved',
      reviewerName: 'Admin Team',
      checklistPassed: listing.checklist || { phone: true, address: true, photos: true },
      notes: 'Verified by Admin'
    });

    setApprovedCount(prev => prev + 1);
    showToast('Property verified and published to home page');
    fetchData();
  };

  const handleReject = async (listing) => {
    await reviewListing(listing.id, {
      decision: 'rejected',
      reviewerName: 'Admin Team',
      checklistPassed: {},
      notes: 'Listing rejected during review'
    });

    setRejectedCount(prev => prev + 1);
    showToast('Listing rejected');
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-modal-overlay">
        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-header">
            <div className="auth-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="admin-title" style={{ fontSize: '24px' }}>Admin Verification Portal</h2>
            <p className="admin-subtitle">Enter admin passcode to manage property submissions.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="password"
              placeholder="Enter Passcode"
              className="field-input"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              style={{
                borderColor: passcodeError ? 'var(--error)' : 'var(--line)',
                background: passcodeError ? '#FDF3F1' : 'var(--surface)'
              }}
              autoFocus
            />
            {passcodeError && (
              <span style={{ color: 'var(--error)', fontSize: '13.5px', fontWeight: 600 }}>
                Incorrect passcode. Hint: password123
              </span>
            )}
          </div>

          <button type="submit" className="btn-primary" style={{ height: '50px' }}>
            Unlock Admin Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Toast Notification */}
      {toast && (
        <div className="toast-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="admin-header">
        <div className="admin-title-row">
          <div>
            <h1 className="admin-title">Verification Dashboard</h1>
            <p className="admin-subtitle">Review submitted property listings before publishing live to Home page.</p>
          </div>
          <button
            className="btn-accent"
            onClick={() => navigate('/home')}
            style={{ fontSize: '14px', padding: '10px 18px' }}
          >
            View Live Home Page →
          </button>
        </div>
      </header>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card pending">
          <span className="metric-label">Pending Verification</span>
          <span className="metric-value">{pendingListings.length}</span>
        </div>
        <div className="metric-card approved">
          <span className="metric-label">Approved & Published</span>
          <span className="metric-value">{approvedCount}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Rejected Listings</span>
          <span className="metric-value">{rejectedCount}</span>
        </div>
      </div>

      {/* Queue Section */}
      <section className="queue-section">
        <h2 className="section-heading">
          Pending Submissions ({pendingListings.length})
        </h2>

        {loading ? (
          <p className="admin-subtitle">Loading pending property queue…</p>
        ) : pendingListings.length === 0 ? (
          <div className="admin-card" style={{ padding: '36px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '20px' }}>No Pending Submissions</h3>
            <p className="admin-subtitle">All property submissions have been reviewed and processed!</p>
            <div style={{ marginTop: '16px' }}>
              <button
                className="btn-primary"
                onClick={() => navigate('/list/step-1')}
                style={{ height: '44px', width: 'auto', padding: '0 24px' }}
              >
                Submit a new test property
              </button>
            </div>
          </div>
        ) : (
          <div className="pending-grid">
            {pendingListings.map((item) => {
              const checklist = item.checklist || { phone: true, address: true, photos: true };
              return (
                <div key={item.id} className="admin-card">
                  <div className="admin-card-header">
                    <div>
                      <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '19px', color: 'var(--ink)' }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: '4px 0 0', color: 'var(--ink-soft)', fontSize: '14.5px', fontWeight: 600 }}>
                        {item.price} &middot; {item.location}
                      </p>
                    </div>
                    <span className="status-badge status-pending">PENDING</span>
                  </div>

                  {/* Landlord Contact Info */}
                  <div className="landlord-info">
                    <span className="landlord-title">Landlord Details</span>
                    <div className="landlord-detail">
                      <span>👤 {item.landlordName || 'Host'}</span>
                    </div>
                    <div className="landlord-detail">
                      <span>📞 {item.contactValue || item.phone || '+234 803 000 1122'} ({item.contactMethod || 'phone'})</span>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--ink-soft)' }}>
                    {item.about || item.description || 'Property details submitted for verification review.'}
                  </p>

                  {/* Checklist */}
                  <div className="checklist-box">
                    <span className="checklist-title">Verification Checklist</span>
                    <label className="checklist-item">
                      <input
                        type="checkbox"
                        checked={checklist.phone !== false}
                        onChange={() => handleChecklistToggle(item.id, 'phone')}
                      />
                      <span>Landlord phone number verified</span>
                    </label>
                    <label className="checklist-item">
                      <input
                        type="checkbox"
                        checked={checklist.address !== false}
                        onChange={() => handleChecklistToggle(item.id, 'address')}
                      />
                      <span>Property location & address checked</span>
                    </label>
                    <label className="checklist-item">
                      <input
                        type="checkbox"
                        checked={checklist.photos !== false}
                        onChange={() => handleChecklistToggle(item.id, 'photos')}
                      />
                      <span>Room photos authentic ({item.photoCount || (item.photos ? item.photos.length : 3)} photos)</span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="admin-actions">
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(item)}
                    >
                      ✓ Approve & Publish to Home
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(item)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
