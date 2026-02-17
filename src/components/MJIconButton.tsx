import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import * as styles from './styles/MJIconButton.css';

type MJIconButtonVariant = 'primary' | 'outline' | 'text' | 'danger' | 'default';
type MJIconButtonSize = 'sm' | 'md' | 'lg';

export interface MJIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MJIconButtonVariant;
  size?: MJIconButtonSize;
  /** lucide-react のアイコンコンポーネント（例: Plus, ChevronRight） */
  icon?: LucideIcon;
  /** 読み込み中はクリック無効。spinner: スピナーのみ / skeleton: スケルトンアニメーション */
  loading?: boolean;
  /** loading 時の表示（未指定時は spinner） */
  loadingVariant?: 'spinner' | 'skeleton';
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

export const MJIconButton: React.FC<MJIconButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  loadingVariant = 'spinner',
  className,
  children,
  type = 'button',
  disabled,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const isDisabled = disabled || loading;
  const buttonClassName = [
    styles.baseIcon[size],
    styles.variants[variant],
    isDisabled && styles.disabledState,
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

  const renderContent = () => {
    if (loading) {
      if (loadingVariant === 'skeleton') {
        return <span className={styles.loadingSkeleton} aria-hidden />;
      }
      return (
        <span className={styles.loadingSpinnerOverlay}>
          <span className={styles.loadingSpinner} aria-hidden />
        </span>
      );
    }
    const inner = children ?? label;
    if (!icon) return inner;
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 32;
    const IconComponent = icon;
    return (
      <span className={styles.icon} aria-hidden>
        <IconComponent size={iconSize} />
      </span>
    );
  };

  return (
    <button
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
};