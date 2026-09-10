import React from 'react';

export interface ComparisonFeature {
  name: string;
  ourProduct: string | boolean;
  competitor: string | boolean;
}

interface ComparisonTableProps {
  title: string;
  description?: string;
  ourProductName: string;
  competitorName: string;
  features: ComparisonFeature[];
}

/**
 * AEO/GEO Optimized Comparison Table
 * 
 * Tables are heavily favored by Answer Engines (Featured Snippets) and 
 * Generative Engines (ChatGPT, Perplexity) when users ask "X vs Y" queries.
 * This component uses semantic HTML <table> markup for maximum extractability.
 */
export function ComparisonTable({
  title,
  description,
  ourProductName,
  competitorName,
  features
}: ComparisonTableProps) {
  
  const renderValue = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Yes</span>
      ) : (
        <span style={{ color: '#dc2626', fontWeight: 'bold' }}>✗ No</span>
      );
    }
    return val;
  };

  return (
    <div style={{ margin: '3rem 0' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
        {title}
      </h2>
      {description && (
        <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {description}
        </p>
      )}

      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#334155', width: '40%' }}>
                Feature / Capability
              </th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 800, color: '#0052ff', width: '30%' }}>
                {ourProductName}
              </th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#64748b', width: '30%' }}>
                {competitorName}
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#1e293b' }}>
                  {feature.name}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#0f172a' }}>
                  {renderValue(feature.ourProduct)}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>
                  {renderValue(feature.competitor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
