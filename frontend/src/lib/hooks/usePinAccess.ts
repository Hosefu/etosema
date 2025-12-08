/**
 * usePinAccess Hook
 *
 * Manages PIN code access state and provides methods to check/apply PINs.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { applyPin, getPinStatus } from '../apiClient';

export interface PinAccessState {
  hasSession: boolean;
  accessAll: boolean;
  caseSlugs: string[];
  loading: boolean;
  error: string | null;
}

export interface UsePinAccessReturn extends PinAccessState {
  applyPinCode: (pin: string) => Promise<{ success: boolean; error?: string }>;
  isCaseAccessible: (slug: string) => boolean;
  refresh: () => Promise<void>;
}

/**
 * Hook for managing PIN access
 *
 * Automatically fetches PIN status on mount and provides methods
 * to apply new PINs and check case access.
 */
export function usePinAccess(): UsePinAccessReturn {
  const [state, setState] = useState<PinAccessState>({
    hasSession: false,
    accessAll: false,
    caseSlugs: [],
    loading: true,
    error: null,
  });

  /**
   * Fetch current PIN status
   */
  const fetchStatus = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getPinStatus();

      if (response.error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: response.error!.message,
        }));
        return;
      }

      setState({
        hasSession: response.data!.hasSession,
        accessAll: response.data!.accessAll,
        caseSlugs: response.data!.caseSlugs,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch PIN status',
      }));
    }
  }, []);

  /**
   * Apply a PIN code
   */
  const applyPinCode = useCallback(
    async (pin: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await applyPin(pin);

        if (response.error) {
          return {
            success: false,
            error: response.error.message,
          };
        }

        // Save token to localStorage
        if (response.data!.token) {
          localStorage.setItem('pin_session_token', response.data!.token);
        }

        // Update state with new access
        setState({
          hasSession: true,
          accessAll: response.data!.accessAll,
          caseSlugs: response.data!.caseSlugs,
          loading: false,
          error: null,
        });

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: 'Failed to apply PIN',
        };
      }
    },
    []
  );

  /**
   * Check if a case is accessible
   */
  const isCaseAccessible = useCallback(
    (slug: string): boolean => {
      if (state.accessAll) return true;
      return state.caseSlugs.includes(slug);
    },
    [state.accessAll, state.caseSlugs]
  );

  /**
   * Refresh PIN status
   */
  const refresh = useCallback(async () => {
    await fetchStatus();
  }, [fetchStatus]);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    ...state,
    applyPinCode,
    isCaseAccessible,
    refresh,
  };
}
