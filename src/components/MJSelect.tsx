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
  /** 読み込み中はスケルトン表示・選択無効（ラベル・セレクト枠に適用） */
  loading?: boolean;
}

export const MJSelect: React.FC<MJSelectProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  label,
  options,
  placeholder,
  errorMessage,
  loading = false,
  disabled,
  ...props
}) => {
  const selectClassName = [
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
        <div className={styles.loadingSelectWrapper}>
          <select
            className={selectClassName}
            disabled={isDisabled}
            aria-busy={loading}
            tabIndex={-1}
            {...props}
          >
            {placeholder != null && (
              <option value="">{placeholder}</option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.loadingSkeleton} aria-hidden />
        </div>
      ) : (
        <select className={selectClassName} disabled={disabled} {...props}>
          {placeholder != null && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
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
