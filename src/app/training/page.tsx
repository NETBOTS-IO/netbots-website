'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cloud, Code, LineChart, Palette, Terminal, Users, CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const courses = [
  {
    title: 'Artificial Intelligence',
    duration: '8 weeks',
    level: 'Beginner',
    icon: <Bot size={32} className="text-[#0052ff]" />,
    desc: 'Learn the basics of AI development with practical examples and hands-on projects.',
    topics: [
      'Introduction to AI & ML',
      'Python Programming',
      'Data Processing',
      'Neural Networks',
      'Model Training',
      'Project Implementation',
    ],
  },
  {
    title: 'Advanced Cloud Architecture',
    duration: '10 weeks',
    level: 'Advanced',
    icon: <Cloud size={32} className="text-[#0052ff]" />,
    desc: 'Master cloud architecture design and implementation using modern technologies.',
    topics: [
      'Cloud Infrastructure',
      'Microservices',
      'Containerization',
      'Serverless Computing',
      'Security Best Practices',
      'Performance Optimization',
    ],
  },
  {
    title: 'Full Stack Web Development',
    duration: '12 weeks',
    level: 'Intermediate',
    icon: <Code size={32} className="text-[#0052ff]" />,
    desc: 'Comprehensive training in modern web development technologies and practices.',
    topics: [
      'Frontend Development',
      'Backend Development',
      'Database Design',
      'API Development',
      'Testing & Deployment',
      'Project Management',
    ],
  },
  {
    title: 'Digital Marketing',
    duration: '8 weeks',
    level: 'Beginner',
    icon: <LineChart size={32} className="text-[#0052ff]" />,
    desc: 'Master the art of digital marketing with hands-on experience in modern marketing tools and strategies.',
    topics: [
      'SEO & SEM',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
      'Digital Marketing Strategy',
    ],
  },
  {
    title: 'UI/UX Design',
    duration: '10 weeks',
    level: 'Intermediate',
    icon: <Palette size={32} className="text-[#0052ff]" />,
    desc: 'Learn professional design skills using industry-standard tools and modern design principles.',
    topics: [
      'Design Principles',
      'UI Design',
      'UX Research',
      'Prototyping',
      'Design Systems',
      'Portfolio Development',
    ],
  },
  {
    title: 'IT Fundamentals',
    duration: '6 weeks',
    level: 'Beginner',
    icon: <Terminal size={32} className="text-[#0052ff]" />,
    desc: 'Build a strong foundation in Information Technology with practical knowledge and hands-on experience.',
    topics: [
      'Computer Basics',
      'Networking Fundamentals',
      'Operating Systems',
      'Cybersecurity Basics',
      'Hardware & Software',
      'IT Support Skills',
    ],
  },
];

export default function TrainingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: '',
    background: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
          type: 'training',
          name: formData.name,
          email: formData.email,
          program: formData.program,
          background: formData.background,
        }),
      });

      setShowSuccess(true);
      setFormData({ name: '', email: '', program: '', background: '' });
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            TRAINING & ACADEMY
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Shaping the Next Generation{' '}
            <span className={styles.highlight}>of Elite Technologists</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Professional academy courses engineered by NetBots. We also build and integrate custom AI automation, AI agents, and secure enterprise architectures.
          </motion.p>
        </section>

        {/* Courses Section */}
        <section className={styles.programsSection}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>Our Courses</h2>
          <div className={styles.programsGrid}>
            {courses.map((course, i) => (
              <motion.div
                key={i}
                className={styles.programCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  {course.icon}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', background: 'rgba(0, 82, 255, 0.08)', color: '#0052ff', borderRadius: '20px' }}>
                      {course.duration}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', background: '#f1f5f9', color: '#475569', borderRadius: '20px' }}>
                      {course.level}
                    </span>
                  </div>
                </div>
                <h3 className={styles.programTitle} style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>{course.title}</h3>
                <p className={styles.programDesc} style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>{course.desc}</p>
                
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Key Topics:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {course.topics.map((topic, topicIdx) => (
                    <li key={topicIdx} style={{ fontSize: '0.88rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#0052ff', fontWeight: 'bold' }}>•</span> {topic}
                    </li>
                  ))}
                </ul>

                <a href="#apply" style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#0052ff',
                  color: 'white',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 82, 255, 0.15)',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#003cc2'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0052ff'}
                >
                  Enroll Now
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mentorship Section */}
        <section className={styles.locationSection} style={{ background: '#f8fafc', color: '#0f172a', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <span className={styles.preHeadline} style={{ marginBottom: '1.5rem' }}>EXCLUSIVES</span>
                <h2 className={styles.sectionTitle} style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Mentorship Program</h2>
                <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Join our exclusive mentorship program and get personalized guidance from industry experts. Our mentors will help you accelerate your learning journey and achieve your career goals. We also provide strategic AI automation development and intelligent AI agents.
                </p>

                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Benefits</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {[
                    'One-on-one sessions with expert mentors',
                    'Personalized learning path',
                    'Real-world project experience',
                    'Career guidance and networking',
                    'Industry certification preparation'
                  ].map((benefit, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: '#475569' }}>
                      <CheckCircle size={18} className="text-[#0052ff]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} style={{ background: 'white', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Program Structure</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {[
                    { title: 'Weekly Mentoring Sessions', desc: 'Direct access to senior engineers.' },
                    { title: 'Project-Based Learning', desc: 'Build concrete, production-grade applications.' },
                    { title: 'Technical Skill Assessment', desc: 'Identify code quality gaps.' },
                    { title: 'Career Development Workshops', desc: 'Resume tuning and mock interviews.' },
                    { title: 'Industry Networking Events', desc: 'Connect with hiring managers.' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                      <Users size={20} className="text-[#0052ff] shrink-0" style={{ marginTop: '0.2rem' }} />
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>Duration: 3 months</span>
                  <a href="#apply" style={{ background: '#0052ff', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
                    Apply for Mentorship
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>
          <div style={{
            background: '#ffffff',
            padding: '4rem 3.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(0, 82, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 82, 255, 0.04)',
          }}>
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    background: 'rgba(0, 82, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0052ff',
                    fontSize: '2rem',
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                    Application Sent Successfully!
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    Thank you for applying. Our administration team will review your details and contact you soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>Apply for Mentorship / Course</h2>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                    Enter your details below to apply. Our team will review your application and reach out within 24 hours.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Full Name *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        style={inputFormStyle}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        style={inputFormStyle}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Select Program / Course *</label>
                    <select
                      required
                      name="program"
                      style={selectFormStyle}
                      value={formData.program}
                      onChange={e => setFormData({ ...formData, program: e.target.value })}
                    >
                      <option value="">Choose a course or mentorship...</option>
                      <option value="mentorship">Mentorship Program (3 Months)</option>
                      <option value="ai">Artificial Intelligence (8 Weeks)</option>
                      <option value="cloud">Advanced Cloud Architecture (10 Weeks)</option>
                      <option value="fullstack">Full Stack Web Development (12 Weeks)</option>
                      <option value="marketing">Digital Marketing (8 Weeks)</option>
                      <option value="uiux">UI/UX Design (10 Weeks)</option>
                      <option value="it">IT Fundamentals (6 Weeks)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>Describe your background & objectives</label>
                    <textarea
                      name="background"
                      rows={4}
                      placeholder="Briefly introduce yourself and what you expect from this training..."
                      style={textareaFormStyle}
                      value={formData.background}
                      onChange={e => setFormData({ ...formData, background: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: '#0052ff',
                      color: 'white',
                      border: 'none',
                      padding: '1.1rem',
                      borderRadius: '30px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 15px rgba(0, 82, 255, 0.2)',
                      transition: 'all 0.2s',
                      marginTop: '0.5rem',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#003cc2';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#0052ff';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const inputFormStyle: React.CSSProperties = {
  padding: '0.95rem 1.1rem',
  border: '1.5px solid rgba(0, 82, 255, 0.1)',
  borderRadius: '14px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
  background: '#f8fafc',
  color: '#0f172a',
  transition: 'all 0.2s',
};

const selectFormStyle: React.CSSProperties = {
  padding: '0.95rem 1.1rem',
  border: '1.5px solid rgba(0, 82, 255, 0.1)',
  borderRadius: '14px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
  background: '#f8fafc',
  color: '#0f172a',
  transition: 'all 0.2s',
};

const textareaFormStyle: React.CSSProperties = {
  padding: '0.95rem 1.1rem',
  border: '1.5px solid rgba(0, 82, 255, 0.1)',
  borderRadius: '14px',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
  background: '#f8fafc',
  color: '#0f172a',
  resize: 'vertical',
  transition: 'all 0.2s',
};
