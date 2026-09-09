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
    } else if (type === 'founder-lab') {
      const interestsStr = Array.isArray(body.interests)
        ? body.interests.join(', ')
        : (body.interests || 'None selected');

      emailSubject = `[The Founder Lab] Application: ${name} (${body.plan || 'PKR 5,000'} - ${body.mode || 'Online/On-site'})`;
      emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #1e293b; }
            .card { background: #ffffff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid #0052ff; }
            .badge { display: inline-block; background: #eff6ff; color: #0052ff; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px; text-transform: uppercase; }
            .header { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
            .item { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; letter-spacing: 0.05em; }
            .value { font-size: 15px; color: #0f172a; line-height: 1.5; font-weight: 500; }
            .highlight-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
            .highlight-title { font-size: 12px; font-weight: 800; color: #166534; text-transform: uppercase; }
            .highlight-val { font-size: 16px; font-weight: 800; color: #15803d; }
            .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">The Founder Lab • 21-Day Masterclass</div>
            <div class="header">New Candidate Application Received</div>

            <div class="highlight-box">
              <div class="highlight-title">Track & Pricing Selected</div>
              <div class="highlight-val">${body.plan || 'Group Cohort (PKR 5,000)'}</div>
              <div style="font-size: 13px; color: #166534; margin-top: 4px;"><strong>Attendance Mode:</strong> ${body.mode || 'Online / On-site'}</div>
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
              <div class="label">WhatsApp / Phone Number</div>
              <div class="value">${body.phone || 'Not Provided'}</div>
            </div>
            <div class="item">
              <div class="label">University / Institution</div>
              <div class="value">${body.university || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Major / Field of Study</div>
              <div class="value">${body.major || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Current Semester / Stage</div>
              <div class="value">${body.stage || 'Not Specified'}</div>
            </div>
            <div class="item">
              <div class="label">Primary Learning Focus (What they want to learn most)</div>
              <div class="value" style="color: #0052ff; font-weight: 700;">${interestsStr}</div>
            </div>
            <div class="item" style="border: none;">
              <div class="label">Why Join The Founder Lab (Motivation & Project Vision)</div>
              <div class="value">${body.motivation || body.notes || 'Not Provided'}</div>
            </div>
            <div class="footer">
              Sent automatically from The Founder Lab Masterclass Portal
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
      } else if (type === 'founder-lab') {
        const interestsStr = Array.isArray(body.interests) ? body.interests.join(', ') : (body.interests || 'None');
        notes += `Program: The Founder Lab (21-Day Masterclass)\nPlan: ${body.plan || 'PKR 5,000'}\nMode: ${body.mode || 'Online/On-site'}\nInterests: ${interestsStr}\nUniversity: ${body.university || 'Not Specified'}\nMajor: ${body.major || 'Not Specified'}\nStage: ${body.stage || 'Not Specified'}\nMotivation: ${body.motivation || 'Not Provided'}`;
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
      if (type === 'founder-lab') targetService = ['training_masterclass'];
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

    // 3. Send confirmation email directly to the student for The Founder Lab
    if (type === 'founder-lab' && email) {
      try {
        const interestsFormatted = Array.isArray(body.interests) && body.interests.length > 0
          ? body.interests.join(', ')
          : (body.interests || 'Full Curriculum Overview');

        const studentSubject = `Registration Received: The Founder Lab (21-Day Masterclass) | NetBots`;
        const studentHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
              .header { background: #0052ff; padding: 36px 28px; text-align: center; color: #ffffff; }
              .header-badge { display: inline-block; background: rgba(255,255,255,0.2); color: #ffffff; font-weight: 700; font-size: 11px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
              .header h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 900; letter-spacing: -0.03em; }
              .header p { margin: 0; font-size: 13px; opacity: 0.9; font-weight: 600; }
              .content { padding: 32px 28px; font-size: 15px; line-height: 1.6; color: #334155; }
              .greeting { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
              .success-banner { background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 16px 20px; margin: 20px 0; }
              .success-banner-title { font-size: 13px; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
              .success-banner-text { font-size: 14px; color: #047857; margin: 0; line-height: 1.5; }
              .card-info { width: 100%; border-collapse: collapse; margin: 24px 0; background: #f8fafc; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
              .card-info td { padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
              .card-info tr:last-child td { border-bottom: none; }
              .info-label { font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 11px; width: 40%; letter-spacing: 0.05em; }
              .info-val { font-weight: 700; color: #0f172a; }
              .next-steps-card { background: #eff6ff; border-left: 4px solid #0052ff; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 24px 0; }
              .next-steps-title { font-weight: 800; color: #0052ff; font-size: 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
              .next-steps-list { margin: 0; padding-left: 18px; font-size: 13.5px; color: #334155; }
              .next-steps-list li { margin-bottom: 6px; }
              .whatsapp-btn { display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 14px; margin-top: 14px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25); }
              .founder-note { margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; }
              .founder-name { font-weight: 800; color: #0f172a; font-size: 15px; }
              .founder-title { color: #64748b; font-size: 13px; }
              .footer { background: #f8fafc; padding: 20px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; line-height: 1.5; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-badge">NetBots (SMC-Private) Limited</div>
                <h1>THE FOUNDER LAB</h1>
                <p>21-DAY MASTERCLASS • BUILD THE COMPANY. NOT JUST THE RESUME.</p>
              </div>

              <div class="content">
                <div class="greeting">Assalam-o-Alaikum ${name},</div>
                <p>
                  Aapki <strong>The Founder Lab: 21-Day Masterclass</strong> ki registration successfully receive ho chuki hai!
                </p>

                <div class="success-banner">
                  <div class="success-banner-title">✓ Registration Confirmed & Under Review</div>
                  <p class="success-banner-text">
                    Aapka application data hamaray record mai safe hai. Saqlain Shah aur NetBots admissions team aapki application ko review kar rahi hai, aur aapko jald WhatsApp / Call par contact karein gy.
                  </p>
                </div>

                <table class="card-info">
                  <tr>
                    <td class="info-label">Candidate Name</td>
                    <td class="info-val">${name}</td>
                  </tr>
                  <tr>
                    <td class="info-label">Selected Track</td>
                    <td class="info-val" style="color: #0052ff;">${body.plan || 'Group Cohort (PKR 5,000)'}</td>
                  </tr>
                  <tr>
                    <td class="info-label">Attendance Mode</td>
                    <td class="info-val">${body.mode || 'Online / On-site'}</td>
                  </tr>
                  <tr>
                    <td class="info-label">University / College</td>
                    <td class="info-val">${body.university || 'Not Specified'}</td>
                  </tr>
                  <tr>
                    <td class="info-label">Focus Areas</td>
                    <td class="info-val">${interestsFormatted}</td>
                  </tr>
                </table>

                <div class="next-steps-card">
                  <div class="next-steps-title">What Happens Next:</div>
                  <ul class="next-steps-list">
                    <li>Hamari admissions team aap se WhatsApp / Phone par onboarding aur cohort schedule discuss kare gi.</li>
                    <li>Fee payment details (Bank Transfer, JazzCash, EasyPaisa) share ki jayein gi.</li>
                    <li>Agar aap foran confirmation ya seats lock karwana chahte hain, to direct WhatsApp par message kar saktay hain:</li>
                  </ul>
                  <a href="https://wa.me/923475484803?text=Hi%20NetBots%2C%20I%20have%20registered%20for%20The%20Founder%20Lab%20Masterclass%20as%20${encodeURIComponent(name)}." class="whatsapp-btn" target="_blank">
                    Connect on WhatsApp (+92 347 5484803)
                  </a>
                </div>

                <div class="founder-note">
                  <div>
                    <div class="founder-name">Saqlain Shah</div>
                    <div class="founder-title">Founder & CEO, NetBots (SMC-Private) Limited</div>
                    <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Skardu, Gilgit-Baltistan • <a href="https://netbots.io" style="color: #0052ff; text-decoration: none;">netbots.io</a></div>
                  </div>
                </div>
              </div>

              <div class="footer">
                NetBots (SMC-Private) Limited • Technology For A Better Tomorrow<br>
                2nd Floor, Shah Plaza, Near Karasmathang Chowk, Skardu, Pakistan<br>
                Inquiries: <a href="mailto:saqlain@netbots.io" style="color: #64748b;">saqlain@netbots.io</a> | +92 347 5484803
              </div>
            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || '"Saqlain Shah - NetBots" <leads@netbots.io>',
          to: email,
          subject: studentSubject,
          html: studentHtml,
        });
      } catch (studentMailErr) {
        console.error('[Student Confirmation Email Failed]:', studentMailErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('[General API] Error details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
