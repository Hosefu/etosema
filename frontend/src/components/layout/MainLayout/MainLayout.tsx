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
  const [logoColor, setLogoColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
        }
      })
      .catch(console.error);
  }, []);

  // Get logo color from CSS custom property (set by case or design system)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateColor = () => {
      const headingColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--heading-large-color')
        .trim();
      setLogoColor(headingColor || undefined);
    };
    
    updateColor();
    
    // Watch for changes (when navigating between cases)
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });
    
    return () => observer.disconnect();
  }, [pathname]);

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
          {(profile as any)?.logoSvgUrl ? (
            // SVG logo with own colors
            <img
              src={(profile as any).logoSvgUrl}
              alt="Logo"
              className={styles.logoImage}
              style={{ maxHeight: 40, width: 'auto' }}
            />
          ) : (profile as any)?.logoSvgMaskUrl ? (
            // SVG mask logo - can be colored
            <div
              className={styles.logoMask}
              style={{
                maskImage: `url(${(profile as any).logoSvgMaskUrl})`,
                WebkitMaskImage: `url(${(profile as any).logoSvgMaskUrl})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                backgroundColor: logoColor || 'var(--heading-large-color, currentColor)',
                width: 'auto',
                height: 40,
                minWidth: 80,
              }}
            />
          ) : profile?.logoUrl ? (
            // Fallback: old PNG logo (deprecated)
            <img
              src={profile.logoUrl}
              alt="Logo"
              className={styles.logoImage}
              style={{ maxHeight: 40, width: 'auto' }}
            />
          ) : (
            <span className={styles.logoText} style={{ color: logoColor || 'inherit' }}>
              {profile?.logoText || 'сёма'}
            </span>
          )}
        </Link>
        <nav className={styles.nav} style={{ color: logoColor || 'inherit' }}>
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
