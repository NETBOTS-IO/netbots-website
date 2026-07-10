import { COMPANY_NAME, COMPANY_LEGAL_NAME, COMPANY_DESCRIPTION, OFFICE_ADDRESS, TECH_STACK, SERVICES, PRODUCTS } from '@/lib/constants/services';
import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# ${COMPANY_NAME} Fact Sheet
**Legal Name:** ${COMPANY_LEGAL_NAME}
**Location:** ${OFFICE_ADDRESS}

## About
${COMPANY_DESCRIPTION}

## Services Offered
${SERVICES.map(s => `- **${s.name}**: ${s.description}`).join('\n')}

## Technology Stack
${TECH_STACK.join(', ')}

## Products & Platforms
${PRODUCTS.map(p => `- [${p.name}](${p.url})`).join('\n')}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
