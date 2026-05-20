'use client';

import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { MJInput } from './MJInput';
import type { MJFieldSize, MJFieldVariant } from './types/variants';
import { usePopover } from '@/hooks/usePopover';
import { cn } from '@/utils/cn';
import * as styles from './styles/MJTimePicker.css';

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
  variant?: MJFieldVariant;
  size?: MJFieldSize;
  className?: string;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
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
  const pendingTimeRef = useRef({ hours: 0, minutes: 0 });

  const parsed = toTimeValue(value);
  const [internalHours, setInternalHours] = useState(() => parsed?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = useState(() => parsed?.minutes ?? 0);

  pendingTimeRef.current = { hours: internalHours, minutes: internalMinutes };

  const isControlled = value !== undefined;
  const displayHours = isControlled && parsed != null ? parsed.hours : internalHours;
  const displayMinutes = isControlled && parsed != null ? parsed.minutes : internalMinutes;

  const popover = usePopover({
    anchorRef,
    onCloseComplete: () => {
      const { hours, minutes } = pendingTimeRef.current;
      onChange?.(toDateWithTime(hours, minutes));
    },
  });

  useLayoutEffect(() => {
    if (popover.open && !popover.isClosing) {
      setInternalHours(displayHours);
      setInternalMinutes(displayMinutes);
    }
  }, [popover.open, popover.isClosing, displayHours, displayMinutes]);

  useLayoutEffect(() => {
    if (!popover.open || popover.isClosing) return;
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
  }, [popover.open, popover.isClosing, displayHours, displayMinutes]);

  const handleOpen = useCallback(() => {
    if (disabled || loading) return;
    setInternalHours(displayHours);
    setInternalMinutes(displayMinutes);
    popover.handleOpen();
  }, [disabled, loading, displayHours, displayMinutes, popover]);

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

  const displayValue = formatHHMM(displayHours, displayMinutes);
  const paperStyle = popover.getPaperStyle();

  const popoverContent = popover.showPortal ? (
    <>
      <div
        className={cn(
          styles.backdrop,
          popover.isClosing ? styles.backdropClosing : styles.backdropOpen,
        )}
        onClick={popover.handleCloseRequest}
        onAnimationEnd={(e) =>
          popover.handleOverlayAnimationEnd(e, popover.isClosing)
        }
        role="presentation"
        aria-hidden
      />
      <div
        className={cn(
          styles.paper,
          popover.isClosing ? styles.paperClosing : styles.paperOpen,
        )}
        style={paperStyle}
        role="dialog"
        aria-label="時刻を選択"
        onAnimationEnd={(e) =>
          popover.handleOverlayAnimationEnd(e, popover.isClosing)
        }
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
          aria-expanded={popover.open}
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
