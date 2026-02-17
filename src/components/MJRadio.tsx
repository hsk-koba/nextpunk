import React, { useState, useCallback } from 'react';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJRadio.css';

export interface MJRadioOption {
  value: string;
  label: string;
}

export interface MJRadioProps {
  name: string;
  options: MJRadioOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  /** 読み込み中はスケルトン表示・クリック無効（ラベル・各オプションの円と文字に適用） */
  loading?: boolean;
  className?: string;
}

export const MJRadio: React.FC<MJRadioProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  errorMessage,
  disabled = false,
  loading = false,
  className,
}) => {
  const [clickedValue, setClickedValue] = useState<string | null>(null);

  const handleOptionClick = useCallback(
    (optValue: string) => {
      if (!disabled && !loading) setClickedValue(optValue);
    },
    [disabled, loading],
  );

  const handleAnimationEnd = useCallback(() => {
    setClickedValue(null);
  }, []);

  return (
    <div className={className}>
      {label != null && label !== '' &&
        (loading ? (
          <div className={styles.groupLabelSkeletonWrapper}>
            <span className={styles.groupLabelPlaceholder}>{label}</span>
            <span className={styles.groupLabelSkeleton} aria-hidden />
          </div>
        ) : (
          <div className={styles.labelWrapper}>
            <MJTypography variant="tiny">{label}</MJTypography>
          </div>
        ))}
      <div className={styles.group} role="radiogroup" aria-label={label} aria-busy={loading}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              styles.optionItem,
              loading ? styles.loading : '',
              clickedValue === opt.value ? styles.optionItemPulse : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onAnimationEnd={handleAnimationEnd}
            onClick={() => handleOptionClick(opt.value)}
          >
            {loading ? (
              <>
                <span className={styles.circleSkeleton} aria-hidden />
                <span className={styles.labelSkeletonWrapper}>
                  <span className={styles.labelPlaceholder}>{opt.label}</span>
                  <span className={styles.labelSkeleton} aria-hidden />
                </span>
              </>
            ) : (
              <>
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  disabled={disabled}
                  className={styles.input}
                  aria-checked={value === opt.value}
                />
                <span className={styles.circle} aria-hidden />
                <span className={styles.optionLabel}>{opt.label}</span>
              </>
            )}
          </label>
        ))}
      </div>
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
