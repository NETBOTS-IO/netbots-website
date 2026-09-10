// Used by getPostSlugs() and sitemap.ts for accurate per-post lastModified dates
export interface PostSlugEntry {
  slug: string;
  _updatedAt: string;
  publishedAt: string;
}

export interface SanityAuthor {
  _id?: string;
  name: string;
  role?: string;
  image?: any;
  avatar?: any;
  avatarUrl?: string;
  bio?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface SanityCategory {
  _id?: string;
  title: string;
  slug?: { current: string };
  description?: string;
}

export interface YouTubeValue {
  _type: 'youtube';
  url: string;
  title?: string;
  caption?: string;
}

export interface ImageValue {
  _type: 'image';
  asset: any;
  alt?: string;
  caption?: string;
}

// ─────────────────────────────────────────────────────────────────
// E-E-A-T Interfaces
// ─────────────────────────────────────────────────────────────────

/** E-E-A-T: Expertise — Technical reviewer or fact-checker */
export interface EEATReviewer {
  name: string;
  role?: string;
  bio?: string;
  credentials?: string;
  linkedIn?: string;
  avatarUrl?: string;
}

/** E-E-A-T: Authoritativeness — Authoritative external citation */
export interface EEATCitation {
  title: string;
  url: string;
  publisher?: string;
  year?: string;
}

/** E-E-A-T: Trustworthiness — FAQ item for FAQPage schema */
export interface EEATFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string } | string;
  publishedAt: string;
  lastReviewedAt?: string;       // E-E-A-T: Trustworthiness — content freshness
  excerpt: string;
  mainImage?: any;
  mainImageUrl?: string;
  author: SanityAuthor;
  category: string;
  tags?: string[];
  estimatedReadTime?: string;
  featured?: boolean;
  body: any[]; // PortableText blocks
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  // E-E-A-T fields
  keyTakeaways?: string[];        // Experience — TL;DR bullet points
  experienceHighlight?: string;   // Experience — first-hand case-study highlight
  reviewedBy?: EEATReviewer;      // Expertise — technical reviewer
  citations?: EEATCitation[];     // Authoritativeness — authoritative sources
  faqs?: EEATFAQ[];               // Trustworthiness — FAQ structured data
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
