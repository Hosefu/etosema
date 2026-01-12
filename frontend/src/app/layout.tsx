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
  const { seo, faviconUrl, favicons, baseUrl } = await getPublicSeo();

  const iconHref =
    favicons?.png32 ||
    favicons?.png16 ||
    favicons?.svg ||
    faviconUrl ||
    '/favicon.svg';

  return {
    metadataBase: new URL(baseUrl),
    title: seo.homeTitle,
    description: seo.homeDescription,
    icons: {
      icon: [
        ...(favicons?.ico ? [{ url: favicons.ico, type: 'image/x-icon' }] : []),
        ...(favicons?.svg
          ? [{ url: favicons.svg, type: 'image/svg+xml' }]
          : []),
        ...(favicons?.png16
          ? [{ url: favicons.png16, type: 'image/png', sizes: '16x16' }]
          : []),
        ...(favicons?.png32
          ? [{ url: favicons.png32, type: 'image/png', sizes: '32x32' }]
          : []),
        ...(favicons?.png48
          ? [{ url: favicons.png48, type: 'image/png', sizes: '48x48' }]
          : []),
        ...(favicons?.png64
          ? [{ url: favicons.png64, type: 'image/png', sizes: '64x64' }]
          : []),
        { url: iconHref },
      ],
      apple: [
        ...(favicons?.apple180
          ? [{ url: favicons.apple180, type: 'image/png', sizes: '180x180' }]
          : []),
        { url: iconHref },
      ],
    },
    // Always serve manifest from our origin to avoid S3 CORS issues.
    manifest: '/site.webmanifest',
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
        <DesignSystemProvider />
        <QueryProvider>
          <MainLayout>{children}</MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
