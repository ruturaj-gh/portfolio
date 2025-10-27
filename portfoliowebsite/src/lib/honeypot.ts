import { ContactFormData } from '@/types';

/**
 * Checks if the honeypot field has been filled, indicating a bot.
 * @param data The contact form data.
 * @returns true if the honeypot field is filled, false otherwise.
 */
export function checkHoneypot(data: ContactFormData): boolean {
  // The honeypot field should be present in the form but hidden from human users.
  // If a bot fills it, we know it's spam.
  return !!data.honeypotField;
}