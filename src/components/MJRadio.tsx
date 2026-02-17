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
  className,
}) => {
  const [clickedValue, setClickedValue] = useState<string | null>(null);

  const handleOptionClick = useCallback(
    (optValue: string) => {
      if (!disabled) setClickedValue(optValue);
    },
    [disabled],
  );

  const handleAnimationEnd = useCallback(() => {
    setClickedValue(null);
  }, []);

  return (
    <div className={className}>
      {label != null && label !== '' && (
        <div className={styles.labelWrapper}>
          <MJTypography variant="tiny">{label}</MJTypography>
        </div>
      )}
      <div className={styles.group} role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              styles.optionItem,
              clickedValue === opt.value ? styles.optionItemPulse : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onAnimationEnd={handleAnimationEnd}
            onClick={() => handleOptionClick(opt.value)}
          >
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
