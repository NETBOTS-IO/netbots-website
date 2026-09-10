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

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string } | string;
  publishedAt: string;
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
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}
