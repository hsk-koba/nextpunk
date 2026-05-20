'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type RefObject,
} from 'react';

export const POPOVER_GAP = 4;

export interface PopoverPosition {
  top: number;
  left: number;
  transformOriginX: string;
  transformOriginY: string;
  translateX: string;
}

export interface UsePopoverOptions {
  anchorRef: RefObject<HTMLElement | null>;
  /** 閉じアニメーション完了後（アンマウント直前） */
  onCloseComplete?: () => void;
  gap?: number;
}

export function usePopover({
  anchorRef,
  onCloseComplete,
  gap = POPOVER_GAP,
}: UsePopoverOptions) {
  const closeEndFiredRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [position, setPosition] = useState<PopoverPosition | null>(null);

  const updatePosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el || typeof document === 'undefined') return;
    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.bottom + gap,
      left: rect.left,
      transformOriginX: '0',
      transformOriginY: '0',
      translateX: 'none',
    });
  }, [anchorRef, gap]);

  useEffect(() => {
    if (!open) setIsClosing(false);
  }, [open]);

  useLayoutEffect(() => {
    if (open && !isClosing) {
      updatePosition();
    }
    if (!open && !isClosing) setPosition(null);
  }, [open, isClosing, updatePosition]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseRequest = useCallback(() => {
    closeEndFiredRef.current = false;
    setIsClosing(true);
  }, []);

  const handleCloseEnd = useCallback(() => {
    if (closeEndFiredRef.current) return;
    closeEndFiredRef.current = true;
    setOpen(false);
    setIsClosing(false);
    onCloseComplete?.();
  }, [onCloseComplete]);

  const handleOverlayAnimationEnd = useCallback(
    (e: AnimationEvent, closing: boolean) => {
      if (e.target !== e.currentTarget) return;
      if (closing) handleCloseEnd();
    },
    [handleCloseEnd],
  );

  const getPaperStyle = useCallback((): CSSProperties | undefined => {
    if (!position) return undefined;
    return {
      top: position.top,
      left: position.left,
      ['--menu-transform-origin-x' as string]: position.transformOriginX,
      ['--menu-transform-origin-y' as string]: position.transformOriginY,
      ['--menu-translate' as string]: position.translateX,
    };
  }, [position]);

  const showPortal =
    (open || isClosing) && typeof document !== 'undefined' && position != null;

  return {
    open,
    isClosing,
    position,
    showPortal,
    handleOpen,
    handleCloseRequest,
    handleCloseEnd,
    handleOverlayAnimationEnd,
    updatePosition,
    getPaperStyle,
    setOpen,
  };
}
