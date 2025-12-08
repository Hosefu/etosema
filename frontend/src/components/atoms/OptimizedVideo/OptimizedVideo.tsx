/**
 * Optimized Video Component
 *
 * Handles video loading with poster, lazy loading, and format detection.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './OptimizedVideo.module.scss';

export interface OptimizedVideoProps {
  src: string;
  poster?: string;
  alt?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  className?: string;

  /**
   * Lazy load video (load when in viewport)
   * Default: true
   */
  lazy?: boolean;

  /**
   * Preload strategy
   * Default: 'metadata' for lazy, 'auto' for eager
   */
  preload?: 'none' | 'metadata' | 'auto';
}

export function OptimizedVideo({
  src,
  poster,
  alt,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  className,
  lazy = true,
  preload,
}: OptimizedVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Load 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const finalPreload = preload || (lazy ? 'metadata' : 'auto');

  return (
    <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          preload={finalPreload}
          onLoadedData={handleLoadedData}
          className={`${styles.video} ${isLoaded ? styles.loaded : styles.loading}`}
          aria-label={alt}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        // Placeholder while waiting to load
        <div className={styles.placeholder}>
          {poster && <img src={poster} alt={alt} className={styles.poster} />}
        </div>
      )}
    </div>
  );
}
