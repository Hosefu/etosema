import type { Metadata } from 'next';
import CasePageClient from './CasePageClient';
import { applyCaseTitleTemplate, getPublicSeo } from '@/lib/seo/server';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { seo, baseUrl } = await getPublicSeo();

  // Best-effort: try to fetch case data for title/description.
  // For NDA/locked cases the API may return 403 -> we emit noindex.
  try {
    const res = await fetch(`${baseUrl}/api/public/cases/${params.slug}`, {
      next: { revalidate: 60 },
    } as any);

    if (res.status === 403) {
      return {
        title: applyCaseTitleTemplate(seo.caseTitleTemplate, 'NDA'),
        robots: { index: false, follow: false },
      };
    }

    if (!res.ok) {
      return { title: seo.siteName };
    }

    const json = (await res.json()) as {
      data?: {
        title?: string;
        summary?: string | null;
        seoTitle?: string | null;
        seoDescription?: string | null;
      };
    };

    const title =
      json.data?.seoTitle ||
      applyCaseTitleTemplate(seo.caseTitleTemplate, json.data?.title || 'Кейс');
    const description =
      json.data?.seoDescription ||
      json.data?.summary ||
      seo.caseDescriptionFallback ||
      seo.homeDescription;

    return {
      title,
      description,
      openGraph: { title, description },
    };
  } catch {
    return { title: seo.siteName };
  }
}

export default function CasePage() {
  return <CasePageClient />;
}
