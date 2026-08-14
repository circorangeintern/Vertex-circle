import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/listStep.css';

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;
const STORAGE_KEY = 'rentdirect_listing_step2_photos';

export default function ListingStep2() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);

  // Restore photos from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPhotos(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not restore saved photos:', e);
    }
  }, []);

  const savePhotos = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPhotos));
    } catch (e) {
      console.warn('Could not save photos to localStorage:', e);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddPhotos = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remainingSlots = MAX_PHOTOS - photos.length;
    const selectedFiles = files.slice(0, remainingSlots);

    const newPhotoEntries = await Promise.all(
      selectedFiles.map(async (file) => {
        const base64Url = await fileToBase64(file);
        return {
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          previewUrl: base64Url,
        };
      })
    );

    const updated = [...photos, ...newPhotoEntries];
    savePhotos(updated);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (id) => {
    const updated = photos.filter((p) => p.id !== id);
    savePhotos(updated);
  };

  const handleContinue = () => {
    if (photos.length < MIN_PHOTOS) return;
    navigate('/list/step-3');
  };

  return (
    <>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '40%' }}></div>
      </div>

      <section className="section-intro">
        <h1 className="section-title">Add photos</h1>
        <p className="section-desc">
          Add at least {MIN_PHOTOS} clear photos of your property. Good photos get 3x more calls.
        </p>
      </section>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAddPhotos}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        id="fileInput"
      />

      <div className="photo-grid" id="photoGrid">
        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            className="photo-tile photo-tile-add"
            id="addPhotoTile"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className="icon icon-plus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="#2D6A4F" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M5 12H19" stroke="#2D6A4F" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span className="add-photo-label">Add photo</span>
          </button>
        )}

        {photos.map((item) => (
          <div key={item.id} className="photo-tile photo-tile-filled">
            <img className="photo-preview" src={item.previewUrl} alt={item.name} />
            <span className="photo-filename">{item.name}</span>
            <button
              type="button"
              className="remove-btn"
              aria-label={`Remove ${item.name}`}
              onClick={() => handleRemovePhoto(item.id)}
            >
              <svg className="icon icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 6L6 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <p className="photo-count" id="photoCount">
        {photos.length} of {MIN_PHOTOS} minimum added
      </p>

      <div className="continue-bar">
        <button
          type="button"
          className="btn-primary"
          id="continueBtn"
          disabled={photos.length < MIN_PHOTOS}
          onClick={handleContinue}
        >
          <span className="btn-label">Continue to Step 3</span>
        </button>
      </div>
    </>
  );
}
