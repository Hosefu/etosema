/**
 * Cases Grid Component
 *
 * Grid display of all portfolio cases.
 */

'use client';

import { CasePreview } from '@/lib/apiClient';
import { CaseCard } from '@/components/molecules/CaseCard/CaseCard';
import styles from './CasesGrid.module.scss';

export interface CasesGridProps {
  cases: CasePreview[];
  onPinSubmit?: (
    pin: string,
    caseSlug: string
  ) => Promise<{ success: boolean; error?: string }>;
  lockedCaseMessage?: string | null;
}

export function CasesGrid({
  cases,
  onPinSubmit,
  lockedCaseMessage,
}: CasesGridProps) {
  return (
    <div className={styles.grid}>
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          case={caseItem}
          onPinSubmit={onPinSubmit}
          lockedCaseMessage={lockedCaseMessage}
        />
      ))}
    </div>
  );
}
