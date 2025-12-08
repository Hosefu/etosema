/**
 * Case Page
 *
 * Individual case display page.
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCaseBySlug, getProfile, CaseDetail, ProfileData } from '@/lib/apiClient';
import { usePinAccess } from '@/lib/hooks/usePinAccess';
import { CaseViewer } from '@/components/organisms/CaseViewer/CaseViewer';
import { PinInput } from '@/components/molecules/PinInput/PinInput';
import { IconLock } from '@/components/atoms/IconLock/IconLock';
import { Text } from '@/components/atoms/Text/Text';
import { Button } from '@/components/atoms/Button/Button';
import { Loader } from '@/components/atoms/Loader/Loader';
import styles from './page.module.scss';

export default function CasePage() {
  const params = useParams();
  const router = useRouter();
  const pinAccess = usePinAccess();

  const slug = params.slug as string;

  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsPin, setNeedsPin] = useState(false);
  const [pinError, setPinError] = useState<string | undefined>();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      setNeedsPin(false);

      try {
        // Parallel fetch
        const [caseRes, profileRes] = await Promise.all([
          getCaseBySlug(slug),
          getProfile()
        ]);

        if (profileRes.data) {
          setProfile(profileRes.data);
        }

        if (caseRes.error) {
          if (caseRes.error.code === 'pin_required') {
            setNeedsPin(true);
          } else {
            setError(caseRes.error.message);
          }
          return;
        }

        setCaseData(caseRes.data || null);
      } catch (err) {
        setError('Failed to load case');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]); // Only refetch when slug changes, PIN handled by handlePinComplete

  const handlePinComplete = async (pin: string) => {
    setPinError(undefined);

    const result = await pinAccess.applyPinCode(pin);

    if (!result.success) {
      setPinError(result.error || 'Invalid PIN');
    } else {
      // Refetch case
      const response = await getCaseBySlug(slug);
      if (response.data) {
        setCaseData(response.data);
        setNeedsPin(false);
      }
    }
  };

  const renderLockedMessage = () => {
    const text = profile?.lockedCaseMessage || 'This case requires a PIN to access.';
    console.log('renderLockedMessage called, profile:', profile, 'text:', text);
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

    return (
      <Text variant="body" style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
        {parts.map((part, i) => {
          const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (match) {
            return (
              <a
                key={i}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: 'inherit' }}
              >
                {match[1]}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </Text>
    );
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
        <div className={styles.error}>
          <Text>Error: {error}</Text>
          <Button onClick={() => router.push('/')}>Back to Works</Button>
        </div>
      </div>
    );
  }

  if (needsPin) {
    return (
      <div className={styles.page}>
        <div className={styles.ndaScreen}>
          <IconLock size={48} />
          <PinInput
            onComplete={handlePinComplete}
            error={pinError}
            onErrorClear={() => setPinError(undefined)}
          />
          {renderLockedMessage()}
          <Button variant="secondary" onClick={() => router.push('/')}>
            Back to Works
          </Button>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <Text>Case not found</Text>
          <Button onClick={() => router.push('/')}>Back to Works</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <CaseViewer case={caseData} />
    </div>
  );
}
