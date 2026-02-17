import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import * as styles from './styles/MJButton.css';
import { MJTypography } from './MJTypography';

type MJButtonVariant = 'primary' | 'outline' | 'text' | 'danger' | 'default';
type MJButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'start' | 'end';

const ICON_SIZE = 20;

export interface MJButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MJButtonVariant;
  size?: MJButtonSize;
  /** lucide-react のアイコンコンポーネント（例: Plus, ChevronRight） */
  icon?: LucideIcon;
  iconPosition?: IconPosition;
  /** 読み込み中はクリック無効。spinner: スピナーのみ / skeleton: スケルトンアニメーション */
  loading?: boolean;
  /** loading 時の表示（未指定時は spinner） */
  loadingVariant?: 'spinner' | 'skeleton';
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

export const MJButton = React.forwardRef<HTMLButtonElement, MJButtonProps>(function MJButton(
  {
    label,
    onClick,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'start',
    loading = false,
    loadingVariant = 'spinner',
    className,
    children,
    type = 'button',
    disabled,
    ...props
  },
  ref,
) {
  const [isClicked, setIsClicked] = useState(false);
  const isDisabled = disabled || loading;
  const buttonClassName = [
    styles.base,
    styles.variants[variant],
    styles.sizes[size],
    isClicked && styles.buttonBrightnessPulseAnimation,
    loading && styles.loading,
    loading && styles.loadingContainer,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(false);
    if (isDisabled) return;
    setTimeout(() => setIsClicked(true), 0);
    onClick?.(e);
  };

  const inner = children ?? label;
  const renderIconEl = () => {
    if (!icon) return null;
    const IconComponent = icon;
    return (
      <span className={styles.icon} aria-hidden>
        <IconComponent size={ICON_SIZE} />
      </span>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className={styles.loadingPlaceholder} aria-hidden>
            {icon && iconPosition === 'start' && renderIconEl()}
            <MJTypography variant="p" className={styles.content}>{inner}</MJTypography>
            {icon && iconPosition === 'end' && renderIconEl()}
          </span>
          {loadingVariant === 'skeleton' ? (
            <span className={styles.loadingSkeleton} aria-hidden />
          ) : (
            <span className={styles.loadingSpinnerOverlay}>
              <span className={styles.loadingSpinner} aria-hidden />
            </span>
          )}
        </>
      );
    }
    if (!icon) return inner;
    return (
      <>
        {iconPosition === 'start' && renderIconEl()}
        <MJTypography variant="p" className={styles.content}>{inner}</MJTypography>
        {iconPosition === 'end' && renderIconEl()}
      </>
    );
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={buttonClassName}
      onAnimationEnd={() => setIsClicked(false)}
      aria-busy={loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
});
