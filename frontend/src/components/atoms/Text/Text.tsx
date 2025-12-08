/**
 * Text Component
 *
 * Basic text component with typography variants.
 */

import styles from './Text.module.scss';

export type TextVariant = 'body' | 'small' | 'caption';

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: 'p' | 'span' | 'div';
  style?: React.CSSProperties;
}

export function Text({
  children,
  variant = 'body',
  className = '',
  as: Component = 'p',
  style,
}: TextProps) {
  return (
    <Component className={`${styles.text} ${styles[variant]} ${className}`} style={style}>
      {children}
    </Component>
  );
}
