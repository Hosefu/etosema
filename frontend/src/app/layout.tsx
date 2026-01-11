/**
 * Root Layout
 *
 * Next.js App Router root layout.
 * Loads fonts and global styles.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { DesignSystemProvider } from '@/components/DesignSystemProvider';
import { FaviconLoader } from '@/components/FaviconLoader';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { getPublicSeo } from '@/lib/seo/server';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo, faviconUrl, baseUrl } = await getPublicSeo();
  const iconHref = faviconUrl || '/favicon.svg';

  return {
    metadataBase: new URL(baseUrl),
    title: seo.homeTitle,
    description: seo.homeDescription,
    icons: {
      icon: [{ url: iconHref }],
      apple: [{ url: iconHref }],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.variable}>
        <FaviconLoader />
        <DesignSystemProvider />
        <QueryProvider>
          <MainLayout>{children}</MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
