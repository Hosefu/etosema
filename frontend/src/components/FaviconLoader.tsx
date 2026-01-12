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
        if (!isMounted) return;

        const favicons = (response.data?.settings as any)?.favicons || null;
        const faviconUrl = response.data?.settings?.faviconUrl || null;

        if (!favicons && !faviconUrl) return;

        // Remove existing icon-related links
        const existing = document.querySelectorAll(
          'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"], link[rel="manifest"]'
        );
        existing.forEach((link) => link.remove());

        const append = (attrs: Record<string, string>) => {
          const link = document.createElement('link');
          Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
          document.head.appendChild(link);
        };

        const iconHref =
          favicons?.png32 || favicons?.png16 || favicons?.svg || faviconUrl;

        if (favicons?.ico) {
          append({ rel: 'icon', href: favicons.ico, type: 'image/x-icon' });
        }
        if (favicons?.svg) {
          append({ rel: 'icon', href: favicons.svg, type: 'image/svg+xml' });
        }
        if (favicons?.png16) {
          append({
            rel: 'icon',
            href: favicons.png16,
            type: 'image/png',
            sizes: '16x16',
          });
        }
        if (favicons?.png32) {
          append({
            rel: 'icon',
            href: favicons.png32,
            type: 'image/png',
            sizes: '32x32',
          });
        }
        if (favicons?.png48) {
          append({
            rel: 'icon',
            href: favicons.png48,
            type: 'image/png',
            sizes: '48x48',
          });
        }
        if (favicons?.png64) {
          append({
            rel: 'icon',
            href: favicons.png64,
            type: 'image/png',
            sizes: '64x64',
          });
        }

        if (favicons?.apple180) {
          append({
            rel: 'apple-touch-icon',
            href: favicons.apple180,
            sizes: '180x180',
          });
        } else if (iconHref) {
          append({ rel: 'apple-touch-icon', href: iconHref });
        }

        // Always use same-origin manifest endpoint to avoid S3 CORS.
        append({ rel: 'manifest', href: '/site.webmanifest' });

        if (favicons?.maskIconUrl) {
          append({
            rel: 'mask-icon',
            href: favicons.maskIconUrl,
            color: favicons.maskColor || '#000000',
          });
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
