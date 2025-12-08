/**
 * Heading Component
 *
 * Heading component with size variants.
 */

import styles from './Heading.module.scss';

export type HeadingVariant = 'large' | 'small';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  variant?: HeadingVariant;
  level?: HeadingLevel;
}

export function Heading({
  children,
  variant = 'large',
  level = 'h1',
  className = '',
  ...props
}: HeadingProps) {
  const Component = level;

  return (
    <Component className={`${styles.heading} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
