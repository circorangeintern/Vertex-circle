import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();

  const backHeaderRoutes = {
    '/how-it-works': 'How it works',
    '/admin': 'Admin Verification',
    '/search': 'Search homes',
    '/search-listing': 'Homes in Yaba',
    '/list/step-1': 'List your property',
    '/list/step-2': 'Property Details',
    '/list/step-3': 'Features & Rent',
    '/list/step-4': 'Upload Photos',
    '/list/step-5': 'Review & Submit',
    '/loading': 'Searching homes',
    '/empty': 'Homes in Ajah',
    '/error': 'Connection Error',
  };

  const isListingDetail = location.pathname.startsWith('/listing/');
  const isBackHeader = isListingDetail || (location.pathname in backHeaderRoutes);
  const headerTitle = isListingDetail ? 'Property Details' : backHeaderRoutes[location.pathname];

  return (
    <div className="app">
      <main className="screen">
        <Header showBack={isBackHeader} title={headerTitle} />
        <Outlet />
      </main>
    </div>
  );
}

