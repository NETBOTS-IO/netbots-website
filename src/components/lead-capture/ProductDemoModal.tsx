'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductDemoModal({
  isOpen,
  onClose,
  initialProductId = '',
}: {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: string;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: '',
    usersCount: '',
    requirements: '',
    contact: { name: '', email: '', phone: '', company: '' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData(prev => ({ ...prev, product: initialProductId }));
    }
  }, [isOpen, initialProductId]);

  const handleNext = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'demo',
          name: formData.contact.name,
          email: formData.contact.email,
          phone: formData.contact.phone,
          company: formData.contact.company,
          product: formData.product,
          usersCount: formData.usersCount,
          requirements: formData.requirements,
        }),
      });

      setStep(5);
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(8px)',
    }}>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        style={{
          width: '100%',
          maxWidth: '600px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0, 54, 171, 0.18), 0 0 0 1px rgba(0, 82, 255, 0.05)',
          border: '1px solid rgba(255,255,255,0.7)',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0052ff 0%, #0036ab 100%)',
          padding: '2rem 2.5rem 1.75rem 2.5rem',
          position: 'relative',
          color: 'white',
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>
            Request Platform Demo
          </h2>
          <p style={{ margin: '0.35rem 0 0 0', opacity: 0.85, fontSize: '0.88rem', fontWeight: 500 }}>
            Get a tailored system walkthrough with our solutions architect.
          </p>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '4px', background: 'rgba(0, 82, 255, 0.08)' }}>
          <div
            style={{
              height: '100%',
              background: '#0052ff',
              transition: 'width 0.3s ease',
              width: `${(step / 4) * 100}%`,
            }}
          />
        </div>

        <div style={{ padding: '2.5rem' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  Select Platform
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  {[
                    { id: 'accounta', name: 'Accounta (Financial)' },
                    { id: 'e-pharma', name: 'E-Pharma (POS)' },
                    { id: 'gmap-scraper', name: 'G-Map Scraper (Leads)' },
                   { id: 'hotel-sync', name: 'HotelSync' },
                    { id: 'clinical-system', name: 'CMS Care (Clinic)' },
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleNext('product', p.name)}
                      style={{
                        padding: '1.1rem 1.25rem',
                        textAlign: 'left',
                        border: formData.product === p.name ? '1.5px solid #0052ff' : '1.5px solid rgba(0, 82, 255, 0.08)',
                        borderRadius: '16px',
                        background: formData.product === p.name ? 'rgba(0, 82, 255, 0.04)' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#334155',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#0052ff';
                      }}
                      onMouseOut={(e) => {
                        if (formData.product !== p.name) {
                          e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.08)';
                        }
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  Scale of Deployment
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                  {['1-10 Users', '11-50 Users', '50+ Users', 'Entire Enterprise'].map(size => (
                    <button
                      key={size}
                      onClick={() => handleNext('usersCount', size)}
                      style={{
                        padding: '0.85rem 1.75rem',
                        border: '1.5px solid rgba(0, 82, 255, 0.08)',
                        borderRadius: '30px',
                        background: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#334155',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#0052ff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.08)';
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  Custom integration requirements?
                </h3>
                <textarea
                  style={{
                    width: '100%',
                    padding: '1.1rem',
                    border: '1.5px solid rgba(0, 82, 255, 0.08)',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    minHeight: '120px',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                  }}
                  placeholder="Specify any third-party APIs or legacy databases you need this platform to sync with..."
                  value={formData.requirements}
                  onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  <button
                    onClick={() => setStep(4)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    style={{ background: '#0052ff', color: 'white', border: 'none', padding: '0.85rem 1.75rem', borderRadius: '30px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

             {step === 4 && (
              <motion.form
                key="step4"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  Demo Contact Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    style={inputStyle}
                    value={formData.contact.name}
                    onChange={e => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    style={inputStyle}
                    value={formData.contact.email}
                    onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone / WhatsApp"
                    style={inputStyle}
                    value={formData.contact.phone}
                    onChange={e => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    style={inputStyle}
                    value={formData.contact.company}
                    onChange={e => setFormData({ ...formData, contact: { ...formData.contact, company: e.target.value } })}
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  style={{
                    width: '100%',
                    marginTop: '1.25rem',
                    padding: '1.1rem',
                    background: '#0052ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(0, 82, 255, 0.25)',
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Demo Request'}
                </button>
              </motion.form>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  background: 'rgba(0,82,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0052ff',
                  fontSize: '2rem',
                }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                  Demo Request Submitted
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thank you! Our solutions engineering team will reach out within 24 hours to coordinate the demonstration calendar.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    padding: '0.85rem 2rem',
                    border: '1.5px solid rgba(0, 82, 255, 0.1)',
                    borderRadius: '30px',
                    background: 'white',
                    cursor: 'pointer',
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.95rem 1.1rem',
  border: '1.5px solid rgba(0, 82, 255, 0.08)',
  borderRadius: '16px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
  background: '#f8fafc',
  color: '#0f172a',
};
