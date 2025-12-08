/**
 * useHorizontalScroll Hook
 *
 * Converts vertical mouse wheel scrolling to horizontal scrolling
 * for inline case previews.
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to enable horizontal scrolling with mouse wheel
 *
 * @param enabled - Whether horizontal scroll is enabled
 * @returns Ref to attach to the scrollable container
 */
export function useHorizontalScroll<T extends HTMLElement>(
  enabled: boolean = true
) {
  const scrollRef = useRef<T>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !enabled) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept vertical scrolling
      if (e.deltaY === 0) return;

      // Check if there's horizontal scroll available
      const hasHorizontalScroll =
        element.scrollWidth > element.clientWidth;

      if (hasHorizontalScroll) {
        // Prevent default vertical scroll
        e.preventDefault();

        // Convert vertical delta to horizontal scroll
        element.scrollLeft += e.deltaY;
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [enabled]);

  return scrollRef;
}
