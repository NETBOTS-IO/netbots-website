import { COMPANY_NAME, COMPANY_LEGAL_NAME, COMPANY_DESCRIPTION, OFFICE_ADDRESS, TECH_STACK, SERVICES, PRODUCTS } from '@/lib/constants/services';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    organization: {
      name: COMPANY_NAME,
      legalName: COMPANY_LEGAL_NAME,
      description: COMPANY_DESCRIPTION,
      location: OFFICE_ADDRESS,
    },
    services: SERVICES,
    technologyStack: TECH_STACK,
    products: PRODUCTS,
  };

  return NextResponse.json(data);
}
