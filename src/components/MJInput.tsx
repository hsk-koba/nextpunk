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
  /** 読み込み中はスケルトン表示・入力無効 */
  loading?: boolean;
}

export const MJInput: React.FC<MJInputProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  className,
  label,
  errorMessage,
  loading = false,
  disabled,
  type = 'text',
  ...props
}) => {
  const inputClassName = [
    styles.base,
    styles.variants[errorMessage ? 'danger' : variant],
    styles.sizes[size],
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;

  return (
    <div>
      {label != null && label !== '' &&
        (loading ? (
          <div className={styles.labelSkeletonWrapper}>
            <span className={styles.labelPlaceholder}>{label}</span>
            <span className={styles.labelSkeleton} aria-hidden />
          </div>
        ) : (
          <div className={styles.labelWrapper}>
            <MJTypography variant="tiny">{label}</MJTypography>
          </div>
        ))}
      {loading ? (
        <div className={styles.loadingInputWrapper}>
          <input
            type={type}
            className={inputClassName}
            disabled={isDisabled}
            aria-busy={loading}
            readOnly
            tabIndex={-1}
            {...props}
          />
          <span className={styles.loadingSkeleton} aria-hidden />
        </div>
      ) : (
        <input type={type} className={inputClassName} disabled={disabled} {...props} />
      )}
      {errorMessage != null && errorMessage !== '' && (
        <div className={styles.errorMessageWrapper}>
          <MJTypography variant="tiny" className={styles.errorMessage}>{errorMessage}</MJTypography>
        </div>
      )}
    </div>
  );
};