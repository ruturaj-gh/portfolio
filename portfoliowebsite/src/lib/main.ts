import sgMail from '@sendgrid/mail';
import { ContactFormData } from '@/types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendContactEmail(data: ContactFormData) {
  const { firstName, lastName, email, message, company } = data;

  const msg = {
    to: process.env.CONTACT_EMAIL_RECIPIENT as string,
    from: process.env.CONTACT_EMAIL_SENDER as string, // Must be a verified sender in SendGrid
    subject: `New Portfolio Contact from ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; border-left: 3px solid #eee; padding-left: 10px; margin-left: 0;">${message}</p>
        <hr/>
        <p style="font-size: 0.8em; color: #777;">This email was sent from your portfolio website's contact form.</p>
      </div>
    `,
    text: `New Contact Form Submission:\nName: ${firstName} ${lastName}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ''}Message: ${message}`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully!');
  } catch (error: any) {
    console.error('Error sending email:', error.response?.body || error);
    throw new Error('Failed to send email.');
  }
}