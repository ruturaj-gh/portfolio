import { throttle } from 'throttle-debounce';

const MAX_REQUESTS_PER_MINUTE = 5; // Max requests allowed
const WINDOW_SIZE_MS = 60 * 1000; // 1 minute in milliseconds

interface RequestEntry {
  timestamp: number;
}

// Simple in-memory storage for IPs and their requests.
// In a real production serverless environment, you'd use a persistent store like Redis.
const requestAttempts = new Map<string, RequestEntry[]>();

/**
 * Checks if a given IP address is within its allowed request rate.
 * @param ip The IP address of the requester.
 * @returns true if the request is allowed, false if rate-limited.
 */
export function applyRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestAttempts.get(ip) || [];

  // Filter out requests older than the window size
  const recentRequests = requests.filter(
    (entry) => entry.timestamp > now - WINDOW_SIZE_MS
  );

  // Add the current request
  recentRequests.push({ timestamp: now });

  // Update the map
  requestAttempts.set(ip, recentRequests);

  // Check if the number of recent requests exceeds the limit
  return recentRequests.length <= MAX_REQUESTS_PER_MINUTE;
}

// Clean up old entries periodically (optional, but good practice for long-running processes)
// This won't run consistently on Vercel's serverless functions, as they are short-lived.
// A proper solution would involve a cron job or a persistent store.
// setInterval(() => {
//   const now = Date.now();
//   requestAttempts.forEach((requests, ip) => {
//     const recent = requests.filter(entry => entry.timestamp > now - WINDOW_SIZE_MS);
//     if (recent.length === 0) {
//       requestAttempts.delete(ip);
//     } else {
//       requestAttempts.set(ip, recent);
//     }
//   });
//   // console.log('Rate limit map cleaned. Current IPs:', requestAttempts.keys());
// }, WINDOW_SIZE_MS);