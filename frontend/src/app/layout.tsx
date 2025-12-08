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
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Etosema — Коммуникационный дизайнер',
  description: 'Портфолио коммуникационной дизайнерки Сёмы',
  viewport: 'width=device-width, initial-scale=1',
};

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
