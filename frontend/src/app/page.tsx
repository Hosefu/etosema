'use client';

import { useEffect, useState } from 'react';
import { getCases, CasePreview, getProfile } from '@/lib/apiClient';
import { CasesGrid } from '@/components/organisms/CasesGrid/CasesGrid';
import { usePinAccess } from '@/lib/hooks/usePinAccess';
import { Loader } from '@/components/atoms/Loader/Loader';
import styles from './page.module.scss';

export default function WorksPage() {
  const pinAccess = usePinAccess();
  const [cases, setCases] = useState<CasePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lockedCaseMessage, setLockedCaseMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [casesResponse, profileResponse] = await Promise.all([
          getCases(),
          getProfile()
        ]);

        if (casesResponse.error) {
          setError(casesResponse.error.message);
          return;
        }

        setCases(casesResponse.data || []);
        setLockedCaseMessage(profileResponse.data?.lockedCaseMessage || null);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePinSubmit = async (pin: string, caseSlug: string) => {
    const result = await pinAccess.applyPinCode(pin);

    if (result.success) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const response = await getCases();
      if (response.data) {
        setCases(response.data);
      }
    }

    return result;
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        backgroundColor: 'var(--color-bg-page, #fff)'
      }}>
        <Loader size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <CasesGrid
        cases={cases}
        onPinSubmit={handlePinSubmit}
        lockedCaseMessage={lockedCaseMessage}
      />
    </div>
  );
}
