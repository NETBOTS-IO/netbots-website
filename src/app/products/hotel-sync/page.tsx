'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Hotel, 
  Menu, 
  X, 
  Play, 
  TrendingUp, 
  Bell, 
  Bed, 
  Utensils, 
  Calculator, 
  Users, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import styles from './page.module.css';

export default function HotelSyncPage() {
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // FAQ State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Lead Form State
  const [formData, setFormData] = useState({
    clientName: '',
    hotelName: '',
    contactEmail: '',
    contactPhone: '',
    propertySize: 'medium',
    clientMessage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hotelsync',
          name: formData.clientName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          hotelName: formData.hotelName,
          propertySize: formData.propertySize,
          message: formData.clientMessage
        })
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errData = await response.json();
        setSubmitError(errData.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      setSubmitError('An error occurred. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
        <div className={`${styles.container} ${styles.navContainer}`}>
          <Link href="/products/hotel-sync" className={styles.logo}>
            <Hotel className={styles.logoIcon} size={28} /> Hotel<span>Sync</span>
          </Link>
          
          <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.activeLinks : ''}`}>
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#showcase" onClick={() => setIsMobileMenuOpen(false)}>Capabilities</a>
            <a href="#comparison" onClick={() => setIsMobileMenuOpen(false)}>Why HotelSync</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>

          <div className={styles.navActions}>
            <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>Get Started</a>
            <div className={styles.menuToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero} id="home">
        <div className={`${styles.container} ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>Net Bots SMC-(PRIVATE)LIMITED</div>
            <h1>Best Hotel Management System in Pakistan: <span className={styles.highlight}>HotelSync</span></h1>
            <p>HotelSync is the ultimate offline desktop hotel software and property management system (PMS) built to digitize guest check-ins, automated billing, restaurant POS orders, and accounting ledger cashbooks. Designed specifically to work without internet connectivity in Pakistan's remote locations.</p>
            <div className={styles.heroButtons}>
              <a href="#contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}>Start Free Trial</a>
              <a href="#showcase" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}>Explore Capabilities</a>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/hotel-sync/1.avif" 
              alt="HotelSync Dashboard" 
              width={600} 
              height={380} 
              className={styles.heroImage} 
              priority
            />
            <div className={`${styles.floatingCard} ${styles.card1}`}>
              <TrendingUp size={24} />
              <div>
                <strong>Live Occupancy</strong>
                <span>Auto-updated</span>
              </div>
            </div>
            <div className={`${styles.floatingCard} ${styles.card2}`}>
              <Bell size={24} />
              <div>
                <strong>New Booking</strong>
                <span>Just arrived</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Overview */}
      <section className={styles.features} id="features">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Complete Hotel Management System Suite</h2>
            <p>Designed by Net Bots SMC-(PRIVATE)LIMITED to address the operational challenges of hotels, motels, and guest houses in Pakistan, particularly in remote regions like Hunza and Skardu.</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.bgBlue}`}>
                <Bed size={28} />
              </div>
              <h3>Front Desk Operations</h3>
              <p>Process reservations, walk-ins, guest folios, and real-time room statuses instantly.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.bgGreen}`}>
                <Utensils size={28} />
              </div>
              <h3>Restaurant POS Billing</h3>
              <p>Touch-friendly food & beverage billing, kitchen order tickets (KOT), and room transfers.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.bgPurple}`}>
                <Calculator size={28} />
              </div>
              <h3>Double-Entry Accounting</h3>
              <p>Keep automated cashbooks, P&L reports, asset registers, and vendor ledger balances.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.iconWrapper} ${styles.bgOrange}`}>
                <Users size={28} />
              </div>
              <h3>HR & Roster Management</h3>
              <p>Record daily staff attendance, morning/night shift rosters, salary bonuses, and net payroll.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sequential Feature Showcase Section */}
      <section className={styles.showcase} id="showcase">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Core Platform Capabilities</h2>
            <p>Explore the full stack of features built directly into HotelSync desktop PMS. No modular hidden costs—all features are ready to run.</p>
          </div>

          <div className={styles.sequentialShowcaseContainer}>
            {/* Feature 1: Operations */}
            <motion.div 
              className={styles.showcaseItem}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.showcaseText}>
                <div className={styles.badge} style={{ backgroundColor: 'rgba(0,82,255,0.08)', color: 'var(--primary)' }}>Front Office PMS</div>
                <h3>Front Desk Operations & Room Status</h3>
                <p>Process guest check-ins and check-outs effortlessly in under 30 seconds. Run a quick booking search, keep an eye on clean/dirty statuses, and manage your room catalog dynamically. Complete guest profiles are stored locally for fast returns.</p>
                <ul className={styles.featureList}>
                  <li><Check size={16} /> Direct guest check-in & contact details database</li>
                  <li><Check size={16} /> Multi-room bookings and group check-ins</li>
                  <li><Check size={16} /> Quick visual room status board (Available, Clean, Maintenance, Occupied)</li>
                </ul>
              </div>
              <div className={styles.showcaseImage}>
                <Image src="/images/hotel-sync/2.avif" alt="Front Desk Operations" width={600} height={380} className={styles.heroImage} />
              </div>
            </motion.div>

            {/* Feature 2: POS */}
            <motion.div 
              className={`${styles.showcaseItem} ${styles.reverse}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.showcaseText}>
                <div className={styles.badge} style={{ backgroundColor: 'rgba(16,185,129,0.08)', color: '#10b981' }}>Restaurant POS</div>
                <h3>Restaurant POS & Menu Management</h3>
                <p>Empower your F&B staff with a lightning-fast Point of Sale system. Manage dining tables, take walk-in orders, process room service, and split bills easily. Filter menus instantly and send orders directly to the kitchen.</p>
                <ul className={styles.featureList}>
                  <li><Check size={16} /> Touch-friendly interface & fast menu items search</li>
                  <li><Check size={16} /> Direct "Charge to Room" folio integration</li>
                  <li><Check size={16} /> Party & event banquet booking with advance payments</li>
                </ul>
              </div>
              <div className={styles.showcaseImage}>
                <Image src="/images/hotel-sync/13.avif" alt="Restaurant POS" width={600} height={380} className={styles.heroImage} />
              </div>
            </motion.div>

            {/* Feature 3: Channel Manager Integration */}
            <motion.div 
              className={styles.showcaseItem}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.showcaseText}>
                <div className={styles.badge} style={{ backgroundColor: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>Automatic Synchronization</div>
                <h3>OTA Channel Manager Integration</h3>
                <p>Synchronize your global online room distribution automatically. HotelSync syncs reservations, live inventory updates, and room rates with major local and global OTAs including <strong>Agoda</strong>, <strong>Booking.com</strong>, and local platforms like <strong>Bookme.pk</strong>.</p>
                <ul className={styles.featureList}>
                  <li><Check size={16} /> Two-way reservation sync to pull booking details instantly</li>
                  <li><Check size={16} /> Automatic room availability deductions on OTA portals</li>
                  <li><Check size={16} /> Centralized dashboard for all booking channels</li>
                </ul>
              </div>
              <div className={styles.showcaseImage}>
                <div className={styles.iconWrapper} style={{ width: '100%', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <RefreshCw size={64} className="text-[#0052ff]" style={{ animation: 'spin 12s linear infinite' }} />
                  <h4 style={{ marginTop: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>Bookme · Booking.com · Agoda</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Auto-synchronizing reservations and rates</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: Accounting */}
            <motion.div 
              className={`${styles.showcaseItem} ${styles.reverse}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.showcaseText}>
                <div className={styles.badge} style={{ backgroundColor: 'rgba(139,92,246,0.08)', color: '#8b5cf6' }}>Financial Intelligence</div>
                <h3>Comprehensive Accounting Dashboard</h3>
                <p>Keep your finger on the pulse of your hotel's finances. Our accounting overview shows today's income vs expenses, bank balances, and outstanding vendors. Access your chart of accounts with a single click. Save thousands on separate accounting software.</p>
                <ul className={styles.featureList}>
                  <li><Check size={16} /> Profit & Loss & Trial Balance generation</li>
                  <li><Check size={16} /> Asset, Ledger, and Vendor management</li>
                  <li><Check size={16} /> Export to CSV for Excel</li>
                </ul>
              </div>
              <div className={styles.showcaseImage}>
                <Image src="/images/hotel-sync/10.avif" alt="Accounting Dashboard" width={600} height={380} className={styles.heroImage} />
              </div>
            </motion.div>

            {/* Feature 5: HR */}
            <motion.div 
              className={styles.showcaseItem}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.showcaseText}>
                <div className={styles.badge} style={{ backgroundColor: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>Staff Management</div>
                <h3>Advanced HR & Shift Tracking</h3>
                <p>Manage your staff shifts. Track daily attendance, assign rosters (Morning, Evening, Night), and seamlessly calculate net salaries including bonuses and overtime. Keep operations running cleanly.</p>
                <ul className={styles.featureList}>
                  <li><Check size={16} /> One-click attendance marking</li>
                  <li><Check size={16} /> Staff performance evaluations</li>
                  <li><Check size={16} /> Automated payroll processing</li>
                </ul>
              </div>
              <div className={styles.showcaseImage}>
                <Image src="/images/hotel-sync/19.avif" alt="Staff Management" width={600} height={380} className={styles.heroImage} />
              </div>
            </motion.div>

            {/* Feature 6: WhatsApp Reports */}
            <motion.div 
              className={`${styles.showcaseItem} ${styles.reverse}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.showcaseText}>
                <div className={styles.badge} style={{ backgroundColor: 'rgba(16,185,129,0.08)', color: '#10b981' }}>Automated Reporting</div>
                <h3>Daily Owner Reports via WhatsApp</h3>
                <p>Keep tabs on daily revenues without being physically present. HotelSync compiles check-out summaries, total POS billing receipts, net cashbox balances, and check-ins, sending them automatically to the owner's WhatsApp number.</p>
                <ul className={styles.featureList}>
                  <li><Check size={16} /> Automated daily shift closing reports</li>
                  <li><Check size={16} /> WhatsApp notifications sent directly from the local machine</li>
                  <li><Check size={16} /> Role-based screen access permissions for data safety</li>
                </ul>
              </div>
              <div className={styles.showcaseImage}>
                <Image src="/images/hotel-sync/26.avif" alt="Role & Screen Access" width={600} height={380} className={styles.heroImage} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section (HotelSync vs Munshi10 / Cloud PMS) */}
      <section className={styles.comparisonSection} id="comparison">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Why HotelSync is Built Better for Pakistan</h2>
            <p>Unlike standard cloud platforms like Munshi10 that stop working when the internet cuts out, HotelSync is designed specifically for local stability and offline-first speed. <strong>Our plans are far more affordable, saving you up to 50% on subscription costs with the exact same features.</strong></p>
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Core Capability</th>
                  <th className={styles.hotelsyncColHeader}>HotelSync PMS (Best Value)</th>
                  <th>Cloud-based PMS (e.g., Munshi10)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.featureCol}>Cost & Licensing</td>
                  <td className={styles.hotelsyncCol}>
                    <span className={styles.checkIcon}><Check size={18} /> Highly Affordable & Lifetime Option</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--primary)' }}>Plans start at Rs 4,500/mo. Lifetime license (Rs 200,000) lets you pay once and own it forever. All features included.</p>
                  </td>
                  <td className={styles.cloudCol}>
                    <span className={styles.crossIcon}><AlertTriangle size={18} /> Perpetual Subscription Traps</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Continuous monthly bills that scale up rapidly as rooms or features grow. No lifetime buyout option.</p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.featureCol}>Internet Resilience</td>
                  <td className={styles.hotelsyncCol}>
                    <span className={styles.checkIcon}><Check size={18} /> 100% Offline-First</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--primary)' }}>Zero downtime. Runs locally on your computers even if your internet is out for days.</p>
                  </td>
                  <td className={styles.cloudCol}>
                    <span className={styles.crossIcon}><AlertTriangle size={18} /> Dependent on Web Connection</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Stops working immediately during fiber cuts or electricity/tower outages.</p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.featureCol}>Local Network Speed</td>
                  <td className={styles.hotelsyncCol}>
                    <span className={styles.checkIcon}><Check size={18} /> Instant LAN Sync (0ms latency)</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--primary)' }}>Check guests in and print F&B POS orders instantly across PCs in real-time.</p>
                  </td>
                  <td className={styles.cloudCol}>
                    <span className={styles.crossIcon}><AlertTriangle size={18} /> High Latency Lag</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Laggy check-ins, slow invoice generations, and POS delays during slow network hours.</p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.featureCol}>Data Privacy & Ownership</td>
                  <td className={styles.hotelsyncCol}>
                    <span className={styles.checkIcon}><Check size={18} /> 100% Secure Local Database</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--primary)' }}>Your guest registry, accounts, and shift details reside safely on your local drive.</p>
                  </td>
                  <td className={styles.cloudCol}>
                    <span className={styles.crossIcon}><AlertTriangle size={18} /> Stored on Third-Party Cloud</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Sensitive guest records and financial ledgers uploaded to remote, shared servers.</p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.featureCol}>Owner Alerts</td>
                  <td className={styles.hotelsyncCol}>
                    <span className={styles.checkIcon}><Check size={18} /> Built-in Local WhatsApp Alerts</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--primary)' }}>Sends daily summaries straight to your phone locally without expensive setup.</p>
                  </td>
                  <td className={styles.cloudCol}>
                    <span className={styles.crossIcon}><AlertTriangle size={18} /> Complex Cloud Integrations</span>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Requires external cloud subscription packages and continuous web access.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing} id="pricing">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that fits your property size. No hidden fees.</p>
          </div>
          <div className={styles.pricingGrid}>
            
            {/* Plan 1 */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Monthly</h3>
                <p>Month to Month Cycle</p>
                <div className={styles.price}>
                  <span className={styles.currency}>Rs</span><span className={styles.amount}>4,500</span><span className={styles.period}>/mo</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><Check size={16} /> All System Modules</li>
                <li><Check size={16} /> Regular Updates</li>
                <li><Check size={16} /> Standard Support</li>
                <li><Check size={16} /> Front Desk & POS</li>
              </ul>
              <a href="#contact" className={`${styles.btn} ${styles.btnOutline} ${styles.btnBlock}`}>Get Started</a>
            </div>

            {/* Plan 2 (Popular / Highly Recommended) */}
            <div className={`${styles.pricingCard} ${styles.popular}`}>
              <div className={styles.popularBadge}>RECOMMENDED: Save Rs 19,000/yr</div>
              <div className={styles.pricingHeader}>
                <h3>Yearly Advance</h3>
                <p>Pay annually & save</p>
                <div className={styles.price}>
                  <span className={styles.currency}>Rs</span><span className={styles.amount}>35k</span><span className={styles.period}>/yr</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><Check size={16} /> All System Modules</li>
                <li><Check size={16} /> Priority Support</li>
                <li><Check size={16} /> Free Installation</li>
                <li><Check size={16} /> Save Rs 19,000/year</li>
              </ul>
              <a href="#contact" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}>Get Started</a>
            </div>

            {/* Plan 3 */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Lifetime</h3>
                <p>One-time payment</p>
                <div className={styles.price}>
                  <span className={styles.currency}>Rs</span><span className={styles.amount}>200k</span><span className={styles.period}></span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><Check size={16} /> Lifetime Ownership</li>
                <li><Check size={16} /> No Recurring Fees</li>
                <li><Check size={16} /> 1 Year Free Updates</li>
                <li><Check size={16} /> Complete Setup</li>
              </ul>
              <a href="#contact" className={`${styles.btn} ${styles.btnOutline} ${styles.btnBlock}`}>Contact Sales</a>
            </div>

            {/* Plan 4 */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Commission</h3>
                <p>Performance-based</p>
                <div className={styles.price}>
                  <span className={styles.amount}>1%</span><span className={styles.period}>/profit</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li><Check size={16} /> 1% of Season Profit</li>
                <li><Check size={16} /> Zero Upfront Cost</li>
                <li><Check size={16} /> Full Features Access</li>
                <li><Check size={16} /> Partnership Model</li>
              </ul>
              <a href="#contact" className={`${styles.btn} ${styles.btnOutline} ${styles.btnBlock}`}>Partner With Us</a>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p>Have questions about HotelSync? Find answers to commonly asked questions below.</p>
          </div>
          
          <div className={styles.faqGrid}>
            {[
              {
                q: "Does HotelSync require a continuous internet connection?",
                a: "No, HotelSync is a native desktop application that runs completely offline on your computer. You only need an internet connection if you wish to use cloud backups, email notifications, or the automatic owner reports via WhatsApp."
              },
              {
                q: "How does the automated WhatsApp owner reporting work?",
                a: "HotelSync features a built-in integration that uses API gateway protocols (such as CallMeBot) to compile key daily hotel stats (total check-ins, sales revenue, F&B orders, cash book status) and send them directly as a text notification to the owner's WhatsApp number. You don't need any expensive API packages."
              },
              {
                q: "Can we run HotelSync on multiple computers simultaneously?",
                a: "Yes. HotelSync can be easily set up in a Local Area Network (LAN) database configuration. This allows the reception desk, restaurant billing counter, manager's office, and accountant to work on different PCs while syncing instantly in real-time."
              },
              {
                q: "Is staff training required to use the software?",
                a: "We designed HotelSync with extreme simplicity in mind. With clean menus, instant searches, and shortcuts, staff members with basic computer skills can learn how to check guests in, process billing, and take restaurant orders in under 30 minutes."
              },
              {
                q: "How secure is our hotel data?",
                a: "Since your database resides locally on your machines, your data is completely private. HotelSync also includes configurable automatic local backups that can write database snapshots to secondary drives or local network folders every time the application closes."
              },
              {
                q: "What are the hardware requirements to run HotelSync?",
                a: "HotelSync is highly optimized and lightweight. It runs smoothly on any basic computer with Windows 10 or 11, at least 4GB of RAM, and any standard Intel Core i3 or equivalent processor."
              },
              {
                q: "Are there any hidden transaction fees or commissions on guest check-ins?",
                a: "Absolutely not. HotelSync is a flat-rate software model. You keep 100% of your earnings. Unlike online OTAs or commission-based cloud systems, we never take cuts from your room rents or restaurant dining invoices."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${expandedFaq === index ? styles.active : ''}`}
              >
                <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  <h3>{faq.q}</h3>
                  <ChevronDown size={20} />
                </div>
                <div className={styles.faqAnswer} style={{ maxHeight: expandedFaq === index ? '200px' : '0' }}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Request Section */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.container}>
          <div className={styles.contactCard}>
            <div className={styles.contactInfo}>
              <h2>Get Started with HotelSync</h2>
              <p>Request a free trial download link, schedule a virtual demo call with our experts, or get in touch for custom deployment configurations.</p>
              <div className={styles.contactDetails}>
                <div className={styles.contactDetailItem}>
                  <Mail size={20} />
                  <span>support@netbots.io</span>
                </div>
                <div className={styles.contactDetailItem}>
                  <Mail size={20} />
                  <span>hotelsync@netbots.io</span>
                </div>
                <div className={styles.contactDetailItem}>
                  <Phone size={20} />
                  <span>+92 343 3757373</span>
                </div>
                <div className={styles.contactDetailItem}>
                  <MapPin size={20} />
                  <span>NetBots SMC Private Limited, Pakistan</span>
                </div>
              </div>
            </div>
            
            <div className={styles.contactFormContainer}>
              {!isSubmitted ? (
                <form id="leadForm" className={styles.contactForm} onSubmit={handleFormSubmit}>
                  {submitError && (
                    <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
                      {submitError}
                    </div>
                  )}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="clientName">Full Name</label>
                      <input 
                        type="text" 
                        id="clientName" 
                        required 
                        placeholder="e.g. Saqlain Shah"
                        value={formData.clientName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="hotelName">Hotel / Resort Name</label>
                      <input 
                        type="text" 
                        id="hotelName" 
                        required 
                        placeholder="e.g. Hunza Serena Inn"
                        value={formData.hotelName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contactEmail">Email Address</label>
                      <input 
                        type="email" 
                        id="contactEmail" 
                        required 
                        placeholder="e.g. saqlain@netbots.io"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contactPhone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="contactPhone" 
                        required 
                        placeholder="e.g. +92 343 3757373"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="propertySize">Property Size</label>
                    <select 
                      id="propertySize" 
                      value={formData.propertySize}
                      onChange={handleInputChange}
                    >
                      <option value="small">Guesthouse / Small Hotel (Under 20 rooms)</option>
                      <option value="medium">Mid-Scale Hotel (20-60 rooms)</option>
                      <option value="large">Large Hotel / Resort (60+ rooms)</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="clientMessage">Additional Requirements (Optional)</label>
                    <textarea 
                      id="clientMessage" 
                      rows={4} 
                      placeholder="Tell us if you need multiple POS terminals, special ledger accounts, etc."
                      value={formData.clientMessage}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Request & Get Quote'}
                  </button>
                </form>
              ) : (
                /* Success message */
                <div className={styles.successMessageContainer}>
                  <CheckCircle2 size={64} style={{ color: 'var(--accent-green)', display: 'block', margin: '0 auto 1.5rem' }} />
                  <h3>Request Submitted Successfully!</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1rem', fontWeight: '500' }}>
                    Apka message team ko send hua hai. Vo jald ap se rabta karain gy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerContainer}`}>
          <div className={styles.footerBrand}>
            <Link href="/products/hotel-sync" className={styles.logo} style={{ color: 'white' }}>
              <Hotel className={styles.logoIcon} size={28} /> Hotel<span style={{ color: 'var(--primary)' }}>Sync</span>
            </Link>
            <p>Powered by Net Bots SMC-(PRIVATE)LIMITED. Empowering hospitality businesses with intelligent desktop software.</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>HotelSync</h4>
            <a href="#features">Features</a>
            <a href="#showcase">Capabilities</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQs</a>
          </div>
          <div className={styles.footerLinks}>
            <h4>Products</h4>
            <Link href="/products#hotel-sync">HotelSync</Link>
            <Link href="/products#accounta">Accounta</Link>
            <Link href="/products#e-pharma">E-Pharma</Link>
            <Link href="/products#gmap-scraper">G-Map Scraper</Link>
            <Link href="/products#clinical-system">CMS Care</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4>Services</h4>
            <Link href="/services#web-architecture">Web Dev</Link>
            <Link href="/services#ai-integration">AI Systems</Link>
            <Link href="/services#digital-marketing">SEO/Growth</Link>
            <Link href="/services#secure-devops">DevOps</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/products/hotel-sync/privacy">Privacy Policy</Link>
            <Link href="/products/hotel-sync/terms">Terms of Service</Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Net Bots SMC-(PRIVATE)LIMITED. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
