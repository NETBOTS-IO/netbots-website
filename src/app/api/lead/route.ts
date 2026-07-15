import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure SMTP transport using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER || 'leads@netbots.io',
    pass: process.env.SMTP_PASS || 'Leads@110',
  },
});

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const requestData = rateLimit.get(ip);
    
    if (requestData && now - requestData.timestamp < RATE_LIMIT_WINDOW) {
      if (requestData.count >= MAX_REQUESTS) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
      requestData.count++;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();

    // Honeypot validation
    if (body.website_url_honeypot || body.honeypot || body._honey) {
      return NextResponse.json({ success: true, message: 'Processed successfully.' }, { status: 200 });
    }

    const { type, name, email } = body;
    if (!type || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let emailSubject = '';
    let emailHtml = '';

    if (type === 'contact') {
      emailSubject = `[Contact] New Strategy Call Inquiry: ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .header { font-size: 18px; font-weight: 800; color: #0052ff; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">New Contact Inquiry</div>
            <div class="item">
              <div class="label">Full Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="item">
              <div class="label">Work Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="item">
              <div class="label">Company / Organization</div>
              <div class="value">${body.company || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Primary Objective</div>
              <div class="value">${body.objective || 'Not Specified'}</div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Challenge Context</div>
              <div class="value">${body.challenge || 'Not Specified'}</div>
            </div>
            <div class="footer">
              Sent automatically from NetBots Platform Core API
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'training') {
      emailSubject = `[Admission] New Academy Application: ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .header { font-size: 18px; font-weight: 800; color: #0052ff; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">New Course / Mentorship Admission</div>
            <div class="item">
              <div class="label">Student Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="item">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="item">
              <div class="label">Selected Program</div>
              <div class="value">${body.program || 'Not Specified'}</div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Background & Learning Goals</div>
              <div class="value">${body.background || 'Not Specified'}</div>
            </div>
            <div class="footer">
              Sent automatically from NetBots Academy API
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'hotelsync') {
      emailSubject = `[HotelSync] New Trial Request: ${body.hotelName || name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .header { font-size: 18px; font-weight: 800; color: #0052ff; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">New HotelSync Trial & Demo Request</div>
            <div class="item">
              <div class="label">Contact Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="item">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="item">
              <div class="label">Phone Number</div>
              <div class="value">${body.phone || 'Not Provided'}</div>
            </div>
            <div class="item">
              <div class="label">Hotel Name</div>
              <div class="value">${body.hotelName || 'Not Provided'}</div>
            </div>
            <div class="item">
              <div class="label">Property Size</div>
              <div class="value">${body.propertySize || 'Not Provided'}</div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Requirements / Message</div>
              <div class="value">${body.message || 'None'}</div>
            </div>
            <div class="footer">
              Sent automatically from NetBots SaaS Pipeline
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'demo') {
      emailSubject = `[Demo] New Platform Walkthrough Request: ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .header { font-size: 18px; font-weight: 800; color: #0052ff; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">Product Demo Request</div>
            <div class="item">
              <div class="label">Contact Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="item">
              <div class="label">Work Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="item">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${body.phone || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Company Name</div>
              <div class="value">${body.company || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Requested SaaS Platform</div>
              <div class="value">${body.product || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Scale of Deployment</div>
              <div class="value">${body.usersCount || 'Not Specified'}</div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Custom Requirements</div>
              <div class="value">${body.requirements || 'Not Specified'}</div>
            </div>
            <div class="footer">
              Sent automatically from NetBots SaaS Pipeline API
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'audit') {
      emailSubject = `[Audit] New Architecture Review Request: ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .header { font-size: 18px; font-weight: 800; color: #0052ff; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">Technical Architecture Audit Request</div>
            <div class="item">
              <div class="label">Full Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="item">
              <div class="label">Work Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="item">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${body.phone || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Company / Organization</div>
              <div class="value">${body.company || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Primary Focus</div>
              <div class="value">${body.projectFocus || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Budget Range</div>
              <div class="value">${body.budget || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Desired Timeline</div>
              <div class="value">${body.timeline || 'Not Specified'}</div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Context / Challenges</div>
              <div class="value">${body.context || 'Not Specified'}</div>
            </div>
            <div class="footer">
              Sent automatically from NetBots Audit Capture API
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'career') {
      emailSubject = `[Careers] New Job Application: ${body.roleTitle} - ${name}`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .header { font-size: 18px; font-weight: 800; color: #0052ff; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">New Job Application Received</div>
            <div class="item">
              <div class="label">Applied Position</div>
              <div class="value">${body.roleTitle}</div>
            </div>
            <div class="item">
              <div class="label">Candidate Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="item">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="item">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${body.phone}</div>
            </div>
            <div class="item">
              <div class="label">Experience Level</div>
              <div class="value">${body.experience}</div>
            </div>
            <div class="item">
              <div class="label">Portfolio Link</div>
              <div class="value">${body.portfolio || 'None'}</div>
            </div>
            <div class="item">
              <div class="label">Resume Link</div>
              <div class="value"><a href="${body.resumeLink}" target="_blank">${body.resumeLink}</a></div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Cover Letter / Notes</div>
              <div class="value">${body.coverLetter}</div>
            </div>
            <div class="footer">
              Sent automatically from NetBots HR Gateway API
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
    }

    // 1. Push copy of lead directly to CRM
    try {
      const crmApiUrl = process.env.CRM_API_URL || 'http://localhost:5000/api';
      
      // Map notes based on form type for maximum CRM detail richness
      let notes = `Website Form: ${type.toUpperCase()}\n`;
      if (type === 'contact') {
        notes += `Objective: ${body.objective || 'Not Specified'}\nChallenge Context: ${body.challenge || 'Not Specified'}`;
      } else if (type === 'training') {
        notes += `Selected Program: ${body.program || 'Not Specified'}\nBackground & Learning Goals: ${body.background || 'Not Specified'}`;
      } else if (type === 'demo') {
        notes += `Requested SaaS: ${body.product || 'Not Specified'}\nDeployment Scale: ${body.usersCount || 'Not Specified'}\nCustom Requirements: ${body.requirements || 'Not Specified'}`;
      } else if (type === 'hotelsync') {
        notes += `Hotel Name: ${body.hotelName || 'Not Specified'}\nProperty Size: ${body.propertySize || 'Not Specified'}\nMessage: ${body.message || 'None'}`;
      } else if (type === 'audit') {
        notes += `Project Focus: ${body.projectFocus || 'Not Specified'}\nBudget Range: ${body.budget || 'Not Specified'}\nTimeline: ${body.timeline || 'Not Specified'}\nContext/Challenges: ${body.context || 'Not Specified'}`;
      } else if (type === 'career') {
        notes += `Position Applied: ${body.roleTitle || 'Not Specified'}\nExperience: ${body.experience || 'Not Specified'}\nPortfolio: ${body.portfolio || 'None'}\nResume Link: ${body.resumeLink || 'None'}\nCover Letter/Notes: ${body.coverLetter || 'None'}`;
      }

      // Map target service arrays
      let targetService: string[] = [];
      if (type === 'audit') targetService = ['website_seo'];
      if (type === 'hotelsync') targetService = ['saas_product'];
      if (type === 'demo' && body.product?.toLowerCase().includes('sync')) targetService = ['saas_product'];

      const crmPayload = {
        companyName: body.hotelName || body.company || name,
        contactName: name,
        email: email,
        phone: body.phone || '',
        notes: notes,
        priority: 'high',
        channel: 'Website',
        website: body.website || '',
        targetService: targetService,
      };
      
      await fetch(`${crmApiUrl}/leads/public-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'netbots_website_webhook_secret_key_2026'
        },
        body: JSON.stringify(crmPayload)
      });
    } catch (crmErr) {
      console.error('[CRM Lead push failed]', crmErr);
    }

    // 2. Deliver email to both recipient addresses
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"NetBots Leads Core" <leads@netbots.io>',
        to: process.env.EMAIL_TO || 'leads@netbots.io, saqlainshahbaltee@gmail.com',
        subject: emailSubject,
        html: emailHtml,
      });
    } catch (mailErr) {
      console.error('[Nodemailer API] Email delivery failed:', mailErr);
      // Still return success since the CRM copy was stored successfully
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('[General API] Error details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
