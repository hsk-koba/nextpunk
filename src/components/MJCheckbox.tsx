import React, { useState, useCallback } from 'react';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJCheckbox.css';

export interface MJCheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'children'
  > {
  /** チェックボックスの横に表示するテキスト */
  label?: string;
  /** 上に表示するグループラベル（tiny の MJTypography） */
  groupLabel?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
  /** 読み込み中はスケルトン表示・クリック無効 */
  loading?: boolean;
  className?: string;
}

export const MJCheckbox: React.FC<MJCheckboxProps> = ({
  label,
  groupLabel,
  checked = false,
  onChange,
  errorMessage,
  disabled = false,
  loading = false,
  className,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    if (!disabled && !loading) setIsClicked(true);
  }, [disabled, loading]);

  const handleAnimationEnd = useCallback(() => {
    setIsClicked(false);
  }, []);

  const itemClassName = [
    styles.optionItem,
    isClicked ? styles.itemPulse : '',
    loading ? styles.loading : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {groupLabel != null && groupLabel !== '' && (
        <div className={styles.labelWrapper}>
          <MJTypography variant="tiny">{groupLabel}</MJTypography>
        </div>
      )}
      <label
        className={itemClassName}
        onAnimationEnd={handleAnimationEnd}
        onClick={handleClick}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className={styles.boxSkeleton} aria-hidden />
            <span className={styles.labelSkeletonWrapper}>
              <span className={styles.labelPlaceholder}>
                {label ?? '\u00A0'}
              </span>
              <span className={styles.labelSkeleton} aria-hidden />
            </span>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className={styles.input}
              aria-checked={checked}
              {...props}
            />
            <span className={styles.box} aria-hidden />
            {label != null && label !== '' && (
              <span className={styles.optionLabel}>{label}</span>
            )}
          </>
        )}
      </label>
      <div className={styles.errorMessageWrapper}>
        {errorMessage != null && errorMessage !== '' && (
          <MJTypography variant="tiny" className={styles.errorMessage}>
            {errorMessage}
          </MJTypography>
        )}
      </div>
    </div>
  );
};
