import React from 'react';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJSelect.css';

export interface MJSelectOption {
  value: string;
  label: string;
}

export interface MJSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'primary' | 'outline' | 'text' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  options: MJSelectOption[];
  placeholder?: string;
  errorMessage?: string;
}

export const MJSelect: React.FC<MJSelectProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  label,
  options,
  placeholder,
  errorMessage,
  ...props
}) => {
  const selectClassName = [
    styles.base,
    styles.variants[errorMessage ? 'danger' : variant],
    styles.sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      {label != null && label !== '' && (
        <div className={styles.labelWrapper}>
          <MJTypography variant="tiny">{label}</MJTypography>
        </div>
      )}
      <select className={selectClassName} {...props}>
        {placeholder != null && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage != null && errorMessage !== '' && (
        <div className={styles.errorMessageWrapper}>
          <MJTypography variant="tiny" className={styles.errorMessage}>
            {errorMessage}
          </MJTypography>
        </div>
      )}
    </div>
  );
};
