import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getListingDetails, updateListing } from '../services/api';
import '../styles/ListDetail.css';
import '../styles/admin.css';

export default function ListDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editAbout, setEditAbout] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await getListingDetails(id || '1');
      setListing(data);
    }
    loadData();
  }, [id]);

  if (!listing) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p style={{ color: 'var(--ink-soft)' }}>Loading property details…</p>
      </div>
    );
  }

  const photos = listing.photos || [
    { url: listing.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', label: 'Property View' }
  ];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleOpenEdit = () => {
    setEditTitle(listing.title || '');
    setEditPrice(listing.price || '');
    setEditLocation(listing.location || '');
    setEditAbout(listing.about || listing.description || '');
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedFields = {
      title: editTitle,
      price: editPrice,
      location: editLocation,
      about: editAbout,
      description: editAbout
    };

    // 1. Immediate optimistic UI state update
    setListing(prev => ({
      ...prev,
      ...updatedFields
    }));

    // 2. Persist to API service & local storage
    updateListing(listing.id, updatedFields);

    setToast('Property details updated optimistically!');
    setTimeout(() => setToast(null), 3500);
    setIsEditing(false);
  };

  return (
    <>
      {toast && (
        <div className="toast-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{toast}</span>
        </div>
      )}

      {/* Hero Carousel Section */}
      <div className="hero-section" style={{ padding: 0, position: 'relative', cursor: 'pointer' }} onClick={() => setIsGalleryOpen(true)}>
        <img
          src={photos[activePhotoIdx]?.url || photos[0]?.url}
          alt={photos[activePhotoIdx]?.label || listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Previous & Next Arrow Overlay */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow arrow-left"
              onClick={handlePrevPhoto}
              aria-label="Previous room photo"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(38, 34, 28, 0.65)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 5,
              }}
            >
              ❮
            </button>

            <button
              type="button"
              className="carousel-arrow arrow-right"
              onClick={handleNextPhoto}
              aria-label="Next room photo"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(38, 34, 28, 0.65)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 5,
              }}
            >
              ❯
            </button>
          </>
        )}

        <div className="hero-overlay-bottom">
          {listing.verified && (
            <div className="verified-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>VERIFIED</span>
            </div>
          )}

          <div className="pagination-dots">
            {photos.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${activePhotoIdx === idx ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx(idx);
                }}
              />
            ))}
          </div>

          <button
            type="button"
            style={{
              background: 'rgba(38, 34, 28, 0.75)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(true);
            }}
          >
            View all {photos.length} photos
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="detail-container">
        <div className="detail-main">
          <section className="price-section">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <h1 className="price-heading">
                {String(listing.price).split(' ')[0]} <span className="price-period">/ year</span>
              </h1>
              <button type="button" className="btn-edit-small" onClick={handleOpenEdit}>
                ✏️ Edit Property
              </button>
            </div>
            <h2 className="sub-heading">{listing.title}</h2>
            <div className="location-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z" stroke="#5C554A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#5C554A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="location-text">{listing.location}</span>
            </div>
          </section>

          {/* Amenity Chips */}
          {listing.amenities && (
            <section className="chips-section">
              {listing.amenities.map((item, i) => (
                <div key={i} className="chip">{item}</div>
              ))}
            </section>
          )}

          {/* About Section */}
          <section className="about-section">
            <h3 className="section-title">About this home</h3>
            <p className="about-text">{listing.about || listing.description}</p>

            <div className="info-card">
              <div className="info-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M12 3L19 6V11C19 15.55 15.84 19.74 12 21C8.16 19.74 5 15.55 5 11V6L12 3Z" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="info-card-text">
                Verified — our team checked this listing. Visit the property before you pay anything.
              </p>
            </div>
          </section>
        </div>

        <div className="detail-sidebar">
          <button
            className="primary-cta-btn"
            id="contactBtn"
            onClick={() => navigate('/contact-reveal')}
          >
            Show Landlord's contact
          </button>
        </div>
      </div>

      {/* Full-Screen "View All Room Photos" Gallery Modal */}
      {isGalleryOpen && (
        <div
          className="gallery-modal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(18, 16, 14, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '24px 20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '20px', fontFamily: 'var(--font-display)' }}>
              All Room Photos ({photos.length})
            </h2>
            <button
              type="button"
              onClick={() => setIsGalleryOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '28px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {photos.map((item, idx) => (
              <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', background: '#26221C' }}>
                <img src={item.url} alt={item.label} style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
                <p style={{ color: '#EAE6DC', padding: '10px 14px', margin: 0, fontSize: '14px', fontWeight: 600 }}>
                  {item.label || 'Room Photo'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Edit Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <form className="edit-modal-card" onClick={(e) => e.stopPropagation()} onSubmit={handleSaveEdit}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Property Details (Optimistic)</h2>
              <button type="button" className="modal-close" onClick={() => setIsEditing(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Property Title</label>
                <input
                  type="text"
                  className="modal-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description / About</label>
                <textarea
                  className="modal-textarea"
                  rows={3}
                  value={editAbout}
                  onChange={(e) => setEditAbout(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ padding: '0 24px', height: '44px' }}>
                Save Changes Optimistically
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

