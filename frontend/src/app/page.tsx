'use client';

import { CasesGrid } from '@/components/organisms/CasesGrid/CasesGrid';
import { usePinAccess } from '@/lib/hooks/usePinAccess';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useCases, useProfile, useApplyPin } from '@/hooks/useApi';
import styles from './page.module.scss';

export default function WorksPage() {
  const pinAccess = usePinAccess();
  const { data: cases, isLoading: casesLoading, error: casesError } = useCases();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const applyPinMutation = useApplyPin();

  const loading = casesLoading || profileLoading;
  const error = casesError ? (casesError as Error).message : null;
  const lockedCaseMessage = profile?.lockedCaseMessage || null;

  const handlePinSubmit = async (pin: string, caseSlug: string) => {
    const result = await pinAccess.applyPinCode(pin);

    if (result.success) {
      // Trigger React Query mutation to update cache
      await applyPinMutation.mutateAsync(pin).catch(() => {
        // Ignore errors - PIN was already applied via pinAccess
      });
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
        cases={cases || []}
        onPinSubmit={handlePinSubmit}
        lockedCaseMessage={lockedCaseMessage}
      />
    </div>
  );
}
