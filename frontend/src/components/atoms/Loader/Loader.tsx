/**
 * Loader Component
 *
 * A simple loading spinner.
 */

'use client';

import styles from './Loader.module.scss';

export interface LoaderProps {
  size?: number;
}

export function Loader({ size = 40 }: LoaderProps) {
  return (
    <div className={styles.loader} style={{ width: size, height: size }}>
      <div className={styles.spinner} />
    </div>
  );
}
