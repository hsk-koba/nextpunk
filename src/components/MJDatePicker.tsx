/* eslint-disable jsx-a11y/role-supports-aria-props */
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopover } from '@/hooks/usePopover';
import { cn } from '@/utils/cn';
import { MJInput } from './MJInput';
import { MJButton } from './MJButton';
import { MJTypography } from './MJTypography';
import type { MJFieldSize, MJFieldVariant } from './types/variants';
import * as styles from './styles/MJDatePicker.css';

const WEEKDAYS_JA = ['日', '月', '火', '水', '木', '金', '土'];

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

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
}

function getCalendarDays(
  currentMonth: Date,
  selected: Date | null,
  min: Date | null,
  max: Date | null,
): CalendarDay[] {
  const start = startOfMonth(currentMonth);
  const dayOfWeek = start.getDay();
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

  const isControlled = value !== undefined;
  const selectedFromProp = toDate(value);
  const [internalValue, setInternalValue] = useState<Date | null>(() => toDate(value) ?? null);
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

  const popover = usePopover({ anchorRef });

  const handleOpen = useCallback(() => {
    if (disabled || loading) return;
    if (selected) setCurrentMonth(startOfMonth(selected));
    popover.handleOpen();
  }, [disabled, loading, selected, popover]);

  const handleDayClick = useCallback(
    (day: CalendarDay) => {
      if (day.isDisabled) return;
      setInternalValue(day.date);
      onChange?.(day.date);
      popover.handleCloseRequest();
    },
    [onChange, popover],
  );

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((m) => addMonths(m, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((m) => addMonths(m, 1));
  }, []);

  const displayValue = selected ? toYYYYMMDD(selected) : '';
  const calendarDays = getCalendarDays(currentMonth, selected, min, max);
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
        aria-label="日付を選択"
        onAnimationEnd={(e) =>
          popover.handleOverlayAnimationEnd(e, popover.isClosing)
        }
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
              className={cn(
                styles.dayCell,
                !day.isCurrentMonth && styles.dayCellOtherMonth,
                day.isSelected && styles.dayCellSelected,
                day.isCurrentMonth && day.isToday && !day.isSelected && styles.dayCellToday,
                day.isDisabled && styles.dayCellDisabled,
              )}
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
