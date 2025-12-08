/**
 * Favicon Loader Component
 *
 * Dynamically loads favicon from design settings.
 */

'use client';

import { useEffect } from 'react';
import { getDesignSettings } from '@/lib/apiClient';

export function FaviconLoader() {
  useEffect(() => {
    let isMounted = true;

    async function loadFavicon() {
      try {
        const response = await getDesignSettings();
        if (isMounted && response.data?.settings?.faviconUrl) {
          // Remove existing favicon links
          const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
          existingFavicons.forEach(link => link.remove());

          // Add new favicon
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = response.data.settings.faviconUrl;
          document.head.appendChild(link);

          // Also add apple-touch-icon
          const appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.href = response.data.settings.faviconUrl;
          document.head.appendChild(appleLink);
        }
      } catch (error) {
        console.error('Failed to load favicon:', error);
      }
    }

    loadFavicon();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
