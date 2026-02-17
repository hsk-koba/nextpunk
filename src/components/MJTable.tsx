import React, { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import * as styles from './styles/MJTable.css';

export interface MJTableColumn<T = Record<string, React.ReactNode>> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface MJTableProps<T = Record<string, React.ReactNode>> {
  columns: MJTableColumn<T>[];
  data: T[];
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  className?: string;
  /** 行の key を返す（React の list key 用） */
  getRowKey?: (row: T, index: number) => string | number;
}

export function MJTable<T extends Record<string, React.ReactNode>>({
  columns,
  data,
  sortKey,
  sortDirection = 'asc',
  onSort,
  className,
  getRowKey,
}: MJTableProps<T>) {
  const [flashingKey, setFlashingKey] = useState<string | null>(null);

  const handleSort = useCallback(
    (key: string) => {
      if (!onSort) return;
      setFlashingKey(key);
      const next = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(key, next);
    },
    [onSort, sortKey, sortDirection],
  );

  const handleSortAnimationEnd = useCallback(() => {
    setFlashingKey(null);
  }, []);

  return (
    <div className={className}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th key={col.key} className={styles.headerCell}>
                {col.sortable !== false && onSort ? (
                  <button
                    type="button"
                    className={[
                      styles.sortButton,
                      flashingKey === col.key ? styles.sortButtonFlash : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSort(col.key)}
                    onAnimationEnd={handleSortAnimationEnd}
                    aria-sort={
                      sortKey === col.key
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                  >
                    {col.label}
                    {sortKey === col.key ? (
                      sortDirection === 'asc' ? (
                        <ChevronUp size={14} aria-hidden />
                      ) : (
                        <ChevronDown size={14} aria-hidden />
                      )
                    ) : (
                      <span style={{ width: 14, display: 'inline-block' }} />
                    )}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={getRowKey ? getRowKey(row, index) : index}
              className={styles.bodyRow}
            >
              {columns.map((col) => (
                <td key={col.key} className={styles.bodyCell}>
                  {row[col.key] != null && row[col.key] !== ''
                    ? row[col.key]
                    : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
