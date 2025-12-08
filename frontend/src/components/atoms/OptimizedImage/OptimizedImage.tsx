/**
 * Optimized Image Component
 *
 * Wrapper around Next.js Image with optimized defaults for quality,
 * progressive loading, and modern formats (WebP, AVIF).
 */

'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import styles from './OptimizedImage.module.scss';

export interface OptimizedImageProps extends Omit<ImageProps, 'quality'> {
  /**
   * Image quality (1-100). Higher = better quality but larger file size.
   * Default: 85 (good balance between quality and performance)
   */
  quality?: number;

  /**
   * Show blur placeholder while loading
   * Default: true
   */
  showPlaceholder?: boolean;

  /**
 * Custom placeholder blur data URL
 */
  blurDataURL?: string;

  /**
   * Optional low-res placeholder URL (e.g., 100px wide) shown until main image loads.
   * If not provided, component will try to derive it by appending ?w=100&q=20 to src.
   */
  placeholderSrc?: string;

  /**
   * Blur intensity for the low-res placeholder.
   */
  placeholderBlur?: number;
}

export function OptimizedImage({
  quality = 85,
  showPlaceholder = true,
  placeholder: _placeholder,
  blurDataURL,
  className = '',
  placeholderSrc,
  placeholderBlur = 15,
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [derivedPlaceholder, setDerivedPlaceholder] = useState<string | null>(
    placeholderSrc || null
  );

  const deriveThumbnailUrl = (src: string): string | null => {
    try {
      const url = new URL(src, typeof window !== 'undefined' ? window.location.href : undefined);
      const match = url.pathname.match(/\/medias\/([^/.]+)\.[^/]+$/);
      if (match) {
        url.pathname = `/medias/thumbs/${match[1]}-thumb.jpg`;
        return url.toString();
      }
      return null;
    } catch {
      return null;
    }
  };

  // Try to build a low-res URL automatically if none provided
  useEffect(() => {
    if (placeholderSrc) return;
    if (typeof props.src === 'string') {
      const thumb = deriveThumbnailUrl(props.src);
      if (thumb) {
        setDerivedPlaceholder(thumb);
      } else {
        const hasQuery = props.src.includes('?');
        setDerivedPlaceholder(`${props.src}${hasQuery ? '&' : '?'}w=100&q=20`);
      }
    }
  }, [placeholderSrc, props.src]);

  const handleLoad: NonNullable<ImageProps['onLoad']> = (event) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {showPlaceholder && derivedPlaceholder && isLoading && (
        <img
          src={derivedPlaceholder}
          alt=""
          aria-hidden
          className={styles.placeholder}
          style={{ filter: `blur(${placeholderBlur}px)` }}
        />
      )}
      <Image
        {...props}
        quality={quality}
        placeholder={showPlaceholder && blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className={`${styles.image} ${isLoading ? styles.loading : styles.loaded}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
