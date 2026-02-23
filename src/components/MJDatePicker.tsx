/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MJInput } from './MJInput';
import { MJButton } from './MJButton';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJDatePicker.css';

const MENU_GAP = 4;
const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

/** YYYY-MM-DD にフォーマット */
function toYYYYMMDD(value: Date | string | null | undefined): string {
  if (value == null) return '';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toDate(value: Date | string | null | undefined): Date | null {
  if (value == null) return null;
  const d = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(d.getTime()) ? null : d;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + n);
  return r;
}

/** カレンダーに表示する1日分 */
interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
}

/** 表示月の日付リスト（前月・翌月のパディング含む、6週×7日=42） */
function getCalendarDays(
  currentMonth: Date,
  selected: Date | null,
  min: Date | null,
  max: Date | null
): CalendarDay[] {
  const start = startOfMonth(currentMonth);
  const dayOfWeek = start.getDay();
  const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result: CalendarDay[] = [];
  const totalCells = 42;
  const startOffset = -dayOfWeek;

  for (let i = 0; i < totalCells; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + startOffset + i);
    d.setHours(0, 0, 0, 0);
    const isCurrentMonth = d.getMonth() === start.getMonth();
    const isSelected = selected != null && isSameDay(d, selected);
    const isToday = isSameDay(d, today);
    let isDisabled = false;
    if (min != null && d < min) isDisabled = true;
    if (max != null && d > max) isDisabled = true;

    result.push({
      date: d,
      isCurrentMonth,
      isSelected,
      isToday,
      isDisabled,
    });
  }
  return result;
}

function formatMonthLabel(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

export interface MJDatePickerProps {
  value?: Date | string | null;
  onChange?: (date: Date | null) => void;
  min?: Date | string;
  max?: Date | string;
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

export const MJDatePicker: React.FC<MJDatePickerProps> = ({
  value,
  onChange,
  min: minProp,
  max: maxProp,
  variant = 'primary',
  size = 'md',
  className,
  label,
  errorMessage,
  disabled = false,
  loading = false,
  placeholder = '日付を選択',
  required = false,
}) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
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

  const isControlled = value !== undefined;
  const selectedFromProp = toDate(value);
  const [internalValue, setInternalValue] = useState<Date | null>(() => toDate(value) ?? null);
  // 表示用: 制御時は prop を優先し、未設定時は直近で選択した internalValue を表示（選択直後に日付が入るようにする）
  const selected = isControlled
    ? (selectedFromProp ?? internalValue)
    : internalValue;
  const min = toDate(minProp) ?? null;
  const max = toDate(maxProp) ?? null;

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const s = isControlled ? selectedFromProp : internalValue;
    if (s) return startOfMonth(s);
    return startOfMonth(new Date());
  });

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
    if (!open) {
      setIsClosing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useLayoutEffect(() => {
    if (open && !isClosing) {
      updatePosition();
      if (selected) setCurrentMonth(startOfMonth(selected));
    }
    if (!open && !isClosing) setPosition(null);
  }, [open, isClosing, updatePosition, selected]);

  const handleOpen = useCallback(() => {
    if (disabled || loading) return;
    setOpen(true);
  }, [disabled, loading]);

  /** 閉じる開始（アニメーション用） */
  const handleCloseRequest = useCallback(() => {
    closeEndFiredRef.current = false;
    setIsClosing(true);
  }, []);

  /** アニメーション終了後に実際に閉じる */
  const handleCloseEnd = useCallback(() => {
    if (closeEndFiredRef.current) return;
    closeEndFiredRef.current = true;
    setOpen(false);
    setIsClosing(false);
  }, []);

  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      if (day.isDisabled) return;
      setInternalValue(day.date);
      onChange?.(day.date);
      handleCloseRequest();
    },
    [onChange, handleCloseRequest]
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((m) => addMonths(m, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((m) => addMonths(m, 1));
  }, []);

  const displayValue = selected ? toYYYYMMDD(selected) : '';
  const calendarDays = getCalendarDays(currentMonth, selected, min, max);

  const showPortal = (open || isClosing) && typeof document !== 'undefined' && position;
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
          aria-label="日付を選択"
          onAnimationEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (isClosing) handleCloseEnd();
          }}
        >
          <div className={styles.monthNav}>
            <MJButton
              variant="text"
              size="sm"
              onClick={handlePrevMonth}
              aria-label="前月"
            >
              <ChevronLeft size={20} />
            </MJButton>
            <span className={styles.monthLabel}>{formatMonthLabel(currentMonth)}</span>
            <MJButton
              variant="text"
              size="sm"
              onClick={handleNextMonth}
              aria-label="翌月"
            >
              <ChevronRight size={20} />
            </MJButton>
          </div>
          <div className={styles.weekdaysRow}>
            {WEEKDAYS_JA.map((w) => (
              <MJTypography key={w} variant="p" className={styles.weekdayCell}>
                {w}
              </MJTypography>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {calendarDays.map((day, i) => (
              <button
                key={i}
                type="button"
                className={[
                  styles.dayCell,
                  !day.isCurrentMonth && styles.dayCellOtherMonth,
                  day.isSelected && styles.dayCellSelected,
                  day.isCurrentMonth && day.isToday && !day.isSelected && styles.dayCellToday,
                  day.isDisabled && styles.dayCellDisabled,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleDayClick(day)}
                disabled={day.isDisabled}
                aria-label={day.date.toLocaleDateString('ja-JP')}
                aria-selected={day.isSelected}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      </>
    ) : null;

  return (
    <>
      <div ref={anchorRef} style={{ position: 'relative' }}>
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
      {typeof document !== 'undefined' && document.body ? createPortal(popoverContent, document.body) : null}
    </>
  );
};
