/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/mail';
import { applyRateLimit } from '@/lib/rateLimit';
import { checkHoneypot } from '@/lib/honeypot';
import { z } from 'zod';

// Define schema for input validation
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message cannot exceed 500 characters'),
  company: z.string().optional(),
  honeypotField: z.string().optional(), // Honeypot field
});

export async function POST(req: Request) { // <-- This export POST function is crucial
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

  // 1. Rate Limiting
  if (!applyRateLimit(ip)) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429 });
  }

  try {
    const body = await req.json();

    // 2. Honeypot Check
    if (checkHoneypot(body)) {
      console.warn('Honeypot detected spam attempt. IP:', ip);
      // Return a success status to confuse bots, but don't process the request
      return NextResponse.json({ message: 'Success (but actually a bot)' }, { status: 200 });
    }

    // 3. Server-side Validation with Zod
    const validatedData = contactFormSchema.parse(body);

    // 4. Send Email
    
    try{
      await sendContactEmail(validatedData);
    }catch{
    }

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error: any) {
    console.log('Error in contact form submission:', error);
    if (error instanceof z.ZodError) {
      // Zod validation errors
      console.error('Validation error in contact form:', error.errors);
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    } else {
      console.error('Error processing contact form:', error);
      return NextResponse.json({ message: 'Failed to send message.', error: error.message }, { status: 500 });
    }
  }
}