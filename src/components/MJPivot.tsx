import React, { useMemo } from 'react';
import { MJTypography } from './MJTypography';
import * as styles from './styles/MJPivot.css';

export interface MJPivotProps {
  /** 行軸のラベル（左上セルや先頭列のヘッダー名） */
  rowDimensionLabel?: string;
  /** 行ヘッダー（先頭列の値） */
  rowHeaders: string[];
  /** 列ヘッダー */
  columnHeaders: string[];
  /** データ [行][列] */
  data: number[][];
  /** 行合計を表示する */
  showRowTotals?: boolean;
  /** 列合計を表示する */
  showColumnTotals?: boolean;
  /** 数値のオーバーフロー基準: 列ごとの最大で100% / 全体の最大で100% */
  overflowBase?: 'column' | 'global';
  /** 読み込み中はセルをスケルトン表示 */
  loading?: boolean;
  className?: string;
}

/**
 * ピボットテーブル。数値セルは Primary 色のオーバーフロー（バー幅）で大小を表現する。
 */
export function MJPivot({
  rowDimensionLabel = '',
  rowHeaders,
  columnHeaders,
  data,
  showRowTotals = true,
  showColumnTotals = true,
  overflowBase = 'column',
  loading = false,
  className,
}: MJPivotProps) {
  const rowCount = rowHeaders.length;
  const colCount = columnHeaders.length;

  const { columnMaxes, globalMax, rowTotals, colTotals, grandTotal } =
    useMemo(() => {
      const colMaxes: number[] = new Array(colCount).fill(0);
      const rowSums: number[] = new Array(rowCount).fill(0);
      const colSums: number[] = new Array(colCount).fill(0);
      let max = 0;
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          const v = data[i]?.[j] ?? 0;
          rowSums[i] += v;
          colSums[j] += v;
          colMaxes[j] = Math.max(colMaxes[j], v);
          max = Math.max(max, v);
        }
      }
      const grand = rowSums.reduce((a, b) => a + b, 0);
      return {
        columnMaxes: colMaxes,
        globalMax: max,
        rowTotals: rowSums,
        colTotals: colSums,
        grandTotal: grand,
      };
    }, [data, rowCount, colCount]);

  const getOverflowPercent = (value: number, colIndex: number): number => {
    if (value <= 0) return 0;
    if (overflowBase === 'global') {
      return globalMax <= 0 ? 0 : Math.min(100, (value / globalMax) * 100);
    }
    const max = columnMaxes[colIndex] ?? 0;
    return max <= 0 ? 0 : Math.min(100, (value / max) * 100);
  };

  return (
    <div className={className}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.headerRow}>
            <th className={[styles.headerCell, styles.headerCellCorner].join(' ')}>
              <MJTypography variant="small" loading={loading}>{rowDimensionLabel || '—'}</MJTypography>
            </th>
            {columnHeaders.map((label, j) => (
              <th key={j} className={styles.headerCell}>
                <MJTypography variant="small" loading={loading}>{label}</MJTypography>
              </th>
            ))}
            {showRowTotals && (
              <th className={styles.headerCell}>
                <MJTypography variant="small" loading={loading}>合計</MJTypography>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rowHeaders.map((rowLabel, i) => (
            <tr key={i} className={styles.bodyRow}>
              <td className={[styles.bodyCell, styles.bodyCellLabel].join(' ')}>
                <MJTypography variant="small" loading={loading}>{rowLabel}</MJTypography>
              </td>
              {columnHeaders.map((_, j) => {
                const value = data[i]?.[j] ?? 0;
                const pct = getOverflowPercent(value, j);
                return (
                  <td key={j} className={styles.bodyCell}>
                    {loading ? (
                      <div className={styles.pivotCellValue}>
                        <MJTypography variant="small" loading>0</MJTypography>
                      </div>
                    ) : (
                    <div className={styles.pivotCellWrap}>
                      <div
                        className={styles.pivotCellBar}
                        style={{ width: `${pct}%` }}
                        aria-hidden
                      />
                      <div className={styles.pivotCellValue}>
                        <MJTypography variant="small">
                          {value.toLocaleString()}
                        </MJTypography>
                      </div>
                    </div>
                    )}
                  </td>
                );
              })}
              {showRowTotals && (
                <td className={[styles.bodyCell, styles.totalCell].join(' ')}>
                  {loading ? (
                    <div className={styles.pivotCellValue}>
                      <MJTypography variant="small" loading>0</MJTypography>
                    </div>
                  ) : (
                  <div className={styles.pivotCellWrap}>
                    <div
                      className={styles.pivotCellBar}
                      style={{
                        width: `${globalMax > 0 ? Math.min(100, (rowTotals[i] / globalMax) * 100) : 0}%`,
                      }}
                      aria-hidden
                    />
                    <div className={styles.pivotCellValue}>
                      <MJTypography variant="small">
                        {rowTotals[i].toLocaleString()}
                      </MJTypography>
                    </div>
                  </div>
                  )}
                </td>
              )}
            </tr>
          ))}
          {showColumnTotals && (
            <tr className={[styles.bodyRow, styles.totalRow].join(' ')}>
              <td className={[styles.bodyCell, styles.bodyCellLabel, styles.totalCell].join(' ')}>
                <MJTypography variant="small" loading={loading}>合計</MJTypography>
              </td>
              {columnHeaders.map((_, j) => (
                <td key={j} className={[styles.bodyCell, styles.totalCell].join(' ')}>
                  {loading ? (
                    <div className={styles.pivotCellValue}>
                      <MJTypography variant="small" loading>0</MJTypography>
                    </div>
                  ) : (
                  <div className={styles.pivotCellWrap}>
                    <div
                      className={styles.pivotCellBar}
                      style={{
                        width: `${getOverflowPercent(colTotals[j], j)}%`,
                      }}
                      aria-hidden
                    />
                    <div className={styles.pivotCellValue}>
                      <MJTypography variant="small">
                        {colTotals[j].toLocaleString()}
                      </MJTypography>
                    </div>
                  </div>
                  )}
                </td>
              ))}
              {showRowTotals && (
                <td className={[styles.bodyCell, styles.totalCell].join(' ')}>
                  <div className={styles.pivotCellValue}>
                    <MJTypography variant="small" loading={loading}>
                      {grandTotal.toLocaleString()}
                    </MJTypography>
                  </div>
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
