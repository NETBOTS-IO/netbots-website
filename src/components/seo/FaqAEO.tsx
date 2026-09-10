import React from 'react';

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional detailed HTML/JSX that follows the 40-60 word direct answer */
  details?: React.ReactNode;
}

interface FaqAEOProps {
  title?: string;
  faqs: FaqItem[];
  className?: string;
}

/**
 * Answer Engine Optimization (AEO) FAQ Component
 * 
 * Specifically designed to capture Google Featured Snippets and "People Also Ask".
 * Structure:
 * - H2/H3 for the Question.
 * - Immediate <p> tag with a 40-60 word direct answer.
 * - Followed by supporting details (lists, tables, paragraphs) if provided.
 * - Auto-injects FAQPage JSON-LD.
 */
export function FaqAEO({ title = "Frequently Asked Questions", faqs, className = "" }: FaqAEOProps) {
  if (!faqs || faqs.length === 0) return null;

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer, // Just the plain text direct answer for JSON-LD
      },
    })),
  };

  return (
    <div className={`faq-aeo-section ${className}`} style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', color: '#0f172a' }}>
        {title}
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            itemScope 
            itemProp="mainEntity" 
            itemType="https://schema.org/Question"
            style={{ 
              padding: '1.5rem', 
              borderRadius: '12px', 
              backgroundColor: '#f8fafc', 
              border: '1px solid #e2e8f0' 
            }}
          >
            <h3 
              itemProp="name" 
              style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0f172a' }}
            >
              {faq.question}
            </h3>
            
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p 
                itemProp="text" 
                style={{ 
                  fontSize: '1rem', 
                  lineHeight: 1.6, 
                  color: '#334155', 
                  fontWeight: 500,
                  marginBottom: faq.details ? '1rem' : '0'
                }}
              >
                {faq.answer}
              </p>
              
              {faq.details && (
                <div style={{ color: '#475569', lineHeight: 1.6, marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  {faq.details}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
