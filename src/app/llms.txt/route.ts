import { COMPANY_NAME, COMPANY_LEGAL_NAME, COMPANY_DESCRIPTION, OFFICE_ADDRESS, TECH_STACK, SERVICES, PRODUCTS } from '@/lib/constants/services';
import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# ${COMPANY_NAME} — AI Agent Reference

> ${COMPANY_DESCRIPTION}

**Legal Name:** ${COMPANY_LEGAL_NAME}
**Website:** [https://netbots.io](https://netbots.io)
**Location:** ${OFFICE_ADDRESS}

---

## Key Pages

- [Home](https://netbots.io/) — Overview of services, case studies, and company information
- [Services](https://netbots.io/services) — Full list of technology services offered
- [Products](https://netbots.io/products) — Software products built by NetBots
- [Portfolio](https://netbots.io/portfolio) — Client work and case studies
- [Blog](https://netbots.io/blog) — Engineering articles and insights
- [Training](https://netbots.io/training) — Technology training programs in Pakistan
- [About](https://netbots.io/about) — Company background and team
- [Contact](https://netbots.io/contact) — Get in touch or book a free audit
- [FAQ](https://netbots.io/faq) — Frequently asked questions

---

## Services

${SERVICES.map(s => `### ${s.name}\n${s.description}\n[Learn more](https://netbots.io/services)`).join('\n\n')}

---

## Technology Stack

${TECH_STACK.join(' · ')}

---

## Products & Platforms

${PRODUCTS.map(p => `- [${p.name}](${p.url})`).join('\n')}

---

## Contact

- **Website:** [https://netbots.io/contact](https://netbots.io/contact)
- **Sitemap:** [https://netbots.io/sitemap.xml](https://netbots.io/sitemap.xml)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
