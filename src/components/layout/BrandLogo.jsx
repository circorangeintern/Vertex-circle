import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ size = 'md', to = '/home', onClick }) {
  const content = (
    <div className={`brand brand--${size}`}>
      <span className="brand-mark" aria-hidden="true">R</span>
      <span className="brand-name">RentDirect</span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="brand-link" style={{ textDecoration: 'none' }} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return content;
}
