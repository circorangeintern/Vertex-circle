import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Page Components
import Landing from './pages/Landing';
import Home from './pages/Home';
import Search from './pages/Search';
import SearchListing from './pages/SearchListing';
import ListDetail from './pages/ListDetail';
import ContactReveal from './pages/ContactReveal';
import HowItWorks from './pages/HowItWorks';

// Listing Wizard Steps
import ListStep1 from './pages/listing/ListStep1';
import ListingStep2 from './pages/listing/ListingStep2';
import ListingStep3 from './pages/listing/ListingStep3';
import ListingStep4 from './pages/listing/ListingStep4';
import ListingStep5 from './pages/listing/ListingStep5';

// State Pages
import Success from './pages/states/Success';
import Loading from './pages/states/Loading';
import Empty from './pages/states/Empty';
import Error from './pages/states/Error';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-width standalone landing page */}
        <Route path="/" element={<Landing />} />

        {/* Layout wrapped SPA routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-listing" element={<SearchListing />} />
          <Route path="/listing/:id" element={<ListDetail />} />
          <Route path="/contact-reveal" element={<ContactReveal />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          
          {/* Multi-step property creation wizard */}
          <Route path="/list/step-1" element={<ListStep1 />} />
          <Route path="/list/step-2" element={<ListingStep2 />} />
          <Route path="/list/step-3" element={<ListingStep3 />} />
          <Route path="/list/step-4" element={<ListingStep4 />} />
          <Route path="/list/step-5" element={<ListingStep5 />} />

          {/* Status & Feedback views */}
          <Route path="/success" element={<Success />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/empty" element={<Empty />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
