/**
 * React Query Hooks for API
 *
 * Custom hooks for data fetching using React Query.
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCases,
  getCaseBySlug,
  getProfile,
  getDesignSettings,
  getPinStatus,
  applyPin,
  setPinToken,
  CasePreview,
  CaseDetail,
  ProfileData,
  DesignData,
  PinStatusResponse,
  ApplyPinResponse,
} from '@/lib/apiClient';

// ============================================================================
// QUERY KEYS
// ============================================================================

export const queryKeys = {
  cases: ['cases'] as const,
  caseBySlug: (slug: string) => ['cases', slug] as const,
  profile: ['profile'] as const,
  design: ['design'] as const,
  pinStatus: ['pinStatus'] as const,
};

// ============================================================================
// CASES HOOKS
// ============================================================================

/**
 * Hook to fetch all cases
 */
export function useCases() {
  return useQuery({
    queryKey: queryKeys.cases,
    queryFn: async () => {
      const response = await getCases();

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as CasePreview[];
    },
  });
}

/**
 * Hook to fetch a single case by slug
 */
export function useCaseBySlug(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.caseBySlug(slug || ''),
    queryFn: async () => {
      if (!slug) return null;

      const response = await getCaseBySlug(slug);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as CaseDetail;
    },
    enabled: !!slug,
  });
}

// ============================================================================
// PROFILE HOOK
// ============================================================================

/**
 * Hook to fetch profile data
 */
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      const response = await getProfile();

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as ProfileData;
    },
  });
}

// ============================================================================
// DESIGN HOOK
// ============================================================================

/**
 * Hook to fetch design settings
 */
export function useDesignSettings() {
  return useQuery({
    queryKey: queryKeys.design,
    queryFn: async () => {
      const response = await getDesignSettings();

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as DesignData;
    },
  });
}

// ============================================================================
// PIN HOOKS
// ============================================================================

/**
 * Hook to fetch PIN session status
 */
export function usePinStatus() {
  return useQuery({
    queryKey: queryKeys.pinStatus,
    queryFn: async () => {
      const response = await getPinStatus();

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as PinStatusResponse;
    },
  });
}

/**
 * Hook to apply a PIN code
 */
export function useApplyPin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pin: string) => {
      const response = await applyPin(pin);

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data as ApplyPinResponse;
    },
    onSuccess: (data) => {
      // Save token to localStorage
      setPinToken(data.token);

      // Invalidate queries that depend on PIN status
      queryClient.invalidateQueries({ queryKey: queryKeys.pinStatus });
      queryClient.invalidateQueries({ queryKey: queryKeys.cases });
    },
  });
}
