import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import * as styles from './styles/MJButton.css';

type MJIconButtonVariant = 'primary' | 'outline' | 'text' | 'danger' | 'default';
type MJIconButtonSize = 'sm' | 'md' | 'lg';

export interface MJIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MJIconButtonVariant;
  size?: MJIconButtonSize;
  /** lucide-react のアイコンコンポーネント（例: Plus, ChevronRight） */
  icon?: LucideIcon;
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
  className,
  children,
  type = 'button',
  disabled,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const buttonClassName = [
    styles.baseIcon[size],
    styles.variants[variant],
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
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 32;

    const IconComponent = icon;
    const iconEl = (
      <span className={styles.icon} aria-hidden>
        <IconComponent size={iconSize} />
      </span>
    );

    return (
      <>
        {iconEl}
      </>
    );
  };

  return (
    <button
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
};