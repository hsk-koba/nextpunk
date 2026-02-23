'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { MJInput } from './MJInput';
import { MJButton } from './MJButton';
import * as styles from './styles/MJTimePicker.css';

const MENU_GAP = 4;
const ROW_HEIGHT = 40;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function toTimeValue(value: Date | string | null | undefined): { hours: number; minutes: number } | null {
  if (value == null) return null;
  if (typeof value === 'string') {
    const m = value.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (h < 0 || h > 23 || min < 0 || min > 59) return null;
    return { hours: h, minutes: min };
  }
  return {
    hours: value.getHours(),
    minutes: value.getMinutes(),
  };
}

function formatHHMM(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function toDateWithTime(hours: number, minutes: number): Date {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

export interface MJTimePickerProps {
  value?: Date | string | null;
  onChange?: (time: Date | null) => void;
  variant?: 'primary' | 'outline' | 'text' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  /** 必須（フォームバリデーション・aria-required） */
  required?: boolean;
}

export const MJTimePicker: React.FC<MJTimePickerProps> = ({
  value,
  onChange,
  variant = 'primary',
  size = 'md',
  className,
  label,
  errorMessage,
  disabled = false,
  loading = false,
  placeholder = '時刻を選択',
  required = false,
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const hoursScrollRef = useRef<HTMLDivElement | null>(null);
  const minutesScrollRef = useRef<HTMLDivElement | null>(null);
  const closeEndFiredRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    transformOriginX: string;
    transformOriginY: string;
    translateX: string;
  } | null>(null);

  const parsed = toTimeValue(value);
  const [internalHours, setInternalHours] = useState(() => parsed?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = useState(() => parsed?.minutes ?? 0);

  const isControlled = value !== undefined;
  const displayHours = isControlled && parsed != null ? parsed.hours : internalHours;
  const displayMinutes = isControlled && parsed != null ? parsed.minutes : internalMinutes;

  const updatePosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el || typeof document === 'undefined') return;
    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.bottom + MENU_GAP,
      left: rect.left,
      transformOriginX: '0',
      transformOriginY: '0',
      translateX: 'none',
    });
  }, []);

  useEffect(() => {
    if (!open) setIsClosing(false);
  }, [open]);

  useLayoutEffect(() => {
    if (open && !isClosing) {
      updatePosition();
      setInternalHours(displayHours);
      setInternalMinutes(displayMinutes);
    }
    if (!open && !isClosing) setPosition(null);
  }, [open, isClosing, updatePosition, displayHours, displayMinutes]);

  useLayoutEffect(() => {
    if (!open || isClosing) return;
    const syncScroll = () => {
      if (hoursScrollRef.current) {
        hoursScrollRef.current.scrollTop = displayHours * ROW_HEIGHT;
      }
      if (minutesScrollRef.current) {
        minutesScrollRef.current.scrollTop = displayMinutes * ROW_HEIGHT;
      }
    };
    syncScroll();
    const t = requestAnimationFrame(syncScroll);
    return () => cancelAnimationFrame(t);
  }, [open, isClosing, displayHours, displayMinutes]);

  const handleOpen = useCallback(() => {
    if (disabled || loading) return;
    setOpen(true);
    setInternalHours(displayHours);
    setInternalMinutes(displayMinutes);
  }, [disabled, loading, displayHours, displayMinutes]);

  const handleCloseRequest = useCallback(() => {
    closeEndFiredRef.current = false;
    setIsClosing(true);
  }, []);

  const handleCloseEnd = useCallback(() => {
    if (closeEndFiredRef.current) return;
    closeEndFiredRef.current = true;
    setOpen(false);
    setIsClosing(false);
  }, []);

  const handleScroll = useCallback(
    (type: 'hours' | 'minutes') => {
      const el = type === 'hours' ? hoursScrollRef.current : minutesScrollRef.current;
      if (!el) return;
      const index = Math.round(el.scrollTop / ROW_HEIGHT);
      const clamped = type === 'hours'
        ? Math.max(0, Math.min(23, index))
        : Math.max(0, Math.min(59, index));
      if (type === 'hours') {
        setInternalHours(clamped);
      } else {
        setInternalMinutes(clamped);
      }
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    const d = toDateWithTime(internalHours, internalMinutes);
    onChange?.(d);
    handleCloseRequest();
  }, [internalHours, internalMinutes, onChange, handleCloseRequest]);

  const displayValue = formatHHMM(displayHours, displayMinutes);

  const showPortal =
    (open || isClosing) && typeof document !== 'undefined' && position;
  const popoverContent = showPortal ? (
    <>
      <div
        className={[styles.backdrop, isClosing ? styles.backdropClosing : styles.backdropOpen].join(' ')}
        onClick={handleCloseRequest}
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (isClosing) handleCloseEnd();
        }}
        role="presentation"
        aria-hidden
      />
      <div
        className={[styles.paper, isClosing ? styles.paperClosing : styles.paperOpen].join(' ')}
        style={{
          top: position!.top,
          left: position!.left,
          ['--menu-transform-origin-x' as string]: position!.transformOriginX,
          ['--menu-transform-origin-y' as string]: position!.transformOriginY,
          ['--menu-translate' as string]: position!.translateX,
        }}
        role="dialog"
        aria-label="時刻を選択"
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (isClosing) handleCloseEnd();
        }}
      >
        <div className={styles.selectedTimeDisplay} aria-live="polite" aria-atomic="true">
          {formatHHMM(internalHours, internalMinutes)}
        </div>
        <div className={styles.wheelLabelsRow}>
          <div className={styles.wheelLabelCell}>時</div>
          <div className={styles.wheelLabelCell}>分</div>
        </div>
        <div className={styles.wheelWrap}>
          <div className={styles.wheelColumn}>
            <div className={styles.wheelHighlight} aria-hidden />
            <div
              ref={hoursScrollRef}
              className={styles.wheelScroll}
              onScroll={() => handleScroll('hours')}
            >
              {[0, 1].map((i) => (
                <div key={`pad-${i}`} className={styles.wheelRowPad}>
                  —
                </div>
              ))}
              {HOURS.map((h) => (
                <div key={h} className={styles.wheelRow}>
                  {String(h).padStart(2, '0')}
                </div>
              ))}
              {[0, 1].map((i) => (
                <div key={`pad-b-${i}`} className={styles.wheelRowPad}>
                  —
                </div>
              ))}
            </div>
          </div>
          <div className={styles.wheelColumn}>
            <div className={styles.wheelHighlight} aria-hidden />
            <div
              ref={minutesScrollRef}
              className={styles.wheelScroll}
              onScroll={() => handleScroll('minutes')}
            >
              {[0, 1].map((i) => (
                <div key={`pad-${i}`} className={styles.wheelRowPad}>
                  —
                </div>
              ))}
              {MINUTES.map((m) => (
                <div key={m} className={styles.wheelRow}>
                  {String(m).padStart(2, '0')}
                </div>
              ))}
              {[0, 1].map((i) => (
                <div key={`pad-b-${i}`} className={styles.wheelRowPad}>
                  —
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      <div ref={anchorRef} style={{ position: 'relative' }} aria-busy={loading}>
        <div
          onClick={handleOpen}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
          role="button"
          tabIndex={disabled || loading ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={open}
          style={{ cursor: disabled || loading ? 'default' : 'pointer' }}
        >
          <MJInput
            type="text"
            variant={variant}
            size={size}
            className={className}
            label={label}
            errorMessage={errorMessage}
            disabled={disabled}
            loading={loading}
            value={displayValue}
            readOnly
            placeholder={placeholder}
            required={required}
          />
        </div>
      </div>
      {typeof document !== 'undefined' && document.body
        ? createPortal(popoverContent, document.body)
        : null}
    </>
  );
};
