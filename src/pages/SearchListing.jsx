import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_LISTINGS } from '../data/listings';
import '../styles/SearchListing.css';

export default function SearchListing() {
  const navigate = useNavigate();
  const listing = ALL_LISTINGS[0]; // Default Self-contained Yaba

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const photos = listing.photos || [];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Media / photo carousel */}
      <section
        className="media"
        id="mediaCarousel"
        style={{ cursor: 'pointer', position: 'relative' }}
        onClick={() => setIsGalleryOpen(true)}
      >
        <img 
          src={photos[activePhotoIdx]?.url || photos[0].url} 
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
              aria-label="Previous photo"
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
              aria-label="Next photo"
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

        <span className="badge badge-verified">
          <svg className="icon icon-shield" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3.5L18.5 5.8V11C18.5 15.3 15.8 18.3 12 20.2C8.2 18.3 5.5 15.3 5.5 11V5.8L12 3.5Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M9.3 11.2L11.1 13L14.7 9.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>VERIFIED</span>
        </span>

        <div className="media-dots" id="mediaDots" role="tablist" aria-label="Photo pagination">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`dot ${activePhotoIdx === i ? 'is-active' : ''}`}
              role="tab"
              aria-selected={activePhotoIdx === i}
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx(i);
              }}
            />
          ))}
        </div>
      </section>

      {/* Listing details */}
      <section className="details">
        <p className="price">{listing.price}</p>
        <p className="type">{listing.title}</p>
        <p className="location">
          <svg className="icon icon-pin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C12 21 18 15.6 18 10.5C18 6.9 15.3 4 12 4C8.7 4 6 6.9 6 10.5C6 15.6 12 21 12 21Z" stroke="#8A8175" strokeWidth="1.6" strokeLinejoin="round"/>
            <circle cx="12" cy="10.3" r="2.1" stroke="#8A8175" strokeWidth="1.6"/>
          </svg>
          <span>{listing.location}</span>
        </p>

        {/* Amenity chips */}
        <div className="chip-row">
          {listing.amenities.map((item, idx) => (
            <span key={idx} className="chip">{item}</span>
          ))}
        </div>

        {/* About this home */}
        <div className="about-block">
          <h2 className="about-title">About this home</h2>
          <p className="about-desc">{listing.about}</p>
        </div>

        {/* Verified note */}
        <div className="verified-note">
          <span className="verified-note-icon" aria-hidden="true">
            <svg className="icon icon-check-shield" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3.5L18.5 5.8V11C18.5 15.3 15.8 18.3 12 20.2C8.2 18.3 5.5 15.3 5.5 11V5.8L12 3.5Z" stroke="#2D6A4F" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M9.3 11.2L11.1 13L14.7 9.2" stroke="#2D6A4F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <p className="verified-note-text">
            Verified — our team checked this listing on 12 July 2026.
            Still, visit the property before you pay anything.
          </p>
        </div>

        <button 
          className="btn-primary" 
          id="showContactBtn"
          onClick={() => navigate('/contact-reveal')}
          style={{ marginTop: '16px' }}
        >
          <span className="btn-label">Show Landlord's contact</span>
        </button>
      </section>

      {/* Full-Screen Photo Gallery Modal */}
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
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
