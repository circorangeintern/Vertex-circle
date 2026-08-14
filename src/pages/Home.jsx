import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getListings } from '../services/api';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChips, setSelectedChips] = useState(['verified']);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const data = await getListings(searchTerm);
      if (isMounted) {
        setListings(data);
        setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [searchTerm]);

  const toggleChip = (chipKey) => {
    setSelectedChips(prev => 
      prev.includes(chipKey) 
        ? prev.filter(c => c !== chipKey) 
        : [...prev, chipKey]
    );
  };

  const filteredListings = listings.filter(item => {
    const priceVal = item.priceVal || parseInt(String(item.price || '').replace(/\D/g, '')) || 0;
    if (selectedChips.includes('price') && priceVal > 500000) {
      return false;
    }
    if (selectedChips.includes('type') && !String(item.title || '').toLowerCase().includes('self')) {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          <span className="hero-line">Find your next home.</span>
          <span className="hero-line hero-accent">No agent fee.</span>
        </h1>
        <p className="hero-sub">Contact verified landlords directly. What you see is what you pay.</p>
      </section>

      {/* Search */}
      <section className="search-row">
        <Link 
          to="/search-listing" 
          style={{ textDecoration: 'none', color: '#2D6A4F', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}
        >
          View All ({listings.length}) →
        </Link>

        <label className="search-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="6.5" stroke="#8A8175" strokeWidth="1.8"/>
            <path d="M20 20L15.8 15.8" stroke="#8A8175" strokeWidth="1.8"/>
          </svg>
          <input 
            id="areaSearch" 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search area, e.g. Yaba" 
            className="search-input"
            autoComplete="off" 
          />
        </label>

        <button 
          id="filterBtn" 
          aria-label="Open filters" 
          className="btn-filter"
          onClick={() => navigate('/search')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20M4 12H20M4 17H20" stroke="#FFF" strokeWidth="1.8"/>
            <circle cx="9" cy="7" r="1.8" fill="#2D6A4F" stroke="#FFF"/>
            <circle cx="16" cy="12" r="1.8" fill="#2D6A4F" stroke="#FFF"/>
            <circle cx="10" cy="17" r="1.8" fill="#2D6A4F" stroke="#FFF"/>
          </svg>
        </button>
      </section>

      {/* Chips */}
      <section className="chip-row" id="chipRow">
        <button 
          className={`chip ${selectedChips.includes('verified') ? 'chip-selected' : ''}`}
          onClick={() => toggleChip('verified')}
        >
          Verified only
        </button>
        <button 
          className={`chip ${selectedChips.includes('price') ? 'chip-selected' : ''}`}
          onClick={() => toggleChip('price')}
        >
          Under ₦500k
        </button>
        <button 
          className={`chip ${selectedChips.includes('type') ? 'chip-selected' : ''}`}
          onClick={() => toggleChip('type')}
        >
          Self-contained
        </button>
      </section>

      <p className="results-count" id="resultsCount">
        {loading ? 'Loading homes…' : `${filteredListings.length} homes in Lagos`}
      </p>

      {/* Listings Grid */}
      <section className="listing-grid" id="listingGrid">
        {filteredListings.map(item => (
          <article 
            key={item.id}
            className="listing-card" 
            tabIndex={0}
            onClick={() => navigate(`/listing/${item.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/listing/${item.id}`);
              }
            }}
          >
            <div className="listing-media">
              {item.verified && (
                <span className="badge badge-verified">
                  <svg className="icon icon-shield" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3.5L18.5 5.8V11C18.5 15.3 15.8 18.3 12 20.2C8.2 18.3 5.5 15.3 5.5 11V5.8L12 3.5Z" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round"/>
                    <path d="M9.3 11.2L11.1 13L14.7 9.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>VERIFIED</span>
                </span>
              )}

              <img 
                src={item.image || (item.photos && item.photos[0]?.url) || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />

              <span className="badge badge-photos">{item.photoCount || (item.photos ? item.photos.length : 5)} photos</span>
            </div>

            <div className="listing-body">
              <p className="listing-price">{item.price}</p>
              <p className="listing-type">{item.title}</p>
              <p className="listing-meta">
                <svg className="icon icon-pin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C12 21 18 15.6 18 10.5C18 6.9 15.3 4 12 4C8.7 4 6 6.9 6 10.5C6 15.6 12 21 12 21Z" stroke="#8A8175" strokeWidth="1.6" strokeLinejoin="round"/>
                  <circle cx="12" cy="10.3" r="2.1" stroke="#8A8175" strokeWidth="1.6"/>
                </svg>
                <span>{item.location} &middot; {item.listedTime || 'Recently listed'}</span>
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
