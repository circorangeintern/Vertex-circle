import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/home.css';

const ALL_LISTINGS = [
  {
    id: '1',
    title: 'Self-contained apartment',
    price: '₦450,000 / year',
    priceVal: 450000,
    type: 'Self-contained',
    location: 'Yaba, Lagos',
    listedTime: 'Listed 2 days ago',
    verified: true,
    photoCount: 5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: '2 Bedroom Flat',
    price: '₦650,000 / year',
    priceVal: 650000,
    type: '2 Bedroom Flat',
    location: 'Surulere, Lagos',
    listedTime: 'Listed 1 day ago',
    verified: true,
    photoCount: 4,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Mini Flat Apartment',
    price: '₦400,000 / year',
    priceVal: 400000,
    type: 'Mini Flat',
    location: 'Ikeja, Lagos',
    listedTime: 'Listed 3 days ago',
    verified: true,
    photoCount: 6,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Single Room Self-con',
    price: '₦350,000 / year',
    priceVal: 350000,
    type: 'Self-contained',
    location: 'Maryland, Lagos',
    listedTime: 'Listed today',
    verified: true,
    photoCount: 3,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: '1 Bedroom Duplex',
    price: '₦1,200,000 / year',
    priceVal: 1200000,
    type: '1 Bedroom Duplex',
    location: 'Lekki Phase 1, Lagos',
    listedTime: 'Listed 4 days ago',
    verified: true,
    photoCount: 8,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Self-contained Room',
    price: '₦380,000 / year',
    priceVal: 380000,
    type: 'Self-contained',
    location: 'Akoka, Yaba, Lagos',
    listedTime: 'Listed 2 days ago',
    verified: true,
    photoCount: 5,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    title: '2 Bedroom Modern Flat',
    price: '₦700,000 / year',
    priceVal: 700000,
    type: '2 Bedroom Flat',
    location: 'Gbagada, Lagos',
    listedTime: 'Listed 5 days ago',
    verified: true,
    photoCount: 6,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    title: '3 Bedroom Luxury Flat',
    price: '₦2,500,000 / year',
    priceVal: 2500000,
    type: '3 Bedroom Flat',
    location: 'Victoria Island, Lagos',
    listedTime: 'Listed 1 week ago',
    verified: true,
    photoCount: 10,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '9',
    title: 'Cozy Mini Flat',
    price: '₦420,000 / year',
    priceVal: 420000,
    type: 'Mini Flat',
    location: 'Ebute Metta, Lagos',
    listedTime: 'Listed 3 days ago',
    verified: true,
    photoCount: 4,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '10',
    title: 'Studio Apartment',
    price: '₦480,000 / year',
    priceVal: 480000,
    type: 'Self-contained',
    location: 'Anthony Village, Lagos',
    listedTime: 'Listed 4 days ago',
    verified: true,
    photoCount: 5,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '11',
    title: '1 Bedroom Serviced Flat',
    price: '₦1,800,000 / year',
    priceVal: 1800000,
    type: '1 Bedroom Flat',
    location: 'Ikoyi, Lagos',
    listedTime: 'Listed 6 days ago',
    verified: true,
    photoCount: 7,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '12',
    title: 'Budget Studio Room',
    price: '₦320,000 / year',
    priceVal: 320000,
    type: 'Self-contained',
    location: 'Ojuelegba, Surulere',
    listedTime: 'Listed yesterday',
    verified: true,
    photoCount: 4,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '13',
    title: 'Gated 2 Bedroom Flat',
    price: '₦800,000 / year',
    priceVal: 800000,
    type: '2 Bedroom Flat',
    location: 'Ogudu, Lagos',
    listedTime: 'Listed 2 days ago',
    verified: true,
    photoCount: 6,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '14',
    title: 'Self-contained Flat',
    price: '₦490,000 / year',
    priceVal: 490000,
    type: 'Self-contained',
    location: 'Ilupeju, Lagos',
    listedTime: 'Listed today',
    verified: true,
    photoCount: 5,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChips, setSelectedChips] = useState(['verified']);

  const toggleChip = (chipKey) => {
    setSelectedChips(prev => 
      prev.includes(chipKey) 
        ? prev.filter(c => c !== chipKey) 
        : [...prev, chipKey]
    );
  };

  const filteredListings = ALL_LISTINGS.filter(item => {
    if (searchTerm && !item.location.toLowerCase().includes(searchTerm.toLowerCase()) && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedChips.includes('price') && item.priceVal > 500000) {
      return false;
    }
    if (selectedChips.includes('type') && !item.type.toLowerCase().includes('self')) {
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
          View All ({ALL_LISTINGS.length}) →
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
        {filteredListings.length} homes in Lagos
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
                src={item.image} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />

              <span className="badge badge-photos">{item.photoCount} photos</span>
            </div>

            <div className="listing-body">
              <p className="listing-price">{item.price}</p>
              <p className="listing-type">{item.title}</p>
              <p className="listing-meta">
                <svg className="icon icon-pin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C12 21 18 15.6 18 10.5C18 6.9 15.3 4 12 4C8.7 4 6 6.9 6 10.5C6 15.6 12 21 12 21Z" stroke="#8A8175" strokeWidth="1.6" strokeLinejoin="round"/>
                  <circle cx="12" cy="10.3" r="2.1" stroke="#8A8175" strokeWidth="1.6"/>
                </svg>
                <span>{item.location} &middot; {item.listedTime}</span>
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
