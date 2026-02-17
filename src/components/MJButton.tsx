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
    className,
    children,
    type = 'button',
    disabled,
    ...props
  },
  ref,
) {
  const [isClicked, setIsClicked] = useState(false);
  const buttonClassName = [
    styles.base,
    styles.variants[variant],
    styles.sizes[size],
    isClicked && styles.buttonBrightnessPulseAnimation,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(false);
    if (disabled) return;
    setTimeout(() => setIsClicked(true), 0);
    onClick?.(e);
  };

  const renderContent = () => {
    const inner = children ?? label;
    if (!icon) return inner;

    const IconComponent = icon;
    const iconEl = (
      <span className={styles.icon} aria-hidden>
        <IconComponent size={ICON_SIZE} />
      </span>
    );

    return (
      <>
        {iconPosition === 'start' && iconEl}
        <MJTypography variant="p" className={styles.content}>{inner}</MJTypography>
        {iconPosition === 'end' && iconEl}
      </>
    );
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={buttonClassName}
      onAnimationEnd={() => setIsClicked(false)}
      {...props}
    >
      {renderContent()}
    </button>
  );
});
