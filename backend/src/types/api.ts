/**
 * API Types and Interfaces
 *
 * Shared types for request/response structures across the API.
 */

import { Request } from 'express';

// ============================================================================
// STANDARD API RESPONSE
// ============================================================================

/**
 * Standard API response wrapper
 * All API endpoints return this structure for consistency
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// ============================================================================
// PIN CONTEXT
// ============================================================================

/**
 * PIN access context attached to requests
 * Added by attachPinContext middleware
 */
export interface PinContext {
  pinId?: string;
  accessAll: boolean;
  caseIds: string[]; // IDs of cases this PIN grants access to
}

/**
 * Extended Express Request with PIN context
 */
export interface RequestWithPin extends Request {
  pinContext?: PinContext;
}

// ============================================================================
// CASE TYPES
// ============================================================================

/**
 * Case preview for grid display
 */
export interface CasePreview {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  year: number;
  coverUrl: string;
  isNda: boolean;
  isLocked: boolean; // Computed based on user's PIN access
  blocks: CaseBlockData[]; // Full blocks for preview scrolling
}

/**
 * Media item in a case block
 */
export interface CaseMedia {
  url: string;
  type: 'IMAGE' | 'VIDEO';
  position: number;
  alt?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1'; // For consistent rendering in preview and detail view
}

/**
 * Case block (FULL or HALF layout)
 */
export interface CaseBlockData {
  id: string;
  type?: 'MEDIA' | 'TEXT'; // Added
  content?: string; // Added
  settings?: string; // Added
  layout: 'FULL' | 'HALF';
  medias: CaseMedia[];
}

/**
 * Full case details
 */
export interface CaseDetail {
  id: string;
  slug: string;
  title: string;
  year: number;
  summary?: string;
  isNda: boolean;
  // New design fields
  backgroundColor?: string | null;
  textColor?: string | null;
  fontFamily?: string | null;
  settings?: string | null;
  useCustomDesign?: boolean;
  blocks: CaseBlockData[];
}

// ============================================================================
// PIN TYPES
// ============================================================================

/**
 * Request body for PIN application
 */
export interface ApplyPinRequest {
  pin: string;
}

/**
 * Response for successful PIN application
 */
export interface ApplyPinResponse {
  pinId: string;
  token: string; // JWT token for client to store in localStorage
  accessAll: boolean;
  caseSlugs: string[];
  expiresAt?: string; // ISO date string
}

/**
 * Response for PIN status check
 */
export interface PinStatusResponse {
  hasSession: boolean;
  accessAll: boolean;
  caseSlugs: string[];
}

/**
 * Decoded PIN session cookie
 */
export interface PinSessionData {
  pinId: string;
  iat?: number; // Issued at (JWT timestamp)
  exp?: number; // Expiration (JWT timestamp)
}

// ============================================================================
// PROFILE TYPES
// ============================================================================

/**
 * Generic link item
 */
export interface LinkItem {
  label: string;
  url: string;
}

/**
 * Generic block of links with a title
 */
export interface LinkBlock {
  title: string;
  items: LinkItem[];
}

/**
 * Profile data for "About Me" page
 */
export interface ProfileData {
  title: string;
  description: string;
  contacts: LinkBlock;
  projects: LinkBlock;
  socials: LinkBlock;
  logoUrl?: string | null;
  logoText?: string | null;
  lockedCaseMessage?: string | null;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Error codes used across the API
 */
export enum ErrorCode {
  // General
  INTERNAL_ERROR = 'internal_error',
  VALIDATION_ERROR = 'validation_error',
  NOT_FOUND = 'not_found',

  // PIN-related
  PIN_REQUIRED = 'pin_required',
  INVALID_PIN = 'invalid_pin',
  PIN_EXPIRED = 'pin_expired',
  TOO_MANY_ATTEMPTS = 'too_many_attempts',
}
