/**
 * Main Layout Component
 *
 * Primary layout with navigation.
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getProfile, ProfileData } from '@/lib/apiClient';
import styles from './MainLayout.module.scss';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
        }
      })
      .catch(console.error);
  }, []);

  // Don't render layout header/nav for admin pages
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  const isWorksPage = pathname === '/';
  const isAboutPage = pathname === '/about';

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          {profile?.logoUrl ? (
            // Svg logo from S3
            <img
              src={profile.logoUrl}
              alt="Logo"
              className={styles.logoImage}
              style={{ maxHeight: 40, width: 'auto' }}
            />
          ) : (
            <span className={styles.logoText}>
              {profile?.logoText || 'сёма'}
            </span>
          )}
        </Link>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${isWorksPage ? styles.active : ''}`}
          >
            Работы
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${isAboutPage ? styles.active : ''}`}
          >
            Обо мне
          </Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
