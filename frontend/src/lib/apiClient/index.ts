/**
 * API Client - Main Export
 *
 * Provides typed API functions for all backend endpoints.
 */

import { apiClient } from './client';
import {
  CasePreview,
  CaseDetail,
  ProfileData,
  ApplyPinRequest,
  ApplyPinResponse,
  PinStatusResponse,
  DesignData,
} from './types';

// ============================================================================
// CASES API
// ============================================================================

/**
 * Get all cases for the grid
 */
export async function getCases() {
  return apiClient.get<CasePreview[]>('/cases');
}

/**
 * Get a single case by slug
 */
export async function getCaseBySlug(slug: string) {
  return apiClient.get<CaseDetail>(`/cases/${slug}`);
}

// ============================================================================
// PIN API
// ============================================================================

/**
 * Apply a PIN code
 */
export async function applyPin(pin: string) {
  const body: ApplyPinRequest = { pin };
  return apiClient.post<ApplyPinResponse>('/pin/apply', body);
}

/**
 * Get current PIN session status
 */
export async function getPinStatus() {
  return apiClient.get<PinStatusResponse>('/pin/status');
}

// ============================================================================
// PROFILE API
// ============================================================================

/**
 * Get profile data for "About Me" page
 */
export async function getProfile() {
  return apiClient.get<ProfileData>('/profile');
}

// ============================================================================
// DESIGN API
// ============================================================================

/**
 * Get global design settings
 */
export async function getDesignSettings() {
  return apiClient.get<DesignData>('/design');
}

// ============================================================================
// UTILS
// ============================================================================

/**
 * Set PIN session token in localStorage
 */
export function setPinToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pin_session_token', token);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export * from './types';
export { apiClient };
