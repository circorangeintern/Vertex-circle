import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/listStep.css';

const STORAGE_KEY = 'rentdirect_listing_step1';

export default function ListStep1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not restore step 1 form data:', e);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setErrors(prev => ({ ...prev, [name]: false }));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save step 1 form data:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.description.trim()) newErrors.description = true;
    if (!formData.phone.trim()) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/list/step-2');
  };

  return (
    <>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '20%' }}></div>
      </div>

      <form className="listing-form" onSubmit={handleSubmit} noValidate>
        {/* Title Field */}
        <div className={`field-group ${errors.title ? 'has-error' : ''}`}>
          <label className="field-label" htmlFor="titleInput">
            Property title
          </label>
          <input
            id="titleInput"
            name="title"
            type="text"
            className="field-input"
            placeholder="e.g. Self-contained room in Yaba"
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
          />
          <p className="field-hint">Use simple terms: room type + area.</p>
        </div>

        {/* Description Field */}
        <div className={`field-group ${errors.description ? 'has-error' : ''}`}>
          <label className="field-label" htmlFor="descInput">
            Description
          </label>
          <textarea
            id="descInput"
            name="description"
            className="field-textarea"
            placeholder="Describe the property: running water, prepaid meter, security, light status..."
            rows={5}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <p className="field-hint">Clear details build trust with renters.</p>
        </div>

        {/* Phone Field */}
        <div className={`field-group ${errors.phone ? 'has-error' : ''}`}>
          <label className="field-label" htmlFor="phoneInput">
            Your phone number
          </label>
          <input
            id="phoneInput"
            name="phone"
            type="tel"
            className="field-input"
            placeholder="e.g. 0803 123 4567"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          <p className="field-hint">Renters will call or WhatsApp this number directly.</p>
        </div>

        {/* Unified Continue Bar */}
        <div className="continue-bar">
          <button type="submit" className="btn-primary" id="continueBtn">
            <span className="btn-label">Continue to Step 2</span>
          </button>
        </div>
      </form>
    </>
  );
}
