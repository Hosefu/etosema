/**
 * Lock Icon Component
 *
 * Simple lock SVG icon for NDA cases.
 */

import styles from './IconLock.module.scss';

export interface IconLockProps {
  size?: number;
  className?: string;
}

export function IconLock({ size = 24, className = '' }: IconLockProps) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14V16M8 21H16C17.1046 21 18 20.1046 18 19V12C18 10.8954 17.1046 10 16 10H8C6.89543 10 6 10.8954 6 12V19C6 20.1046 6.89543 21 8 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
