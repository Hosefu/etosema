import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import { getPublicSeo } from '@/lib/seo/server';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPublicSeo();
  return {
    title: seo.aboutTitle,
    description: seo.aboutDescription,
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
