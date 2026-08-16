import { ALL_LISTINGS, getListingById } from '../data/listings';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vertex-circle.onrender.com/api';

const PENDING_STORAGE_KEY = 'rd_pending_listings';
const APPROVED_STORAGE_KEY = 'rd_approved_listings';
const EDITED_STORAGE_KEY = 'rd_edited_listings';

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

function getLocalEditedListings() {
  try {
    const raw = localStorage.getItem(EDITED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveLocalEditedListings(editedMap) {
  try {
    localStorage.setItem(EDITED_STORAGE_KEY, JSON.stringify(editedMap));
  } catch (e) {
    console.error('Failed to save local edited listings:', e);
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
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

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
    console.warn('Backend API fetch timed out or unavailable, using instant fallback listings:', error.message);
  }


  const localApproved = getLocalApprovedListings();
  const editedMap = getLocalEditedListings();

  // Combine backend listings, local approved custom listings, and ALL_LISTINGS
  const combined = [...backendListings, ...localApproved, ...ALL_LISTINGS];

  // Deduplicate by ID & apply optimistic edits
  const uniqueListingsMap = new Map();
  combined.forEach(item => {
    if (item && item.id && !uniqueListingsMap.has(String(item.id))) {
      const idStr = String(item.id);
      const edits = editedMap[idStr] || {};

      uniqueListingsMap.set(idStr, {
        id: idStr,
        title: edits.title || item.title || item.description?.substring(0, 40) || 'Apartment in Lagos',
        price: edits.price || (item.price ? (typeof item.price === 'number' ? `₦${item.price.toLocaleString()}` : item.price) : '₦500,000'),
        location: edits.location || item.location || (item.locationArea ? `${item.locationArea}, ${item.locationCity}` : 'Yaba, Lagos'),
        verified: edits.verified !== undefined ? edits.verified : (item.verified !== undefined ? item.verified : true),
        photoCount: item.photoCount || (item.photoUrls ? item.photoUrls.length : (item.photos ? item.photos.length : 4)),
        image: item.image || (item.photoUrls && item.photoUrls[0]) || (item.photos && item.photos[0]?.url) || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        photos: item.photos || [
          { url: item.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', label: 'Living room' }
        ],
        amenities: edits.amenities || item.amenities || ['Self contained', '24/7 Water', 'Fenced yard'],
        about: edits.about || edits.description || item.about || item.description || 'Verified property available directly from landlord.',
        landlordName: edits.landlordName || item.landlordName || item.landlord?.name || 'Property Host',
        contactValue: edits.contactValue || edits.phone || item.contactValue || item.phone || item.landlord?.phone || '+234 803 123 4567',
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
  const editedMap = getLocalEditedListings();
  const combined = [...localPending, ...remotePending];

  const map = new Map();
  combined.forEach(item => {
    if (item && item.id && !map.has(String(item.id))) {
      const idStr = String(item.id);
      const edits = editedMap[idStr] || {};
      map.set(idStr, {
        ...item,
        ...edits
      });
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

  // Update local storage queues optimistically
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
 * Optimistically update a listing (Title, price, location, description, landlord contact, etc.)
 */
export async function updateListing(id, updatedFields) {
  const idStr = String(id);
  const editedMap = getLocalEditedListings();
  const updatedObj = { ...(editedMap[idStr] || {}), ...updatedFields };
  editedMap[idStr] = updatedObj;
  
  // 1. Optimistic local update
  saveLocalEditedListings(editedMap);

  // Also update in local approved or pending queue if present
  const approved = getLocalApprovedListings();
  const approvedIdx = approved.findIndex(item => String(item.id) === idStr);
  if (approvedIdx !== -1) {
    approved[approvedIdx] = { ...approved[approvedIdx], ...updatedFields };
    saveLocalApprovedListings(approved);
  }

  const pending = getLocalPendingListings();
  const pendingIdx = pending.findIndex(item => String(item.id) === idStr);
  if (pendingIdx !== -1) {
    pending[pendingIdx] = { ...pending[pendingIdx], ...updatedFields };
    saveLocalPendingListings(pending);
  }

  // 2. Dispatch background API call to server
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${idStr}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    });
    if (response.ok) {
      return { success: true, updated: updatedObj, backendSynced: true };
    }
  } catch (error) {
    console.warn(`Backend update call for ${idStr} failed/offline, using optimistic local state:`, error.message);
  }

  return { success: true, updated: updatedObj, backendSynced: false };
}

/**
 * Fetch a single listing by ID from backend or fallback
 */
export async function getListingDetails(id) {
  const idStr = String(id);
  const editedMap = getLocalEditedListings();
  const edits = editedMap[idStr] || {};

  let baseListing = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(`${API_BASE_URL}/listings/${idStr}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && (data.id || data.listing)) {
        baseListing = data.listing || data;
      }
    }
  } catch (error) {
    console.warn(`Backend API unavailable or timed out for listing ${idStr}:`, error.message);
  }


  if (!baseListing) {
    const localApproved = getLocalApprovedListings();
    baseListing = localApproved.find(item => String(item.id) === idStr) || getListingById(idStr);
  }

  return {
    ...baseListing,
    ...edits,
    id: idStr,
    title: edits.title || baseListing.title || 'Apartment in Lagos',
    price: edits.price || (typeof baseListing.price === 'number' ? `₦${baseListing.price.toLocaleString()}` : baseListing.price),
    location: edits.location || baseListing.location,
    about: edits.about || edits.description || baseListing.about || baseListing.description,
    landlordName: edits.landlordName || baseListing.landlordName || baseListing.landlord?.name,
    contactValue: edits.contactValue || edits.phone || baseListing.contactValue || baseListing.phone || baseListing.landlord?.phone
  };
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

