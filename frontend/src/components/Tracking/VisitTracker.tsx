'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const search = searchParams?.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    if (!path || path.startsWith('/admin') || path.startsWith('/miniapp')) return;
    if (lastPathRef.current === path) return;

    lastPathRef.current = path;
    fetch(`${API_BASE_URL}/api/public/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, action: 'page_view' }),
    }).catch(() => null);
  }, [pathname, searchParams]);

  return null;
}
