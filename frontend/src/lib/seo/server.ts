import 'server-only';

import { headers } from 'next/headers';

export interface SeoSettings {
  siteName: string;
  homeTitle: string;
  homeDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  caseTitleTemplate: string; // contains {title}
  caseDescriptionFallback: string;
}

export interface FaviconsSet {
  png16?: string;
  png32?: string;
  png48?: string;
  png64?: string;
  apple180?: string;
  android192?: string;
  android512?: string;
  ico?: string;
  svg?: string;
  manifestUrl?: string;
  maskIconUrl?: string;
  maskColor?: string;
}

type PublicDesignResponse = {
  data?: {
    settings?: {
      faviconUrl?: string | null;
      favicons?: FaviconsSet | null;
      seo?: Partial<SeoSettings> | null;
    } | null;
  };
};

function getBaseUrlFromHeaders(): string {
  const h = headers();
  const proto = h.get('x-forwarded-proto') || 'http';
  const host = h.get('x-forwarded-host') || h.get('host');
  if (!host) return 'http://localhost:3000';
  return `${proto}://${host}`;
}

export async function getPublicSeo(): Promise<{
  seo: SeoSettings;
  faviconUrl: string | null;
  favicons: FaviconsSet | null;
  baseUrl: string;
}> {
  const baseUrl = getBaseUrlFromHeaders();

  const fallback: SeoSettings = {
    siteName: 'Etosema',
    homeTitle: 'Etosema — Коммуникационный дизайнер',
    homeDescription: 'Портфолио коммуникационной дизайнерки Сёмы',
    aboutTitle: 'Обо мне — Etosema',
    aboutDescription: 'Контакты и информация обо мне',
    caseTitleTemplate: '{title} — Etosema',
    caseDescriptionFallback: '',
  };

  try {
    const res = await fetch(
      `${baseUrl}/api/public/design`,
      // Favicons/SEO must update immediately after admin save
      { cache: 'no-store' } as any
    );
    const json = (await res.json()) as PublicDesignResponse;
    const seo = (json.data?.settings?.seo || {}) as Partial<SeoSettings>;
    const faviconUrl = json.data?.settings?.faviconUrl ?? null;
    const favicons = json.data?.settings?.favicons ?? null;

    return {
      seo: { ...fallback, ...seo },
      faviconUrl,
      favicons,
      baseUrl,
    };
  } catch {
    return { seo: fallback, faviconUrl: null, favicons: null, baseUrl };
  }
}

export function applyCaseTitleTemplate(template: string, title: string): string {
  const t = (template || '{title}').trim() || '{title}';
  return t.replaceAll('{title}', title);
}

