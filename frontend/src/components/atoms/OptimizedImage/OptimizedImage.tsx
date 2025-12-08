/**
 * Optimized Image Component
 *
 * Wrapper around Next.js Image with optimized defaults for quality,
 * progressive loading, and modern formats (WebP, AVIF).
 */

'use client';

import { useState } from 'react';
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
}

export function OptimizedImage({
  quality = 85,
  showPlaceholder = true,
  placeholder: _placeholder,
  blurDataURL,
  className,
  onLoadingComplete,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete: NonNullable<ImageProps['onLoadingComplete']> = (
    result
  ) => {
    setIsLoading(false);
    onLoadingComplete?.(result);
  };

  return (
    <Image
      {...props}
      quality={quality}
      placeholder={showPlaceholder ? (blurDataURL ? 'blur' : 'empty') : 'empty'}
      blurDataURL={blurDataURL}
      className={`${className || ''} ${isLoading ? styles.loading : styles.loaded}`}
      onLoadingComplete={handleLoadingComplete}
    />
  );
}
