// tests/api/contact.test.ts
import { POST } from '@/app/api/contact/route';
import { sendContactEmail } from '@/lib/mail';

jest.mock('@/lib/mail', () => ({
  sendContactEmail: jest.fn(),
}));

describe('/api/contact', () => {
  beforeEach(() => {
    (sendContactEmail as jest.Mock).mockClear();
    // Mock environment variables for testing
    process.env.SENDGRID_API_KEY = 'test_key';
    process.env.CONTACT_EMAIL_RECIPIENT = 'test@example.com';
    process.env.CONTACT_EMAIL_SENDER = 'sender@example.com';
  });

  it('should return 200 for valid data', async () => {
    const mockRequest = {
      json: async () => ({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello!',
      }),
      headers: new Headers(),
    } as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Message sent successfully!');
    expect(sendContactEmail).toHaveBeenCalledTimes(1);
  });

  it('should return 400 for missing fields', async () => {
    const mockRequest = {
      json: async () => ({
        firstName: 'John',
        email: 'john.doe@example.com',
        message: 'Hello!',
      }),
      headers: new Headers(),
    } as Request;

    const response = await POST(mockRequest);
    expect(response.status).toBe(400);
  });

  // Add tests for honeypot, rate limiting, and invalid email
});