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
  const [design, setDesign] = useState<any>(null);
  const [logoColor, setLogoColor] = useState<string | undefined>(undefined);
  const [logoAspect, setLogoAspect] = useState<number | null>(null);

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
        }
      })
      .catch(console.error);
      
    // Load design settings for logo
    import('@/lib/apiClient').then(({ getDesignSettings }) => {
      getDesignSettings()
        .then((res) => {
          if (res.data) {
            setDesign(res.data.settings);
          }
        })
        .catch(console.error);
    });
  }, []);

  // Keep logo box size consistent between SVG <img> and SVG-mask modes.
  // We infer aspect ratio from the actual SVG being used (mask preferred).
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url: string | null =
      (design?.logoSvgMaskUrl as string | null) ||
      (design?.logoSvgUrl as string | null) ||
      null;

    if (!url) {
      setLogoAspect(null);
      return;
    }

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || 0;
      const h = img.naturalHeight || 0;
      if (w > 0 && h > 0) {
        const ratio = w / h;
        // Avoid extreme values in case the SVG has weird intrinsic sizing
        const clamped = Math.max(0.5, Math.min(8, ratio));
        setLogoAspect(clamped);
      } else {
        setLogoAspect(null);
      }
    };
    img.onerror = () => {
      if (!cancelled) setLogoAspect(null);
    };
    img.src = url;

    return () => {
      cancelled = true;
    };
  }, [design?.logoSvgMaskUrl, design?.logoSvgUrl]);

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
  const logoHeight = 40;
  const logoWidth = Math.round(logoHeight * (logoAspect ?? 3));

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          {design?.logoSvgMaskUrl ? (
            // SVG mask logo - colored by heading color (preferred if present)
            <div
              className={styles.logoMask}
              style={{
                maskImage: `url(${design.logoSvgMaskUrl})`,
                WebkitMaskImage: `url(${design.logoSvgMaskUrl})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                backgroundColor: logoColor || 'var(--heading-large-color, currentColor)',
                width: logoWidth,
                height: logoHeight,
              }}
            />
          ) : design?.logoSvgUrl ? (
            // SVG logo with own colors (doesn't recolor)
            <img
              src={design.logoSvgUrl}
              alt="Logo"
              className={styles.logoImage}
              style={{
                height: logoHeight,
                width: logoWidth,
                objectFit: 'contain',
              }}
            />
          ) : profile?.logoUrl ? (
            // Fallback: old PNG logo (deprecated)
            <img
              src={profile.logoUrl}
              alt="Logo"
              className={styles.logoImage}
              style={{
                height: logoHeight,
                width: logoWidth,
                objectFit: 'contain',
              }}
            />
          ) : (
            <span className={styles.logoText} style={{ color: logoColor || 'inherit' }}>
              {design?.logoText || 'сёма'}
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
