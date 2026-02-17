import type { LucideIcon } from 'lucide-react';
import React from 'react';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJInput.css';

export interface MJInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'primary' | 'outline' | 'text' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'start' | 'end';
  className?: string;
  label?: string;
  errorMessage?: string;
}

export const MJInput: React.FC<MJInputProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  className,
  label,
  errorMessage,
  ...props
}) => {
  const inputClassName = [styles.base, styles.variants[errorMessage ? 'danger' : variant], styles.sizes[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      {label != null && label !== '' && (
        <div className={styles.labelWrapper}>
          <MJTypography variant="tiny">{label}</MJTypography>
        </div>
      )}
      <input type="text" className={inputClassName} {...props} />
      {errorMessage != null && errorMessage !== '' && (
        <div className={styles.errorMessageWrapper}>
          <MJTypography variant="tiny" className={styles.errorMessage}>{errorMessage}</MJTypography>
        </div>
      )}
    </div>
  );
};