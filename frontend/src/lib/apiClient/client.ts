/**
 * API Client
 *
 * HTTP client for communicating with the backend API.
 */

import { ApiResponse } from './types';

// Use empty string to make requests to the same origin (Next.js will proxy to backend via rewrites)
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * API client configuration
 */
const config = {
  baseURL: `${API_URL}/api/public`,
};

/**
 * Get authorization headers with PIN token if available
 */
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add PIN token from localStorage if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('pin_session_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${config.baseURL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  const data: ApiResponse<T> = await response.json();

  return data;
}

/**
 * API client object
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetchAPI<T>(endpoint, { ...options, method: 'GET' }),

  /**
   * POST request
   */
  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * PUT request
   */
  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    fetchAPI<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchAPI<T>(endpoint, { ...options, method: 'DELETE' }),
};
