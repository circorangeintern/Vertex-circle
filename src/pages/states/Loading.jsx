import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/states.css';

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/search-listing');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <p className="loading-status" id="loadingStatus" aria-live="polite" style={{ fontSize: '17px', color: '#5C554A', margin: '0 0 16px 0' }}>
        Finding homes…
      </p>

      <section className="listing-grid">
        {[1, 2, 3].map((item) => (
          <article key={item} className="skeleton-card" style={{ marginBottom: '20px' }}>
            <div className="skeleton-media shimmer"></div>
            <div className="skeleton-body">
              <span className="skeleton-line skeleton-line-title shimmer"></span>
              <span className="skeleton-line skeleton-line-full shimmer"></span>
              <span className="skeleton-line skeleton-line-short shimmer"></span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
