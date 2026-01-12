import 'server-only';

import { getPublicSeo } from '@/lib/seo/server';

export async function GET() {
  const { favicons, seo } = await getPublicSeo();
  const url = favicons?.manifestUrl || null;

  if (url) {
    try {
      const res = await fetch(url, { cache: 'no-store' } as any);
      if (res.ok) {
        const text = await res.text();
        return new Response(text, {
          headers: {
            'content-type': 'application/manifest+json; charset=utf-8',
            // allow revalidation while keeping it fairly fresh
            'cache-control': 'public, max-age=60',
          },
        });
      }
    } catch {
      // fall through to default manifest
    }
  }

  const fallback = {
    name: seo.siteName || 'Etosema',
    short_name: seo.siteName || 'Etosema',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [],
  };

  return Response.json(fallback, {
    headers: {
      'content-type': 'application/manifest+json; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  });
}

