'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { setPinToken } from '@/lib/apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ShortCodePage() {
  const params = useParams();
  const router = useRouter();
  const shortCode = params.shortCode as string;
  const appliedRef = useRef(false);

  useEffect(() => {
    if (shortCode && !appliedRef.current) {
      appliedRef.current = true;

      fetch(`${API_BASE_URL}/api/public/pin/apply-by-shortcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shortCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data && data.data.token) {
            setPinToken(data.data.token);
            router.replace('/'); // Redirect to home
          } else {
            console.error('Failed to apply short code');
            router.replace('/');
          }
        })
        .catch((e) => {
          console.error(e);
          router.replace('/');
        });
    }
  }, [shortCode, router]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
      }}
    >
      Applying access code...
    </div>
  );
}
