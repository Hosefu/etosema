/**
 * API Types
 *
 * TypeScript types matching the backend API responses.
 */

// ============================================================================
// API RESPONSE WRAPPER
// ============================================================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// ============================================================================
// CASE TYPES
// ============================================================================

export interface CasePreview {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  year: number;
  coverUrl: string;
  isNda: boolean;
  isLocked: boolean;
  blocks: CaseBlock[];
}

export interface CaseMedia {
  url: string;
  type: 'IMAGE' | 'VIDEO';
  position: number;
  alt?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export interface CaseBlock {
  id: string;
  type: 'MEDIA' | 'TEXT';
  content?: string;
  settings?: string; // JSON string
  layout: 'FULL' | 'HALF';
  medias: CaseMedia[];
}

export interface CaseDetail {
  id: string;
  slug: string;
  title: string;
  year: number;
  summary?: string;
  isNda: boolean;
  useCustomDesign: boolean;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  settings?: string;
  blocks: CaseBlock[];
}

// ============================================================================
// PIN TYPES
// ============================================================================

export interface ApplyPinRequest {
  pin: string;
}

export interface ApplyPinResponse {
  pinId: string;
  token: string; // JWT token to store in localStorage
  accessAll: boolean;
  caseSlugs: string[];
  expiresAt?: string;
}

export interface PinStatusResponse {
  hasSession: boolean;
  accessAll: boolean;
  caseSlugs: string[];
}

// ============================================================================
// PROFILE TYPES
// ============================================================================

export interface Contacts {
  telegram?: string;
  email?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface LinkBlock {
  title: string;
  items: LinkItem[];
}

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
// DESIGN TYPES
// ============================================================================

export interface TypographyConfig {
  family: string;
  size: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
}

export interface DesignSettings {
  id: number;
  typography: {
    body: TypographyConfig;
    headingSmall: TypographyConfig;
    headingLarge: TypographyConfig;
  };
  colors: {
    background: string;
    card: string;
  };
  links: {
    offset: number;
    color: string;
    thickness?: number;
  };
  cards: {
    borderRadius: number;
    padding: number;
    paddingBottom?: number;
    height?: number;
  };
  grid: {
    margin: number;
    gutter: number;
    textColumns?: number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    blockAlign?: 'left' | 'center' | 'right';
  };
  spacing: {
    baseGap: number;
  };
  borderRadius?: {
    cardOuter?: number;
    cardInner?: number;
    media?: number;
  };
  logoSvgUrl?: string | null;
  logoSvgMaskUrl?: string | null;
  logoText?: string | null;
  faviconUrl?: string | null;
}

export interface Font {
  id: string;
  name: string;
  family: string;
  url: string;
  format: string;
  weight: string;
  style: string;
}

export interface DesignData {
  settings: DesignSettings | null;
  fonts: Font[];
}
