'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './page.module.css';

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const openRoles: JobRole[] = [
  {
    id: 'role-1',
    title: 'Full Stack Next.js / MERN Developer',
    department: 'Engineering',
    location: 'Skardu / Hybrid',
    type: 'Full-Time',
    description: 'We are looking for a Full Stack Developer experienced with Next.js, React, Node.js, and MongoDB to architect high-performance enterprise applications.',
    requirements: [
      'Strong proficiency in JavaScript, TypeScript, React, and Next.js (App Router).',
      'Experience building RESTful and GraphQL APIs with Node.js and Express.',
      'Familiarity with MongoDB, PostgreSQL, and basic database design.',
      'Understanding of modern deployment workflows (Vercel, AWS, Docker).',
    ]
  },
  {
    id: 'role-2',
    title: 'AI Workflows & LLM Integration Engineer',
    department: 'AI & Automation',
    location: 'Skardu / Remote',
    type: 'Full-Time',
    description: 'Join us to design and deploy state-of-the-art Agentic AI workflows, integrate LLMs, and automate complex enterprise pipelines.',
    requirements: [
      'Experience working with OpenAI API, Anthropic Claude, LangChain, or LlamaIndex.',
      'Proficiency in Python and JavaScript (Node.js).',
      'Understanding of prompt engineering, vector databases (Pinecone, ChromaDB), and RAG systems.',
      'Ability to build secure, robust backend systems.',
    ]
  },
  {
    id: 'role-3',
    title: 'Technical SEO & Content Strategist',
    department: 'Digital Marketing',
    location: 'Skardu / Hybrid',
    type: 'Full-Time',
    description: 'Help our clients scale their digital presence by designing and executing technical SEO strategies, content plans, and optimization campaigns.',
    requirements: [
      'Proven experience in Technical SEO, on-page optimization, and keyword analysis.',
      'Deep understanding of Google Analytics (GA4), Search Console, and Microsoft Clarity.',
      'Excellent technical writing skills with a focus on web architecture, SaaS, and AI.',
      'Experience with social media marketing and brand positioning.',
    ]
  }
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '',
    resumeLink: '',
    coverLetter: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenForm = (role: JobRole) => {
    setSelectedRole(role);
    setStatus('idle');
  };

  const handleCloseForm = () => {
    setSelectedRole(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setStatus('submitting');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'career',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          portfolio: formData.portfolio,
          experience: formData.experience,
          resumeLink: formData.resumeLink,
          coverLetter: formData.coverLetter,
          roleTitle: selectedRole.title,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          portfolio: '',
          experience: '',
          resumeLink: '',
          coverLetter: '',
        });
        setTimeout(() => {
          setSelectedRole(null);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <motion.span
            className={styles.preHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            JOIN OUR TEAM
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Shape the Future of <span className={styles.highlight}>Software & AI</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We are building high-performance systems and intelligent automation pipelines. Discover how your talent can thrive at Net Bots.
          </motion.p>
        </section>

        {/* Roles Section */}
        <section className={styles.rolesSection}>
          <div className={styles.rolesContainer}>
            <h2 className={styles.sectionTitle}>Open Positions</h2>
            <div className={styles.rolesGrid}>
              {openRoles.map((role) => (
                <motion.div
                  key={role.id}
                  className={styles.roleCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.roleHeader}>
                    <span className={styles.departmentBadge}>{role.department}</span>
                    <span className={styles.typeBadge}>{role.type}</span>
                  </div>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <p className={styles.roleMeta}>{role.location}</p>
                  <p className={styles.roleDesc}>{role.description}</p>
                  
                  <div className={styles.requirementsList}>
                    <h4 className={styles.reqTitle}>Requirements:</h4>
                    <ul>
                      {role.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleOpenForm(role)}
                    className={styles.applyBtn}
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide-out Application Form Overlay */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseForm}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className={styles.closeBtn} onClick={handleCloseForm}>
                  &times;
                </button>
                
                {status === 'success' ? (
                  <div className={styles.successScreen}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>Application Sent Successfully!</h3>
                    <p>Our talent acquisition team will review your application and contact you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>Apply for {selectedRole.title}</h3>
                    <p className={styles.formSubtitle}>{selectedRole.department} &middot; {selectedRole.location}</p>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Phone / WhatsApp *</label>
                        <input
                          type="text"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Portfolio Link (optional)</label>
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Years of Experience *</label>
                        <input
                          type="text"
                          name="experience"
                          required
                          placeholder="e.g. 3 years"
                          value={formData.experience}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Resume Link (Google Drive, Dropbox, etc.) *</label>
                        <input
                          type="url"
                          name="resumeLink"
                          required
                          placeholder="Link to your online CV"
                          value={formData.resumeLink}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label>Cover Letter / Additional Notes *</label>
                        <textarea
                          name="coverLetter"
                          rows={4}
                          required
                          placeholder="Why do you want to join Net Bots?"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={styles.submitBtn}
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
