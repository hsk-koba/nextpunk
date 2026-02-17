import React from 'react';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJTextarea.css';

export interface MJTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  variant?: 'primary' | 'outline' | 'text' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  errorMessage?: string;
  /** 読み込み中はスケルトン表示・入力無効（ラベル・テキストエリア枠に適用） */
  loading?: boolean;
}

export const MJTextarea: React.FC<MJTextareaProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  label,
  errorMessage,
  loading = false,
  disabled,
  ...props
}) => {
  const textareaClassName = [
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
        <div className={styles.loadingTextareaWrapper}>
          <textarea
            className={textareaClassName}
            disabled={isDisabled}
            aria-busy={loading}
            readOnly
            tabIndex={-1}
            {...props}
          />
          <span className={styles.loadingSkeleton} aria-hidden />
        </div>
      ) : (
        <textarea className={textareaClassName} disabled={disabled} {...props} />
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
