import React from 'react';
import * as styles from './styles/MJCard.css';
import { MJTypography } from './MJTypography';

export type MJCardVariant = 'elevated' | 'outlined' | 'gradient';

export interface MJCardProps {
  /** カードの見た目 */
  variant?: MJCardVariant;
  /** ヘッダー（タイトルなど） */
  title?: React.ReactNode;
  /** メインコンテンツ */
  children: React.ReactNode;
  /** フッター */
  footer?: React.ReactNode;
  /** ルート要素の class */
  className?: string;
  /** クリック可能にする場合のコールバック（指定時は role="button" などで扱う想定） */
  onClick?: () => void;
}

export const MJCard: React.FC<MJCardProps> = ({
  variant = 'elevated',
  title,
  children,
  footer,
  className,
  onClick,
}) => {
  const rootClass = [
    styles.root[variant],
    onClick && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {title != null && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
      {footer != null && <div className={styles.footer}>{footer}</div>}
    </>
  );

  const wrappedContent =
    variant === 'gradient' ? (
      <div className={styles.gradientInner}>{content}</div>
    ) : (
      content
    );

  return (
    <div
      className={rootClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {wrappedContent}
    </div>
  );
};
