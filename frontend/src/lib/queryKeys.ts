/**
 * React Query Keys
 *
 * Centralized query key management for React Query.
 * This prevents typos and makes cache invalidation easier.
 *
 * @see https://tanstack.com/query/latest/docs/react/guides/query-keys
 */

export const queryKeys = {
  /**
   * Cases (Portfolio Projects)
   */
  cases: {
    all: ['cases'] as const,
    detail: (slug: string) => ['cases', slug] as const,
  },

  /**
   * Profile (About Page)
   */
  profile: {
    data: ['profile'] as const,
  },

  /**
   * Design System
   */
  design: {
    settings: ['design', 'settings'] as const,
  },

  /**
   * PIN Access
   */
  pin: {
    status: ['pin', 'status'] as const,
  },

  /**
   * Admin queries
   */
  admin: {
    cases: ['admin', 'cases'] as const,
    caseDetail: (id: string) => ['admin', 'cases', id] as const,
    pins: ['admin', 'pins'] as const,
    pinDetail: (id: string) => ['admin', 'pins', id] as const,
    profile: ['admin', 'profile'] as const,
    designSystem: ['admin', 'design'] as const,
  },
} as const;

/**
 * Type helper to extract query key types
 */
export type QueryKeys = typeof queryKeys;
