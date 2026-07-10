'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LeadCaptureModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectFocus: '',
    budget: '',
    timeline: '',
    context: '',
    contact: { name: '', email: '', phone: '', company: '' },
    website_url_honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead_modal_opened');
      }
    }
  }, [isOpen]);

  const handleNext = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_step_completed', { step_number: step, field });
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        currency: 'USD',
        value: 5000,
      });
    }

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'audit',
          name: formData.contact.name,
          email: formData.contact.email,
          phone: formData.contact.phone,
          company: formData.contact.company,
          projectFocus: formData.projectFocus,
          budget: formData.budget,
          timeline: formData.timeline,
          context: formData.context,
        }),
      });

      setStep(6);
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
          maxWidth: '640px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0, 54, 171, 0.18), 0 0 0 1px rgba(0, 82, 255, 0.05)',
          border: '1px solid rgba(255,255,255,0.7)',
        }}
      >
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0052ff 0%, #0036ab 100%)',
          padding: '2rem 2.5rem 1.75rem 2.5rem',
          position: 'relative',
          color: 'white',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.025em' }}>
            Book Your Free Architecture Audit
          </h2>
          <p style={{ margin: '0.35rem 0 0 0', opacity: 0.85, fontSize: '0.9rem', fontWeight: 500 }}>
            Engage our engineers to identify bottlenecks and design scalable pipelines.
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
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
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
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: `${(step / 5) * 100}%`,
            }}
          />
        </div>

        <div style={{ padding: '2.5rem' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  What is your primary objective?
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  {[
                    'Develop Custom Software',
                    'Integrate AI / Automate Workflows',
                    'Digital Marketing & Lead Gen',
                    'Marketing',
                    'Designing',
                    'Consulting & Architecture Audit',
                  ].map(focus => (
                    <button
                      key={focus}
                      onClick={() => handleNext('projectFocus', focus)}
                      style={{
                        padding: '1.1rem 1.25rem',
                        textAlign: 'left',
                        border: '1.5px solid rgba(0, 82, 255, 0.08)',
                        borderRadius: '16px',
                        background: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#334155',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#0052ff';
                        e.currentTarget.style.background = 'rgba(0, 82, 255, 0.04)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.08)';
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {focus}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  What is your estimated budget?
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                  {['Under $5,000', '$5,000 – $15,000', '$15,000+', 'Need a quote'].map(budget => (
                    <button
                      key={budget}
                      onClick={() => handleNext('budget', budget)}
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
                        e.currentTarget.style.background = 'rgba(0, 82, 255, 0.04)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.08)';
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  How quickly do you need this?
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
                  {['ASAP', '1 to 3 Months', '3 to 6 Months', 'Just researching'].map(time => (
                    <button
                      key={time}
                      onClick={() => handleNext('timeline', time)}
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
                        e.currentTarget.style.background = 'rgba(0, 82, 255, 0.04)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.08)';
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  Describe your current challenge.
                </h3>
                <textarea
                  style={{
                    width: '100%',
                    padding: '1.1rem',
                    border: '1.5px solid rgba(0, 82, 255, 0.08)',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    minHeight: '140px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    transition: 'all 0.2s',
                  }}
                  placeholder="Describe your current tech stack or business challenge..."
                  value={formData.context}
                  onChange={e => setFormData({ ...formData, context: e.target.value })}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#0052ff';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.08)';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.5rem',
                }}>
                  <button
                    onClick={() => setStep(5)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline',
                      fontWeight: 600,
                    }}
                  >
                    Skip this step
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    style={{
                      background: '#0052ff',
                      color: 'white',
                      border: 'none',
                      padding: '0.85rem 1.75rem',
                      borderRadius: '30px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                      boxShadow: '0 4px 14px rgba(0, 82, 255, 0.2)',
                    }}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.form
                key="step5"
                onSubmit={submitLead}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
                  Where should we send your audit?
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
                    placeholder="Company / Organization"
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
                    transition: 'all 0.2s',
                    boxShadow: '0 6px 20px rgba(0, 82, 255, 0.25)',
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Get My Free Architecture Audit'}
                </button>
              </motion.form>
            )}

            {step === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
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
                  Audit Request Received
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Our engineering team will review your requirements and reach out within 24 hours.
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
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#0052ff';
                    e.currentTarget.style.color = '#0052ff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 82, 255, 0.1)';
                    e.currentTarget.style.color = '#0f172a';
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
  transition: 'all 0.2s',
};

