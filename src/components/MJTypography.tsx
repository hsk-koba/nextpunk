import React from 'react';
import * as styles from './styles/MJTypography.css';

interface MJTypographyProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'tiny';
  className?: string;
  bold?: boolean;
  /** 読み込み中はテキストの代わりにスケルトンバーを表示 */
  loading?: boolean;
}

export const MJTypography: React.FC<MJTypographyProps> = ({
  children,
  variant,
  bold,
  className,
  loading = false,
}) => {
  const rootClassName = [
    styles.typography[variant],
    bold && styles.typographyBold['bold'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (loading) {
    return (
      <div className={rootClassName}>
        <span className={styles.loadingWrapper}>
          <span className={styles.textPlaceholder}>{children}</span>
          <span className={styles.skeletonBar} aria-hidden />
        </span>
      </div>
    );
  }

  return <div className={rootClassName}>{children}</div>;
};