'use client';

import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  cloneElement,
  isValidElement,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import * as styles from './styles/MJMenu.css';

const MENU_GAP = 4;

export type MJMenuAnchorOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right' | 'center';
};

export type MJMenuTransformOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right' | 'center';
};

export interface MJMenuItemBase {
  type?: 'item';
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface MJMenuDivider {
  type: 'divider';
}

export type MJMenuItem = MJMenuItemBase | MJMenuDivider;

function isDivider(item: MJMenuItem): item is MJMenuDivider {
  return item.type === 'divider';
}

export interface MJMenuProps {
  /** メニューを開くトリガー要素（1つの子要素） */
  children: React.ReactElement;
  /** メニュー項目（item または type: 'divider'） */
  items: MJMenuItem[];
  /** 開閉状態（省略時は非制御） */
  open?: boolean;
  /** 閉じたときのコールバック（制御時は必須） */
  onClose?: () => void;
  /** 初期 open（非制御時） */
  defaultOpen?: boolean;
  /** アンカーに対するメニューの付く位置 */
  anchorOrigin?: MJMenuAnchorOrigin;
  /** メニューが伸びる基準点（アニメーション用） */
  transformOrigin?: MJMenuTransformOrigin;
  className?: string;
}

const defaultAnchorOrigin: MJMenuAnchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const defaultTransformOrigin: MJMenuTransformOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

function getOriginValue(h: 'left' | 'right' | 'center'): string {
  return h === 'center' ? '50%' : h === 'right' ? '100%' : '0';
}

export const MJMenu: React.FC<MJMenuProps> = ({
  children,
  items,
  open: openProp,
  onClose,
  defaultOpen = false,
  anchorOrigin = defaultAnchorOrigin,
  transformOrigin = defaultTransformOrigin,
  className,
}) => {
  const anchorRef = useRef<HTMLElement | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    transformOriginX: string;
    transformOriginY: string;
    translateX: string;
  } | null>(null);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const handleOpen = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true);
  }, [isControlled]);

  const handleClose = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  const updatePosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el || typeof document === 'undefined') return;
    const rect = el.getBoundingClientRect();
    const av = anchorOrigin.vertical;
    const ah = anchorOrigin.horizontal;
    const tv = transformOrigin.vertical;
    const th = transformOrigin.horizontal;

    let top = av === 'bottom' ? rect.bottom + MENU_GAP : rect.top - MENU_GAP;
    let left = 0;
    if (ah === 'left') left = rect.left;
    else if (ah === 'right') left = rect.right;
    else left = rect.left + rect.width / 2;

    const translateX = ah === 'center' ? 'translateX(-50%)' : 'none';
    setPosition({
      top,
      left,
      transformOriginX: getOriginValue(th),
      transformOriginY: tv === 'top' ? '0' : '100%',
      translateX,
    });
  }, [anchorOrigin, transformOrigin]);

  useLayoutEffect(() => {
    if (open) updatePosition();
    else setPosition(null);
  }, [open, updatePosition]);

  const triggerChild = React.Children.only(children);
  const triggerProps: Record<string, unknown> = {
    ref: (node: HTMLElement | null) => {
      anchorRef.current = node;
      const ref = (triggerChild as React.ReactElement<{ ref?: React.Ref<unknown> }>).ref;
      if (typeof ref === 'function') ref(node);
      else if (ref != null) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    onClick: (e: React.MouseEvent) => {
      handleOpen();
      (triggerChild as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>).props?.onClick?.(e);
    },
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    },
    [handleClose],
  );

  const handleItemClick = useCallback(
    (item: MJMenuItemBase) => {
      if (item.disabled) return;
      item.onClick?.();
      handleClose();
    },
    [handleClose],
  );

  const menuContent =
    open && typeof document !== 'undefined' && position ? (
      <>
        <div
          className={styles.backdrop}
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          role="presentation"
          aria-hidden
        />
        <div
          className={[styles.paper, className].filter(Boolean).join(' ')}
          style={{
            top: position.top,
            left: position.left,
            ['--menu-transform-origin-x' as string]: position.transformOriginX,
            ['--menu-transform-origin-y' as string]: position.transformOriginY,
            ['--menu-translate' as string]: position.translateX,
          }}
          role="menu"
          onKeyDown={handleKeyDown}
        >
          <ul className={styles.list}>
            {items.map((item, index) =>
              isDivider(item) ? (
                <li key={`divider-${index}`} className={styles.listItem} role="separator">
                  <hr className={styles.divider} />
                </li>
              ) : (
                <li key={index} className={styles.listItem} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className={[styles.item, item.disabled && styles.itemDisabled].filter(Boolean).join(' ')}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                  >
                    {item.icon != null && (
                      <span className={styles.itemIcon}>
                        <item.icon size={18} strokeWidth={2} />
                      </span>
                    )}
                    {item.label}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </>
    ) : null;

  const trigger = isValidElement(triggerChild)
    ? cloneElement(triggerChild as React.ReactElement<Record<string, unknown>>, triggerProps)
    : triggerChild;

  return (
    <>
      {trigger}
      {typeof document !== 'undefined' && document.body
        ? createPortal(menuContent, document.body)
        : null}
    </>
  );
};
