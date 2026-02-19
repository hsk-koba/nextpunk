'use client';

import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import type { MJSidebarItemProps, MJSidebarAccountInfo } from './MJSidebar';
import { MJMenu, type MJMenuItem } from './MJMenu';
import { MJAvatar } from './MJAvatar';
import * as styles from './styles/MJHeader.css';
import * as buttonStyles from './styles/MJButton.css';

export interface MJHeaderProps {
  /** 左側ロゴ（省略時は logoText のみ表示可能） */
  logo?: React.ReactNode;
  /** ロゴ横のテキスト（logo 未指定時用） */
  logoText?: string;
  /** ナビゲーション項目（MJSidebar と同じ型） */
  items: MJSidebarItemProps[];
  /** アカウント情報（MJSidebar と同じ型） */
  accountInfo: MJSidebarAccountInfo;
  /** 選択中ナビの id */
  selectedItemId?: string;
  onItemClick?: (item: MJSidebarItemProps) => void;
  onNavigatePath?: (path: string) => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

export const MJHeader: React.FC<MJHeaderProps> = ({
  logo,
  logoText = 'OctoHub',
  items,
  accountInfo,
  selectedItemId,
  onItemClick,
  onNavigatePath,
  onProfileClick,
  onLogout,
  className,
}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

  const handleItemClick = (item: MJSidebarItemProps) => {
    if (item.disabled) return;
    onItemClick?.(item);
  };

  const accountMenuItems: MJMenuItem[] = [
    {
      label: 'プロフィール設定',
      icon: User,
      onClick: () => {
        onProfileClick?.();
        setAccountMenuOpen(false);
      },
    },
    { type: 'divider' },
    {
      label: 'ログアウト',
      icon: LogOut,
      onClick: () => {
        onLogout?.();
        setAccountMenuOpen(false);
      },
    },
  ];

  return (
    <header
      className={[styles.root, className].filter(Boolean).join(' ')}
      role="banner"
    >
      <div className={styles.left}>
        <div className={styles.logoBox}>
          {logo != null ? logo : <span className={styles.logoText}>{logoText}</span>}
        </div>
        <nav className={styles.navRow} aria-label="メインナビゲーション">
          {items.map((item) => (
            item.popupMenu && item.popupMenu.length > 0 ? (
              <MJMenu
                key={item.id}
                items={item.popupMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <button
                  type="button"
                  className={[
                    styles.navButton,
                    selectedItemId === item.id && styles.navButtonSelected,
                    clickedId === item.id && buttonStyles.buttonBrightnessPulseAnimation,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={item.disabled}
                  title={item.label}
                  onClick={() => !item.disabled && setTimeout(() => setClickedId(item.id), 0)}
                  onAnimationEnd={() => setClickedId(null)}
                >
                  <span className={styles.navButtonIcon}>
                    <item.icon size={20} strokeWidth={2} />
                  </span>
                  <span className={styles.navButtonText}>{item.label}</span>
                </button>
              </MJMenu>
            ) : (
              <button
                key={item.id}
                type="button"
                className={[
                  styles.navButton,
                  selectedItemId === item.id && styles.navButtonSelected,
                  clickedId === item.id && buttonStyles.buttonBrightnessPulseAnimation,
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={item.disabled}
                title={item.label}
                onClick={() => {
                  if (item.disabled) return;
                  setTimeout(() => setClickedId(item.id), 0);
                  item.onClick?.();
                  if (item.path && onNavigatePath) onNavigatePath(item.path);
                  handleItemClick(item);
                }}
                onAnimationEnd={() => setClickedId(null)}
              >
                <span className={styles.navButtonIcon}>
                  <item.icon size={20} strokeWidth={2} />
                </span>
                <span className={styles.navButtonText}>{item.label}</span>
              </button>
            )
          ))}
        </nav>
      </div>

      <div className={styles.right}>
        <MJMenu
          items={accountMenuItems}
          open={accountMenuOpen}
          onClose={() => setAccountMenuOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <button
            type="button"
            className={[
              styles.accountButton,
              clickedId === 'account' && buttonStyles.buttonBrightnessPulseAnimation,
            ]
              .filter(Boolean)
              .join(' ')}
            title={`${accountInfo.name}${accountInfo.email ? ` (${accountInfo.email})` : ''}`}
            onClick={() => {
              setTimeout(() => setClickedId('account'), 0);
              setAccountMenuOpen(true);
            }}
            onAnimationEnd={() => setClickedId(null)}
          >
            <div className={styles.accountInfo}>
              <MJAvatar
                src={accountInfo.avatar ?? undefined}
                initials={accountInfo.name}
                size="sm"
              />
              <div className={styles.accountDetails}>
                <div className={styles.accountName}>{accountInfo.name}</div>
                {accountInfo.email != null && accountInfo.email !== '' && (
                  <div className={styles.accountEmail}>{accountInfo.email}</div>
                )}
              </div>
            </div>
          </button>
        </MJMenu>
      </div>
    </header>
  );
};
