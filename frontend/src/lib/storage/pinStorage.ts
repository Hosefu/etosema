/**
 * PIN Storage
 *
 * Manages PIN session token in localStorage.
 */

const PIN_TOKEN_KEY = 'pin_session_token';

/**
 * Save PIN session token
 */
export function savePinToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PIN_TOKEN_KEY, token);
  }
}

/**
 * Get PIN session token
 */
export function getPinToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(PIN_TOKEN_KEY);
  }
  return null;
}

/**
 * Remove PIN session token
 */
export function removePinToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PIN_TOKEN_KEY);
  }
}
