import type { Metadata } from 'next';
import WorksPageClient from './WorksPageClient';
import { getPublicSeo } from '@/lib/seo/server';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPublicSeo();
  return {
    title: seo.homeTitle,
    description: seo.homeDescription,
  };
}

export default function WorksPage() {
  return <WorksPageClient />;
}
