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
}

export const MJTextarea: React.FC<MJTextareaProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  label,
  errorMessage,
  ...props
}) => {
  const textareaClassName = [
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
      <textarea className={textareaClassName} {...props} />
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
