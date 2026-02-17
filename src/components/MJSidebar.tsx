'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { User, LogOut } from 'lucide-react';
import * as styles from './styles/MJSidebar.css';
import * as buttonStyles from './styles/MJButton.css';
import { MJMenu, type MJMenuItem } from './MJMenu';
import { MJAvatar } from './MJAvatar';

export interface MJSidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
  /** クリック時にこのメニューを表示（ある場合は path/onClick の代わりにメニューを開く） */
  popupMenu?: MJMenuItem[];
}

export interface MJSidebarAccountInfo {
  name: string;
  email?: string;
  avatar?: string | null;
  role?: string;
}

export interface MJSidebarProps {
  logo?: React.ReactNode;
  logoText?: string;
  items: MJSidebarItemProps[];
  accountInfo: MJSidebarAccountInfo;
  selectedItemId?: string;
  onItemClick?: (item: MJSidebarItemProps) => void;
  /** path を持つ項目のクリック時に path を渡す。親で router.push(path) などに利用 */
  onNavigatePath?: (path: string) => void;
  /** アカウントボタンクリック時はメニューを開く。プロフィール／ログアウトは下記で処理 */
  onProfileClick?: () => void;
  onLogout?: () => void;
  collapsed?: boolean;
  width?: number;
  collapsedWidth?: number;
  className?: string;
}

const DEFAULT_WIDTH = 280;

export const MJSidebar: React.FC<MJSidebarProps> = ({
  logo,
  logoText = 'OctoHub',
  items,
  accountInfo,
  selectedItemId,
  onItemClick,
  onNavigatePath,
  onProfileClick,
  onLogout,
  width = DEFAULT_WIDTH,
  className,
}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const sidebarWidth = width;

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
    {
      type: 'divider',
    },
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
    <aside
      className={[styles.sidebar, className].filter(Boolean).join(' ')}
      style={{ width: sidebarWidth }}
    >
      {/* Logo */}
      <div className={[styles.logoSection, styles.logoSectionExpanded].filter(Boolean).join(' ')}>
        <div className={styles.logoBox}>
          <img src={"/nextpunk-clear.png"} alt={"NEXTPUNK"} width={250} height={90} />
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.navSection}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.listItem}>
              {item.popupMenu && item.popupMenu.length > 0 ? (
                <MJMenu
                  items={item.popupMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                  <button
                    type="button"
                    className={[
                      styles.listItemButton,
                      selectedItemId === item.id && styles.listItemButtonSelected,
                      clickedId === item.id && buttonStyles.buttonBrightnessPulseAnimation,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    disabled={item.disabled}
                    title={item.label}
                    onClick={() => !item.disabled && setTimeout(() => setClickedId(item.id), 0)}
                    onAnimationEnd={() => setClickedId(null)}
                  >
                    <span className={styles.listItemIcon}>
                      <item.icon size={20} strokeWidth={2} />
                    </span>
                      <>
                        <span className={styles.listItemText}>{item.label}</span>
                        {item.badge != null && (
                          <span className={[styles.badge].filter(Boolean).join(' ')}>
                            {item.badge}
                          </span>
                        )}
                      </>
                  </button>
                </MJMenu>
              ) : (
                <button
                  type="button"
                  className={[
                    styles.listItemButton,
                    selectedItemId === item.id && styles.listItemButtonSelected,
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
                  <span className={styles.listItemIcon}>
                    <item.icon size={20} strokeWidth={2} />
                  </span>
                    <>
                      <span className={styles.listItemText}>{item.label}</span>
                      {item.badge != null && (
                        <span className={[styles.badge].filter(Boolean).join(' ')}>
                          {item.badge}
                        </span>
                      )}
                    </>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Account */}
      <div className={styles.accountSection}>
        <MJMenu
          items={accountMenuItems}
          open={accountMenuOpen}
          onClose={() => setAccountMenuOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                size={'md'}
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
    </aside>
  );
};
