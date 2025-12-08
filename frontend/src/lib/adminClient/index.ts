/**
 * Admin API Client
 *
 * Client for admin API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface AdminLoginResponse {
  success: boolean;
  data?: {
    token: string;
    email: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface Case {
  id: string;
  slug: string;
  title: string;
  shortTitle: string | null;
  year: number;
  summary: string | null;
  isNda: boolean;
  coverUrl: string;
  orderRank: string;
  useCustomDesign: boolean;
  backgroundColor?: string | null;
  textColor?: string | null;
  fontFamily?: string | null;
  settings?: string | null;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface Block {
  id: string;
  caseId: string;
  type: string; // MEDIA, TEXT
  content: string | null;
  settings: string | null;
  layout: string;
  orderRank: string;
  medias: Media[];
}

export interface Media {
  id: string;
  blockId: string;
  position: number;
  type: string;
  url: string;
  alt: string | null;
  aspectRatio: string | null;
}

/**
 * Get admin token from localStorage
 */
function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

/**
 * Set admin token in localStorage
 */
export function setAdminToken(token: string) {
  localStorage.setItem('admin_token', token);
}

/**
 * Clear admin token from localStorage
 */
export function clearAdminToken() {
  localStorage.removeItem('admin_token');
}

/**
 * Admin login
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<AdminLoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}

/**
 * Get all cases (admin)
 */
export async function adminGetCases(): Promise<{
  success: boolean;
  data?: Case[];
}> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/cases`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Create a case (admin)
 */
export async function adminCreateCase(
  data: Partial<Case>
): Promise<{ success: boolean; data?: Case }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/cases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Update a case (admin)
 */
export async function adminUpdateCase(
  id: string,
  data: Partial<Case>
): Promise<{ success: boolean; data?: Case }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/cases/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Delete a case (admin)
 */
export async function adminDeleteCase(
  id: string
): Promise<{ success: boolean }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/cases/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Reorder cases
 */
export async function adminReorderCases(
  caseIds: string[]
): Promise<{ success: boolean }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/cases/reorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ caseIds }),
  });

  return response.json();
}

/**
 * Get a single case (admin)
 */
export async function adminGetCase(
  id: string
): Promise<{ success: boolean; data?: Case }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/cases/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Upload a file (admin)
 */
export async function adminUploadFile(
  file: File
): Promise<{ success: boolean; data?: { url: string } }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
}

/**
 * Create a block (admin)
 */
export async function adminCreateBlock(
  data: Partial<Block>
): Promise<{ success: boolean; data?: Block }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/blocks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Update a block (admin)
 */
export async function adminUpdateBlock(
  id: string,
  data: Partial<Block>
): Promise<{ success: boolean; data?: Block }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/blocks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Delete a block (admin)
 */
export async function adminDeleteBlock(
  id: string
): Promise<{ success: boolean }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/blocks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Create a media (admin)
 */
export async function adminCreateMedia(
  data: Partial<Media>
): Promise<{ success: boolean; data?: Media }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/medias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Update a media (admin)
 */
export async function adminUpdateMedia(
  id: string,
  data: Partial<Media>
): Promise<{ success: boolean; data?: Media }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/medias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Delete a media (admin)
 */
export async function adminDeleteMedia(
  id: string
): Promise<{ success: boolean }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/medias/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// ... (existing interfaces)

export interface PinCode {
  id: string;
  label: string | null;
  code?: string; // Plain code if available
  shortCode?: string; // Short code for sharing
  accessAll: boolean;
  expiresAt: string | null;
  createdAt: string;
  cases?: Case[]; // Attached cases
  usages?: PinUsage[]; // History
}

export interface PinUsage {
  id: string;
  ip: string;
  userAgent: string | null;
  success: boolean;
  path: string | null;
  createdAt: string;
}

// ...

/**
 * Get all pins (admin)
 */
export async function adminGetPins(): Promise<{
  success: boolean;
  data?: PinCode[];
}> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/pins`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Delete a pin (admin)
 */
export async function adminDeletePin(
  id: string
): Promise<{ success: boolean }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/pins/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Get a single pin (admin)
 */
export async function adminGetPin(
  id: string
): Promise<{ success: boolean; data?: PinCode }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/pins/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Update a pin (admin)
 */
export async function adminUpdatePin(
  id: string,
  data: Partial<PinCode> & { caseIds?: string[] }
): Promise<{ success: boolean; data?: PinCode }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/pins/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Create a pin (admin)
 */
export async function adminCreatePin(
  data: Partial<PinCode> & { caseIds?: string[] }
): Promise<{ success: boolean; data?: PinCode }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/pins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface LinkBlock {
  title: string;
  items: LinkItem[];
}

export interface Profile {
  id: number;
  title: string;
  description: string;
  contactsJson: string; // JSON string of LinkBlock
  projectsJson: string; // JSON string of LinkBlock
  socialsJson: string; // JSON string of LinkBlock
  logoUrl?: string | null;
  logoText?: string | null;
  lockedCaseMessage?: string | null;
}

// ...

/**
 * Get profile (admin)
 */
export async function adminGetProfile(): Promise<{
  success: boolean;
  data?: Profile;
}> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Update profile (admin)
 */
export async function adminUpdateProfile(
  data: Partial<Profile>
): Promise<{ success: boolean; data?: Profile }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// ============================================================================
// DESIGN SYSTEM
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
    cardTitle?: TypographyConfig;
  };
  colors: {
    background: string;
    card: string;
    textPrimary?: string;
    textSecondary?: string;
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

/**
 * Get design settings
 */
export async function adminGetDesign(): Promise<{
  success: boolean;
  data?: { settings: DesignSettings; fonts: Font[] };
}> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/design`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

/**
 * Update design settings
 */
export async function adminUpdateDesign(
  data: Partial<DesignSettings>
): Promise<{ success: boolean; data?: DesignSettings }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/design`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Upload font
 */
export async function adminUploadFont(
  file: File,
  metadata: { family?: string; weight?: string; style?: string }
): Promise<{ success: boolean; data?: Font }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const formData = new FormData();
  formData.append('file', file);
  if (metadata.family) formData.append('family', metadata.family);
  if (metadata.weight) formData.append('weight', metadata.weight);
  if (metadata.style) formData.append('style', metadata.style);

  const response = await fetch(`${API_BASE_URL}/api/admin/design/fonts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
}

/**
 * Delete font
 */
export async function adminDeleteFont(
  id: string
): Promise<{ success: boolean }> {
  const token = getAdminToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/api/admin/design/fonts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
