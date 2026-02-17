import React from 'react';
import * as styles from './styles/MJTypography.css';

interface MJTypographyProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'tiny';
  className?: string;
  bold?: boolean;
}

export const MJTypography: React.FC<MJTypographyProps> = ({ children, variant, bold, className }) => {
  return <div className={[styles.typography[variant], bold && styles.typographyBold["bold"], className].join(' ')}>{children}</div>;
};