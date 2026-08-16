import { ALL_LISTINGS, getListingById } from '../data/listings';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vertex-circle.onrender.com/api';

const PENDING_STORAGE_KEY = 'rd_pending_listings';
const APPROVED_STORAGE_KEY = 'rd_approved_listings';

function getLocalPendingListings() {
  try {
    const raw = localStorage.getItem(PENDING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalPendingListings(listings) {
  try {
    localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error('Failed to save local pending listings:', e);
  }
}

function getLocalApprovedListings() {
  try {
    const raw = localStorage.getItem(APPROVED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalApprovedListings(listings) {
  try {
    localStorage.setItem(APPROVED_STORAGE_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error('Failed to save local approved listings:', e);
  }
}

/**
 * Fetch verified published listings from Hono backend API with fallback to local storage & dataset
 */
export async function getListings(searchQuery = '') {
  let backendListings = [];
  try {
    const url = searchQuery 
      ? `${API_BASE_URL}/listings?area=${encodeURIComponent(searchQuery)}`
      : `${API_BASE_URL}/listings`;
    
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        backendListings = data;
      } else if (data.data && Array.isArray(data.data)) {
        backendListings = data.data;
      } else if (data.listings && Array.isArray(data.listings)) {
        backendListings = data.listings;
      }
    }
  } catch (error) {
    console.warn('Backend API unavailable, using fallback listings:', error.message);
  }

  // Combine backend listings, local approved custom listings, and ALL_LISTINGS
  const localApproved = getLocalApprovedListings();
  const combined = [...backendListings, ...localApproved, ...ALL_LISTINGS];

  // Deduplicate by ID
  const uniqueListingsMap = new Map();
  combined.forEach(item => {
    if (item && item.id && !uniqueListingsMap.has(String(item.id))) {
      uniqueListingsMap.set(String(item.id), {
        id: String(item.id),
        title: item.title || item.description?.substring(0, 40) || 'Apartment in Lagos',
        price: item.price ? (typeof item.price === 'number' ? `₦${item.price.toLocaleString()}` : item.price) : '₦500,000',
        location: item.location || (item.locationArea ? `${item.locationArea}, ${item.locationCity}` : 'Yaba, Lagos'),
        verified: item.verified !== undefined ? item.verified : true,
        photoCount: item.photoCount || (item.photoUrls ? item.photoUrls.length : (item.photos ? item.photos.length : 4)),
        image: item.image || (item.photoUrls && item.photoUrls[0]) || (item.photos && item.photos[0]?.url) || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        amenities: item.amenities || ['Self contained', '24/7 Water', 'Fenced yard'],
        about: item.about || item.description || 'Verified property available directly from landlord.',
        landlordName: item.landlordName || 'Property Host',
        contactValue: item.contactValue || item.phone || '+234 803 123 4567',
        contactMethod: item.contactMethod || 'phone'
      });
    }
  });

  const listArray = Array.from(uniqueListingsMap.values());

  if (!searchQuery) return listArray;

  const queryLower = searchQuery.toLowerCase();
  return listArray.filter(item => 
    item.location.toLowerCase().includes(queryLower) ||
    item.title.toLowerCase().includes(queryLower)
  );
}

/**
 * Fetch pending listings awaiting admin review
 */
export async function getPendingListings() {
  let remotePending = [];
  try {
    const response = await fetch(`${API_BASE_URL}/listings?status=pending`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) remotePending = data;
      else if (data.data && Array.isArray(data.data)) remotePending = data.data;
    }
  } catch (error) {
    console.warn('Could not fetch remote pending listings:', error.message);
  }

  const localPending = getLocalPendingListings();
  const combined = [...localPending, ...remotePending];

  const map = new Map();
  combined.forEach(item => {
    if (item && item.id && !map.has(String(item.id))) {
      map.set(String(item.id), item);
    }
  });

  return Array.from(map.values());
}

/**
 * Review/verify a listing (Admin approval or rejection)
 */
export async function reviewListing(id, reviewData) {
  let backendSuccess = false;
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (response.ok) {
      backendSuccess = true;
    }
  } catch (e) {
    console.warn('Backend review API call failed, using local update:', e.message);
  }

  // Update local storage queues
  const pending = getLocalPendingListings();
  const targetListing = pending.find(item => String(item.id) === String(id));
  const remainingPending = pending.filter(item => String(item.id) !== String(id));
  saveLocalPendingListings(remainingPending);

  if (reviewData.decision === 'approved' && targetListing) {
    const approvedListing = {
      ...targetListing,
      status: 'verified',
      verified: true
    };
    const currentApproved = getLocalApprovedListings();
    saveLocalApprovedListings([approvedListing, ...currentApproved]);
  }

  return { success: true, backendSynced: backendSuccess };
}

/**
 * Fetch a single listing by ID from backend or fallback
 */
export async function getListingDetails(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);
    if (response.ok) {
      const data = await response.json();
      if (data && (data.id || data.listing)) {
        return data.listing || data;
      }
    }
  } catch (error) {
    console.warn(`Backend API unavailable for listing ${id}:`, error.message);
  }

  // Check local approved listings first
  const localApproved = getLocalApprovedListings();
  const foundLocal = localApproved.find(item => String(item.id) === String(id));
  if (foundLocal) return foundLocal;

  return getListingById(id);
}

/**
 * Create a new property listing via backend API & save to pending queue
 */
export async function submitNewListing(listingData) {
  const newListingId = 'lst_' + Date.now();
  const newListingObj = {
    id: newListingId,
    title: listingData.title || listingData.propertyType || 'New Property Submission',
    price: listingData.price ? (typeof listingData.price === 'number' ? `₦${listingData.price.toLocaleString()}` : listingData.price) : '₦650,000',
    priceVal: typeof listingData.price === 'number' ? listingData.price : parseInt(String(listingData.price || '').replace(/\D/g, '')) || 650000,
    location: listingData.location || `${listingData.area || 'Yaba'}, Lagos`,
    locationCity: listingData.city || 'Lagos',
    locationArea: listingData.area || 'Yaba',
    landlordName: listingData.landlordName || 'Property Host',
    contactMethod: listingData.contactMethod || 'phone',
    contactValue: listingData.phone || listingData.contactValue || '+234 803 000 1122',
    about: listingData.about || listingData.description || 'Verified 1-bedroom flat close to commercial hub.',
    amenities: listingData.amenities || ['Self-contained', 'Constant water', 'Tiled floors'],
    photoCount: listingData.photos ? listingData.photos.length : 3,
    photos: listingData.photos || [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', label: 'Living room' },
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', label: 'Bedroom' }
    ],
    verified: false,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // Add to local pending listings for immediate Admin verification
  const currentPending = getLocalPendingListings();
  saveLocalPendingListings([newListingObj, ...currentPending]);

  try {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        landlordName: newListingObj.landlordName,
        contactMethod: newListingObj.contactMethod,
        contactValue: newListingObj.contactValue,
        price: newListingObj.priceVal,
        locationCity: 'Lagos',
        locationArea: newListingObj.locationArea,
        description: newListingObj.about,
        photoUrls: newListingObj.photos.map(p => p.url)
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, id: data.id || newListingId, message: 'Property submitted for review' };
    }
  } catch (error) {
    console.warn('Backend POST failed, saved to local pending queue:', error.message);
  }

  return {
    success: true,
    id: newListingId,
    message: 'Property submitted for review',
  };
}
