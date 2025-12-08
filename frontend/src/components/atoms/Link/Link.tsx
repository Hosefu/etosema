/**
 * Link Component
 *
 * Reusable link component with consistent styling.
 */

import NextLink from 'next/link';
import styles from './Link.module.scss';

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function Link({
  href,
  children,
  external = false,
  className,
}: LinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.link} ${className || ''}`}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={`${styles.link} ${className || ''}`}>
      {children}
    </NextLink>
  );
}
