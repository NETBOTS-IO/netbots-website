'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  Mic,
  Code2,
  Cpu,
  TrendingUp,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Clock,
  Phone,
  X,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Flame,
  Check,
  Building2,
  Video,
  Mail,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './page.module.css';

const pillars = [
  {
    number: '01',
    title: 'Development',
    action: 'Build. Ship. Grow.',
    icon: <Code2 size={28} />,
    desc: 'Learn real-world architecture and rapid prototyping. Move beyond academic toy projects to production-grade software that scales.',
    topics: [
      'Full-stack architecture from zero to production',
      'API design, databases & resilient deployment',
      'Shipping MVPs before running out of momentum',
      'Engineering for real clients and users',
    ],
  },
  {
    number: '02',
    title: 'Automation',
    action: 'Work Smarter.',
    icon: <Cpu size={28} />,
    desc: 'Harness the cutting edge of AI agents, automated workflows, and operational systems to multiply your output by 10x with zero extra headcount.',
    topics: [
      'AI agents & LLM workflow integration',
      'Automating lead capture, CRM & customer touchpoints',
      'Eliminating manual, repetitive agency labor',
      'Building internal software tooling that saves hundreds of hours',
    ],
  },
  {
    number: '03',
    title: 'Sales',
    action: 'Turn Ideas Into Revenue.',
    icon: <TrendingUp size={28} />,
    desc: 'Code is only half the battle. Master the art of client acquisition, pricing, value pitching, and closing high-ticket international contracts.',
    topics: [
      'Finding real problems people will pay to solve',
      'Client discovery calls & high-converting proposals',
      'Value-based pricing vs commoditized hourly rates',
      'Cold outreach, negotiation, and retainer contracts',
    ],
  },
  {
    number: '04',
    title: 'Leadership',
    action: 'Lead. Build. Inspire.',
    icon: <Sparkles size={28} />,
    desc: 'Transition from solo hacker to effective founder. Build high-performing teams, foster culture, navigate crises, and think long-term.',
    topics: [
      'Founder psychology, discipline & mental toughness',
      'Hiring, delegating and motivating technical talent',
      'Managing project risk, cash flow and client expectations',
      'Building an enduring brand that commands respect',
    ],
  },
];

const availableLearningInterests = [
  'Full-Stack Architecture & Production Web Apps',
  'AI Agents & Automated Business Workflows',
  'High-Ticket Sales, Client Pitching & Pricing',
  'Startup Strategy & Founder Leadership',
  'Freelancing to Tech Agency Transition',
  'MVP Prototyping & Product Launch',
];

const universityVsFounder = [
  {
    uni: 'Memorizing textbooks & obsolete theoretical paradigms',
    founder: 'Building real production products using modern tech stacks',
  },
  {
    uni: 'Polishing CVs to compete with thousands of other applicants',
    founder: 'Creating companies, owning equity, and generating your own revenue',
  },
  {
    uni: 'Waiting for internships and entry-level permission',
    founder: 'Shipping MVPs and pitching directly to paying business clients',
  },
  {
    uni: 'Working in isolated academic silos with no market feedback',
    founder: 'Navigating real-world development, automation, and leadership',
  },
];

export default function FounderLabPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    stage: '',
    plan: 'Group Cohort (PKR 5,000)',
    mode: 'On-site (Skardu Campus)',
    interests: [
      'Full-Stack Architecture & Production Web Apps',
      'AI Agents & Automated Business Workflows',
    ],
    motivation: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return {
          ...prev,
          interests: prev.interests.filter((item) => item !== interest),
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, interest],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'founder-lab',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          university: formData.university,
          major: formData.major,
          stage: formData.stage,
          plan: formData.plan,
          mode: formData.mode,
          interests: formData.interests,
          motivation: formData.motivation,
          honeypot: formData.honeypot,
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed. Please try again.');
      }

      setIsSubmitted(true);
    } catch {
      setErrorMsg('Failed to submit application. Please reach out to us directly on WhatsApp or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToApply = (selectedPlan?: string) => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    }
    const element = document.getElementById('apply-now');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        {/* Ambient Top Glow */}
        <div className={styles.ambientGlowTop} />

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroGrid}>
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.badgeRow}>
                <span className={styles.preHeadline}>
                  <Flame size={14} /> The Founder Lab • 21-Day Masterclass
                </span>
                <span className={styles.urgencyBadge}>
                  <span className={styles.urgencyDot} />
                  Applications Close Soon
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                THE FOUNDER LAB
                <span className={styles.brandGradient}>.</span>
              </h1>

              <div className={styles.tagline}>
                <span>Build the company.</span>
                <span className={styles.taglineAccent}>Not just the resume.</span>
              </div>

              <p className={styles.heroSubtitle}>
                A 21-day masterclass where <strong>Saqlain Shah</strong>, Founder & CEO of NetBots,
                personally shares the full playbook behind building a real company: <strong>development</strong>,{' '}
                <strong>automation</strong>, <strong>sales</strong>, and <strong>leadership</strong>.
                No slides. No fixed script. Just real conversations from someone actually doing it.
              </p>

              {/* Who it is for Box */}
              <div className={styles.audienceCallout}>
                <GraduationCap size={24} className={styles.audienceIcon} />
                <div className={styles.audienceText}>
                  <span className={styles.audienceLabel}>Who It's For</span>
                  University students ready to think like founders, not employees.
                </div>
              </div>

              {/* Spec Strip */}
              <div className={styles.specStrip}>
                <div className={styles.specItem}>
                  <div className={styles.specIconBox}>
                    <Calendar size={20} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Duration</span>
                    <span className={styles.specValue}>21 Days (90 min/day)</span>
                  </div>
                </div>

                <div className={styles.specItem}>
                  <div className={styles.specIconBox}>
                    <Users size={20} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Delivery</span>
                    <span className={styles.specValue}>On-site (Skardu) & Online</span>
                  </div>
                </div>

                <div className={styles.specItem}>
                  <div className={styles.specIconBox}>
                    <Mic size={20} />
                  </div>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Investment</span>
                    <span className={styles.specValue}>PKR 5,000 / PKR 25,000</span>
                  </div>
                </div>
              </div>

              {/* CTA Group */}
              <div className={styles.heroCtaGroup}>
                <button
                  type="button"
                  onClick={() => scrollToApply()}
                  className={styles.primaryCta}
                >
                  Apply for Masterclass <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(true)}
                  className={styles.secondaryCta}
                >
                  <Maximize2 size={16} /> View Official Poster
                </button>
              </div>
            </motion.div>

            {/* Right Column: Poster Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <div className={styles.posterPreviewCard}>
                <div
                  className={styles.posterImageContainer}
                  onClick={() => setIsPosterModalOpen(true)}
                  title="Click to view full poster"
                >
                  <Image
                    src="/images/founder-lab/the-founder-lab-poster.avif"
                    alt="The Founder Lab 21-Day Masterclass Official Poster - NetBots"
                    width={600}
                    height={600}
                    className={styles.posterImage}
                    priority
                  />
                  <div className={styles.posterOverlayBtn}>
                    <div className={styles.posterZoomIcon}>
                      <Maximize2 size={20} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Click to view full poster</span>
                  </div>
                </div>

                <div className={styles.posterCardFooter}>
                  <div className={styles.posterCardSpeaker}>
                    <div className={styles.speakerDetails}>
                      <div className={styles.speakerAvatar}>
                        <Image
                          src="/images/profileImage-ceo.avif"
                          alt="Saqlain Shah"
                          width={44}
                          height={44}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                      <div className={styles.speakerMeta}>
                        <span className={styles.speakerName}>Saqlain Shah</span>
                        <span className={styles.speakerTitle}>Founder & CEO, NetBots</span>
                      </div>
                    </div>
                    <span className={styles.posterStatusBadge}>21-Day Lab</span>
                  </div>

                  <div className={styles.posterQuote}>
                    "No slides. No fixed script. Just real conversations from someone actually doing it."
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing / Investment Plans Section */}
        <section className={styles.pricingSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPre}>Transparent Investment</span>
            <h2 className={styles.sectionTitle}>Choose Your Masterclass Track</h2>
            <p className={styles.sectionSubtitle}>
              Both on-site (at NetBots Skardu Campus) and live online options are available so students across Pakistan can participate.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {/* Plan 1: Group Cohort */}
            <motion.div
              className={styles.pricingCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={styles.pricingPlanTitle}>Group Cohort</h3>
              <p className={styles.pricingPlanDesc}>
                Ideal for university students looking to build real products, gain agency automation skills, and connect with ambitious peers.
              </p>

              <div className={styles.pricingPriceRow}>
                <span className={styles.pricingCurrency}>PKR</span>
                <span className={styles.pricingAmount}>5,000</span>
                <span className={styles.pricingPeriod}>/ student</span>
              </div>

              <div className={styles.modeBadgesRow}>
                <span className={styles.modeBadgeOnsite}>
                  <Building2 size={13} /> On-site (Skardu)
                </span>
                <span className={styles.modeBadgeOnline}>
                  <Video size={13} /> Live Online
                </span>
              </div>

              <ul className={styles.pricingFeaturesList}>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Full 21-Day Masterclass (90 minutes daily)</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>All 4 Pillars: Development, Automation, Sales & Leadership</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Live interactive group Q&A with Saqlain Shah</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Exclusive cohort community & peer networking</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Internship & incubation consideration at NetBots</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => scrollToApply('Group Cohort (PKR 5,000)')}
                className={`${styles.pricingSelectBtn} ${styles.pricingSelectBtnStandard}`}
              >
                Apply for Group Cohort (PKR 5,000)
              </button>
            </motion.div>

            {/* Plan 2: 1-on-1 Mentorship */}
            <motion.div
              className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className={styles.pricingBadgeFeatured}>Premium Founder Track</div>
              <h3 className={styles.pricingPlanTitle}>1-on-1 Founder Mentorship</h3>
              <p className={styles.pricingPlanDesc}>
                Dedicated, high-touch mentorship directly with Saqlain Shah to review your code, validate your startup idea, and launch your business.
              </p>

              <div className={styles.pricingPriceRow}>
                <span className={styles.pricingCurrency}>PKR</span>
                <span className={styles.pricingAmount}>25,000</span>
                <span className={styles.pricingPeriod}>/ founder</span>
              </div>

              <div className={styles.modeBadgesRow}>
                <span className={styles.modeBadgeOnsite} style={{ background: 'rgba(255,255,255,0.1)', color: '#bae6fd', borderColor: 'rgba(255,255,255,0.2)' }}>
                  <Building2 size={13} /> Private On-site (Skardu)
                </span>
                <span className={styles.modeBadgeOnline} style={{ background: 'rgba(255,255,255,0.1)', color: '#bbf7d0', borderColor: 'rgba(255,255,255,0.2)' }}>
                  <Video size={13} /> Private 1-on-1 Video
                </span>
              </div>

              <ul className={styles.pricingFeaturesList}>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Everything in the 21-Day Masterclass</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Personalized 1-on-1 Strategy & Architecture Sessions</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Direct code reviews & product MVP roadmap validation</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Custom client acquisition & high-ticket proposal coaching</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={16} className={styles.pricingCheckIcon} />
                  <span>Direct private WhatsApp advisory during the cohort</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => scrollToApply('1-on-1 Mentorship (PKR 25,000)')}
                className={`${styles.pricingSelectBtn} ${styles.pricingSelectBtnFeatured}`}
              >
                Apply for 1-on-1 Track (PKR 25,000)
              </button>
            </motion.div>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <section className={styles.pillarsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPre}>The 4 Foundational Pillars</span>
            <h2 className={styles.sectionTitle}>The Real Company Playbook</h2>
            <p className={styles.sectionSubtitle}>
              Traditional university degrees teach theoretical problems with predictable answers.
              The Founder Lab gives you the actual, battlefield-tested systems to create value, generate revenue, and build enduring technology.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                className={styles.pillarCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <span className={styles.pillarNumber}>{pillar.number}</span>
                <div className={styles.pillarIconBox}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <span className={styles.pillarAction}>{pillar.action}</span>
                <p className={styles.pillarDesc}>{pillar.desc}</p>

                <ul className={styles.pillarTopics}>
                  {pillar.topics.map((t, i) => (
                    <li key={i} className={styles.pillarTopicItem}>
                      <Check size={14} className={styles.pillarCheck} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* University vs Founder Mindset */}
        <section className={styles.mindsetSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPre}>The Mindset Transformation</span>
            <h2 className={styles.sectionTitle}>Stop Thinking Like an Employee</h2>
            <p className={styles.sectionSubtitle}>
              The tech landscape has evolved. Relying solely on a university degree leaves you vulnerable to layoffs and market saturation.
              Here is how The Founder Lab shifts your trajectory forever.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCardUni}>
              <div className={styles.compHeader} style={{ color: '#475569' }}>
                <GraduationCap size={24} /> Standard University Route
              </div>
              <ul className={styles.compList}>
                {universityVsFounder.map((item, index) => (
                  <li key={index} className={styles.compItem} style={{ color: '#64748b' }}>
                    <span className={styles.crossIcon}>✕</span>
                    <span>{item.uni}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.comparisonCardFounder}>
              <div className={styles.compHeader} style={{ color: '#60a5fa' }}>
                <Sparkles size={24} /> The Founder Lab Experience
              </div>
              <ul className={styles.compList}>
                {universityVsFounder.map((item, index) => (
                  <li key={index} className={styles.compItem}>
                    <CheckCircle size={18} className={styles.checkIconFounder} />
                    <span>{item.founder}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Mentor Section */}
        <section className={styles.mentorSection}>
          <div className={styles.mentorContainer}>
            <div className={styles.mentorImgWrapper}>
              <Image
                src="/images/profileImage-ceo.avif"
                alt="Saqlain Shah - Founder & CEO NetBots"
                width={320}
                height={400}
                className={styles.mentorImage}
              />
            </div>

            <div className={styles.mentorContent}>
              <span className={styles.mentorRoleTag}>Instructor & Mentor</span>
              <h2 className={styles.mentorName}>Saqlain Shah</h2>
              <span className={styles.mentorTitle}>Founder & CEO, NetBots (SMC-Private) Limited</span>

              <p className={styles.mentorBio}>
                Having architected enterprise platforms, secure AI automations, and built NetBots from the ground up in Skardu,
                Saqlain Shah has seen firsthand the disconnect between what universities teach and what building a profitable,
                sustainable technology business actually demands.
              </p>

              <div className={styles.mentorDirectQuote}>
                "I am not here to give you another slide deck or lecture on theory you could read on Wikipedia.
                This masterclass is a raw, behind-the-scenes breakdown of how software companies actually get built, how clients are won,
                and how young technologists can build financial freedom."
              </div>

              <div className={styles.mentorLinks}>
                <a
                  href="https://www.linkedin.com/in/syedsaqlainabbas110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mentorLink}
                >
                  Connect on LinkedIn <ExternalLink size={14} />
                </a>
                <a href="mailto:saqlain@netbots.io" className={styles.mentorLink}>
                  saqlain@netbots.io
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate & Robust Registration Form Section */}
        <section id="apply-now" className={styles.registrationSection}>
          <div className={styles.registrationGrid}>
            {/* Form Info Left */}
            <div className={styles.formInfoColumn}>
              <span className={styles.sectionPre}>Admissions & Registration</span>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                Candidate Application
              </h2>
              <p className={styles.sectionSubtitle} style={{ textAlign: 'left' }}>
                Join an elite group of university students and future founders. We review every application with personal attention.
              </p>

              <div className={styles.infoCardsContainer}>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className={styles.infoCardTitle}>Instant Email Confirmation</h4>
                    <p className={styles.infoCardText}>
                      You will receive an automated confirmation email immediately upon submitting this form with onboarding details.
                    </p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className={styles.infoCardTitle}>90-Minute Daily Masterclass</h4>
                    <p className={styles.infoCardText}>
                      Curated 21-day timeline fitting university schedules. Real-world execution, zero fluff.
                    </p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className={styles.infoCardTitle}>On-site & Online Delivery</h4>
                    <p className={styles.infoCardText}>
                      Attend physically at NetBots Skardu office or join live via interactive video from anywhere.
                    </p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardIcon}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className={styles.infoCardTitle}>Direct Founder Interaction</h4>
                    <p className={styles.infoCardText}>
                      Every student interacts directly with Saqlain Shah. Top performers may receive NetBots internship offers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card Right */}
            <div className={styles.formCard}>
              {isSubmitted ? (
                <div className={styles.successCard}>
                  <div className={styles.successIconBadge}>
                    <CheckCircle size={40} />
                  </div>
                  <h3 className={styles.successTitle}>Application Received!</h3>
                  <p className={styles.successText}>
                    Thank you, <strong>{formData.name}</strong>. Aapki registration successfully register ho chuki hai!
                  </p>

                  <div className={styles.successEmailAlert}>
                    <Mail size={18} style={{ flexShrink: 0 }} />
                    <span>
                      Confirmation email sent to <strong>{formData.email}</strong>. Please check your inbox / spam folder.
                    </span>
                  </div>

                  <div className={styles.successSummaryBox}>
                    <div><strong>Selected Track:</strong> {formData.plan}</div>
                    <div><strong>Attendance Format:</strong> {formData.mode}</div>
                    <div><strong>University:</strong> {formData.university}</div>
                    <div><strong>WhatsApp:</strong> {formData.phone}</div>
                    <div><strong>Focus Areas:</strong> {formData.interests.length > 0 ? formData.interests.join(', ') : 'All pillars'}</div>
                  </div>

                  <a
                    href={`https://wa.me/923475484803?text=Hi%20NetBots%2C%20I%20have%20registered%20for%20The%20Founder%20Lab%20Masterclass%20(${encodeURIComponent(formData.plan)}%20-%20${encodeURIComponent(formData.mode)})%20as%20${encodeURIComponent(formData.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.successActionBtn}
                  >
                    <Phone size={16} /> Fast-track via WhatsApp (+92 347 5484803)
                  </a>
                </div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <div className={styles.formCorporateBadge}>
                      <ShieldCheck size={14} /> Official Registration Portal
                    </div>
                    <h3 className={styles.formTitle}>Candidate Enrollment</h3>
                    <p className={styles.formSubtitle}>
                      Please provide accurate information. A confirmation email will be delivered to your inbox upon submission.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.actualForm}>
                    {/* Honeypot for spam safety */}
                    <input
                      type="text"
                      name="website_url_honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Section 1: Track & Mode */}
                    <div className={styles.formSectionDivider}>
                      <span className={styles.formSectionDividerNum}>1</span>
                      <span className={styles.formSectionDividerTitle}>Track & Delivery Format</span>
                      <div className={styles.formSectionDividerLine} />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>
                        Select Program Track <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <div className={styles.planOptionsGroup}>
                        <div
                          className={`${styles.planOptionCard} ${formData.plan === 'Group Cohort (PKR 5,000)' ? styles.planOptionCardActive : ''}`}
                          onClick={() => setFormData({ ...formData, plan: 'Group Cohort (PKR 5,000)' })}
                        >
                          <div className={styles.planOptionHeader}>
                            <span className={styles.planOptionName}>Group Cohort</span>
                            <span className={styles.planOptionPrice}>PKR 5,000</span>
                          </div>
                          <span className={styles.planOptionSub}>Full 21-Day Cohort & Community</span>
                        </div>

                        <div
                          className={`${styles.planOptionCard} ${formData.plan === '1-on-1 Mentorship (PKR 25,000)' ? styles.planOptionCardActive : ''}`}
                          onClick={() => setFormData({ ...formData, plan: '1-on-1 Mentorship (PKR 25,000)' })}
                        >
                          <div className={styles.planOptionHeader}>
                            <span className={styles.planOptionName}>1-on-1 Mentorship</span>
                            <span className={styles.planOptionPrice}>PKR 25,000</span>
                          </div>
                          <span className={styles.planOptionSub}>Direct 1-on-1 with Saqlain Shah</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>
                        Preferred Attendance Format <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <div className={styles.modePillsGroup}>
                        <div
                          className={`${styles.modePill} ${formData.mode === 'On-site (Skardu Campus)' ? styles.modePillActive : ''}`}
                          onClick={() => setFormData({ ...formData, mode: 'On-site (Skardu Campus)' })}
                        >
                          <Building2 size={16} /> On-site (Skardu Campus)
                        </div>

                        <div
                          className={`${styles.modePill} ${formData.mode === 'Online (Live Virtual Stream)' ? styles.modePillActive : ''}`}
                          onClick={() => setFormData({ ...formData, mode: 'Online (Live Virtual Stream)' })}
                        >
                          <Video size={16} /> Online (Live Stream)
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Contact Information */}
                    <div className={styles.formSectionDivider}>
                      <span className={styles.formSectionDividerNum}>2</span>
                      <span className={styles.formSectionDividerTitle}>Candidate Details</span>
                      <div className={styles.formSectionDividerLine} />
                    </div>

                    <div className={styles.formRowDouble}>
                      <div className={styles.formField}>
                        <label className={styles.label}>
                          Full Name <span className={styles.requiredAsterisk}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Muhammad Ali"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formField}>
                        <label className={styles.label}>
                          Email Address <span className={styles.requiredAsterisk}>*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="ali@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formRowDouble}>
                      <div className={styles.formField}>
                        <label className={styles.label}>
                          WhatsApp / Phone Number <span className={styles.requiredAsterisk}>*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+92 347 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formField}>
                        <label className={styles.label}>
                          University / Institution <span className={styles.requiredAsterisk}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. KIU Skardu, NUST, FAST"
                          value={formData.university}
                          onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formRowDouble}>
                      <div className={styles.formField}>
                        <label className={styles.label}>Degree / Major</label>
                        <input
                          type="text"
                          placeholder="e.g. BS Computer Science, SE, BBA"
                          value={formData.major}
                          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formField}>
                        <label className={styles.label}>Current Semester / Stage</label>
                        <select
                          value={formData.stage}
                          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                          className={styles.select}
                        >
                          <option value="">Select your semester</option>
                          <option value="1st - 2nd Semester (Freshman)">1st - 2nd Semester (Freshman)</option>
                          <option value="3rd - 4th Semester (Sophomore)">3rd - 4th Semester (Sophomore)</option>
                          <option value="5th - 6th Semester (Junior)">5th - 6th Semester (Junior)</option>
                          <option value="7th - 8th Semester (Senior/Final Year)">7th - 8th Semester (Senior/Final Year)</option>
                          <option value="Recent Graduate / Independent Explorer">Recent Graduate / Independent Explorer</option>
                        </select>
                      </div>
                    </div>

                    {/* Section 3: Learning Focus */}
                    <div className={styles.formSectionDivider}>
                      <span className={styles.formSectionDividerNum}>3</span>
                      <span className={styles.formSectionDividerTitle}>What Do You Want to Learn Most?</span>
                      <div className={styles.formSectionDividerLine} />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>
                        Select Priority Learning Areas (Choose all that apply)
                      </label>
                      <div className={styles.interestsGrid}>
                        {availableLearningInterests.map((interest) => {
                          const isSelected = formData.interests.includes(interest);
                          return (
                            <div
                              key={interest}
                              className={`${styles.interestPill} ${isSelected ? styles.interestPillActive : ''}`}
                              onClick={() => toggleInterest(interest)}
                            >
                              <div className={styles.interestCheckbox}>
                                {isSelected && <Check size={12} />}
                              </div>
                              <span>{interest}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 4: Motivation */}
                    <div className={styles.formSectionDivider}>
                      <span className={styles.formSectionDividerNum}>4</span>
                      <span className={styles.formSectionDividerTitle}>Founder Statement</span>
                      <div className={styles.formSectionDividerLine} />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.label}>
                        Why do you want to join The Founder Lab? <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <textarea
                        required
                        placeholder="Tell us about yourself, project ideas you want to build, challenges you are facing, or why you want to think like a founder..."
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        className={styles.textarea}
                      />
                    </div>

                    {errorMsg && (
                      <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600 }}>
                        {errorMsg}
                      </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                      {isSubmitting ? (
                        'Processing Application...'
                      ) : (
                        <>
                          <Send size={18} /> Submit Registration & Receive Email
                        </>
                      )}
                    </button>

                    <p className={styles.formDisclaimer}>
                      ✓ An automatic confirmation email with onboarding details will be sent to your inbox immediately.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Poster Lightbox Modal */}
      <AnimatePresence>
        {isPosterModalOpen && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPosterModalOpen(false)}
          >
            <motion.div
              className={styles.modalBox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>The Founder Lab - Official Masterclass Poster</span>
                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(false)}
                  className={styles.modalCloseBtn}
                  aria-label="Close poster preview"
                >
                  <X size={20} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <Image
                  src="/images/founder-lab/the-founder-lab-poster.avif"
                  alt="The Founder Lab 21-Day Masterclass Poster"
                  width={900}
                  height={900}
                  className={styles.modalPosterImg}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
