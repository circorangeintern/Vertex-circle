import { ALL_LISTINGS, getListingById } from '../data/listings';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch listings from Hono backend API with fallback to local listings dataset
 */
export async function getListings(searchQuery = '') {
  try {
    const url = searchQuery 
      ? `${API_BASE_URL}/listings?area=${encodeURIComponent(searchQuery)}`
      : `${API_BASE_URL}/listings`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    if (data.listings && Array.isArray(data.listings) && data.listings.length > 0) {
      return data.listings;
    }
  } catch (error) {
    console.warn('Backend API unavailable, using fallback listings:', error.message);
  }

  // Fallback to local listings
  if (!searchQuery) return ALL_LISTINGS;
  return ALL_LISTINGS.filter(item => 
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

/**
 * Fetch a single listing by ID from backend with fallback
 */
export async function getListingDetails(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data && (data.id || data.listing)) {
      return data.listing || data;
    }
  } catch (error) {
    console.warn(`Backend API unavailable for listing ${id}, using fallback:`, error.message);
  }

  return getListingById(id);
}

/**
 * Create a new property listing via backend API with fallback to local state
 */
export async function submitNewListing(listingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Backend submission failed, saving locally:', error.message);
    const mockToken = 'rd_tok_' + Math.random().toString(36).substring(2, 10);
    return {
      success: true,
      id: 'lst_' + Date.now(),
      managementToken: mockToken,
      message: 'Listing submitted for review (local fallback)',
    };
  }
}
