export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconType: 'star' | 'ring' | 'cluster' | 'cylinder';
  href: string;
  tech?: string;
  businessImpact?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SuccessStory {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Partner {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  readTime: string;
  link: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  target: string;
  cta: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const navigation = {
  header: [
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ],
  footer: [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Training & Academy', href: '/training' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Web Architecture', href: '/services#web-architecture' },
        { label: 'AI Integration', href: '/services#ai-integration' },
        { label: 'Digital Marketing', href: '/services#digital-marketing' },
        { label: 'Secure DevOps', href: '/services#secure-devops' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Accounta', href: '/products#accounta' },
        { label: 'Hotel Sync', href: '/products#hotel-sync' },
        { label: 'E-Pharma', href: '/products#e-pharma' },
        { label: 'G-Map Scraper', href: '/products#gmap-scraper' },
        { label: 'CMS Care', href: '/products#clinical-system' },
      ],
    },
  ],
};

export const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Enterprise Web Architecture',
    description:
      'Built on the MERN stack and Next.js for sub-second load times and SEO-first architecture.',
    iconType: 'star',
    href: '/services#web-architecture',
    tech: 'React, Next.js, Node.js, Express, MongoDB',
    businessImpact:
      'Higher search rankings, zero user drop-off from lag, and a UI/UX built to convert.',
  },
  {
    id: '02',
    title: 'Applied Artificial Intelligence',
    description:
      'Local-first AI models and autonomous agents that process sensitive data securely, without compromising your privacy.',
    iconType: 'ring',
    href: '/services#ai-integration',
    tech: 'LLM APIs, agentic workflows, local-first models, RAG',
    businessImpact:
      'Drastic reduction in operational overhead; your business runs 24/7 on real-time, data-driven decisions.',
  },
  {
    id: '03',
    title: 'Strategic Digital Marketing',
    description:
      'Data-backed SEO and paid campaigns engineered for aggressive, sustainable market capture.',
    iconType: 'cluster',
    href: '/services#digital-marketing',
    tech: 'SEO, PPC, CRO, Analytics',
    businessImpact:
      'A predictable, scalable pipeline of qualified leads and a dominant digital footprint.',
  },
  {
    id: '04',
    title: 'Secure Infrastructure & DevOps',
    description:
      'Seamless SSL deployment, isolated container environments, robust database management for maximum uptime.',
    iconType: 'cylinder',
    href: '/services#secure-devops',
    tech: 'Docker, Nginx, Linux Security',
    businessImpact:
      'Maximum uptime, hardened data security, seamless scaling during traffic spikes.',
  },
];

export const stats: StatItem[] = [
  { value: '50+', label: 'Systems Architected' },
  { value: '3', label: 'Industries Served' },
  { value: '24/7', label: 'Automated Operations' },
  { value: '4-12', label: 'Week Delivery' },
];

export const successStories: SuccessStory[] = [
  {
    id: 'story-1',
    category: 'Finance & Operations',
    title:
      'Automating financial reconciliation for growing SMEs with Accounta',
    description:
      'Built a comprehensive financial intelligence platform that reduced monthly close time and eliminated manual data entry across multi-currency operations.',
    tags: ['SaaS', 'Finance', 'Automation'],
    link: '/case-studies',
  },
  {
    id: 'story-2',
    category: 'Hospitality & Tourism',
    title:
      'Unifying hotel operations into a single command center with Hotel Sync',
    description:
      'Designed a responsive dashboard unifying front desk, housekeeping, and global booking engines for hotels and regional tourism boards.',
    tags: ['Dashboard', 'Hospitality', 'Integration'],
    link: '/case-studies',
  },
  {
    id: 'story-3',
    category: 'Healthcare & Pharmacy',
    title:
      'Securing clinical POS and inventory management for pharmacies with E-Pharma',
    description:
      'Implemented batch- and expiry-level inventory tracking, automated supplier reordering, and secure patient prescription records.',
    tags: ['Healthcare', 'POS', 'Compliance'],
    link: '/case-studies',
  },
];

export const featuredReport = {
  tag: 'THE NETBOTS APPROACH',
  title:
    'Technology That Adapts to You, Not the Other Way Around',
  description:
    'Using modern frameworks, containerized deployments, and agentic AI workflows, we architect bespoke systems that absorb the operational load, so you get your time back and your business gets its momentum back.',
  buttonText: 'Book Your Free Architecture Audit',
  link: '/contact',
};

export const cSuiteBook = {
  subtitle: 'FREE TECHNICAL AUDIT',
  title: 'Ready to Architect Your Next Phase of Growth?',
  description:
    "Book a free, no-obligation technical audit. We'll map your current stack, flag the leaks, and show you exactly where automation and better architecture will pay for itself.",
  buttonText: 'Book Your Free Architecture Audit',
  link: '/contact',
};

export const partners: Partner[] = [
  { id: 'p1', name: 'Finance & SMEs' },
  { id: 'p2', name: 'Hospitality' },
  { id: 'p3', name: 'Healthcare' },
  { id: 'p4', name: 'MERN Stack' },
  { id: 'p5', name: 'Next.js' },
  { id: 'p6', name: 'Docker' },
  { id: 'p7', name: 'AI Agents' },
  { id: 'p8', name: 'Local-First AI' },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    category: 'AI ENGINEERING',
    title: 'Why Local-First AI Deployment Matters for Data-Sensitive Industries',
    readTime: '4 MIN READ',
    link: '/faq',
  },
  {
    id: 'post-2',
    category: 'WEB ARCHITECTURE',
    title: 'MERN Stack vs. Monolith: When Microservices Make Financial Sense',
    readTime: '5 MIN READ',
    link: '/services',
  },
  {
    id: 'post-3',
    category: 'GROWTH',
    title: 'How Automated Workflows Freed 40 Hours per Week for an SME Finance Team',
    readTime: '3 MIN READ',
    link: '/case-studies',
  },
];

export const products: Product[] = [
  {
    id: 'hotel-sync',
    name: 'Hotel Sync',
    tagline: 'Tourism & Hospitality Command Center',
    description:
      'Unifies front desk, housekeeping, and global booking engines into one responsive dashboard.',
    target: 'Hotels, resorts, regional tourism boards.',
    cta: 'Explore Platform',
    href: '/products/hotel-sync',
  },
  {
    id: 'accounta',
    name: 'Accounta',
    tagline: 'Advanced Financial Intelligence',
    description:
      'Automated reconciliation, multi-currency reporting, and tax compliance, with predictive analytics for real-time cash flow visibility.',
    target: 'SMEs and enterprise finance teams.',
    cta: 'Request a Demo',
    href: '/contact',
  },
  {
    id: 'e-pharma',
    name: 'E-Pharma',
    tagline: 'Secure Clinical POS & Inventory',
    description:
      'Batch- and expiry-level inventory tracking, automated supplier reordering, secure patient prescription records.',
    target: 'Clinics, pharmacies, healthcare providers.',
    cta: 'Request a Demo',
    href: '/contact',
  },
  {
    id: 'gmap-scraper',
    name: 'G-Map Scraper',
    tagline: 'High-Speed Business Lead Generation',
    description:
      'Extracts verified B2B leads, contact numbers, ratings, and business profiles directly from Google Maps at scale.',
    target: 'Marketing teams, agencies, sales departments.',
    cta: 'Request a Demo',
    href: '/contact',
  },
  {
    id: 'clinical-system',
    name: 'CMS Care',
    tagline: 'Patient Care & Electronic Records',
    description:
      'Streamlines patient scheduling, encrypted health histories, diagnostics logging, and billing in one secure dashboard.',
    target: 'Hospitals, clinics, private practitioners.',
    cta: 'Request a Demo',
    href: '/contact',
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'What industries does NetBots specialize in?',
    answer:
      'NetBots primarily serves finance/SME operations, hospitality and tourism, and healthcare/pharmacy sectors, alongside general enterprise web and AI engineering across other industries.',
  },
  {
    question: "What makes NetBots' AI approach different?",
    answer:
      'We prioritize local-first, privacy-preserving AI deployment, meaning sensitive client data can be processed without being routed through third-party model providers, which matters most for finance and healthcare clients.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects are delivered within 4-12 weeks depending on scope and complexity. We provide a detailed timeline estimate during your free architecture audit.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. We offer dedicated post-launch support packages including bug fixes, performance monitoring, feature iterations, and 24/7 uptime guarantees for mission-critical systems.',
  },
  {
    question: 'What is the NetBots Free Architecture Audit?',
    answer:
      "A no-obligation technical review where our architects assess your current systems, identify inefficiencies, and recommend a scoped path forward, before you commit to anything.",
  },
  {
    question:
      'Where is NetBots located, and do you work with international clients?',
    answer:
      'NetBots is headquartered in Skardu, Gilgit-Baltistan, Pakistan, and serves clients globally via remote-first delivery.',
  },
  {
    question:
      'Do you offer local-first / on-premise AI deployment for data-sensitive industries?',
    answer:
      'Yes. Our AI implementations can run entirely on your infrastructure, so no data leaves your environment unless you explicitly choose to use external APIs.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'Our core stack includes React, Next.js, Node.js, MongoDB (MERN), Docker, Nginx, and various LLM/AI frameworks. We select the best tools for each project rather than forcing a one-size-fits-all approach.',
  },
  {
    question: 'Can you work with our existing systems?',
    answer:
      'Absolutely. We specialize in integrating with and modernizing existing infrastructure, not ripping and replacing. Our microservices approach means new capabilities can be layered on top of what you already have.',
  },
  {
    question: 'How do you handle data security and compliance?',
    answer:
      'We prioritize data sovereignty with secure environments, Linux-based server protocols, and local-first AI implementations. Your proprietary data stays yours, never routed through third-party providers unless you choose to.',
  },
];

export const companyInfo = {
  name: 'Net Bots (SMC-Private) Limited',
  email: 'info@netbots.io',
  phone: '+92 343 3757372',
  address:
    '2nd Floor, Shah Plaza, Opp. Pakeeza Bakers, Near Karasmathang Chowk, Skardu',
  tagline:
    'Engineering digital infrastructure from Gilgit-Baltistan to global markets.',
};
