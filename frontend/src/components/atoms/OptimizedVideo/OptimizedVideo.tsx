/**
 * Optimized Video Component
 *
 * Handles video loading with poster, lazy loading, and format detection.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './OptimizedVideo.module.scss';
import type React from 'react';

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
   * If true, the container fills its parent (no intrinsic padding-bottom).
   * Use when parent already defines box size (e.g. wrappers with aspect-ratio).
   */
  fill?: boolean;

  /**
   * Optional aspect ratio like "16:9" or "4:3" used when fill=false.
   */
  aspectRatio?: string;

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
  fill = false,
  aspectRatio,
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

  const ratio = aspectRatio || '16:9';
  const safeAspectRatio = ratio.replace(':', '/');
  const [w, h] = ratio.split(':').map(Number);
  const pad = w && h ? `${Math.max((h / w) * 100, 1)}%` : '56.25%';

  // Only apply intrinsic sizing when not filling parent.
  const containerStyle = fill
    ? undefined
    : ({
        aspectRatio: safeAspectRatio,
        ['--image-pad' as string]: pad,
      } as React.CSSProperties);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${fill ? styles.fillContainer : ''} ${className || ''}`}
      style={containerStyle}
    >
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
