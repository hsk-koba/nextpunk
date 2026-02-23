import React, { useMemo } from 'react';
import { MJCard } from './MJCard';
import type { MJCardVariant } from './MJCard';
import { vars } from '../constants/styles/vars.css';
import * as styles from './styles/MJGraph.css';

export type MJGraphType = 'line' | 'bar' | 'pie';

export interface MJGraphDataPoint {
  label: string;
  value: number;
}

export interface MJGraphProps {
  /** グラフのタイプ */
  type: MJGraphType;
  /** データ（ラベルと値の配列） */
  data: MJGraphDataPoint[];
  /** カードのタイトル */
  title?: React.ReactNode;
  /** グラフ領域の高さ（px） */
  height?: number;
  /** MJCard のバリアント */
  cardVariant?: MJCardVariant;
  /** フッターに凡例を表示する場合のラベル（未指定なら非表示） */
  legendLabel?: string;
  /** 読み込み中はグラフ領域をスケルトン表示 */
  loading?: boolean;
  /** ルートの class */
  className?: string;
}

const PADDING = { top: 8, right: 16, bottom: 32, left: 40 };
const PIE_PADDING = 24;
const DEFAULT_HEIGHT = 220;

const PIE_PALETTE = [
  vars.color.primaryGradientStart,
  vars.color.primaryGradientEnd,
  vars.color.info,
  vars.color.success,
  vars.color.warning,
  vars.color.danger,
  vars.color.textSecondary,
];

function getPieSlicePath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function useChartScale(
  data: MJGraphDataPoint[],
  width: number,
  height: number,
) {
  return useMemo(() => {
    if (data.length === 0) {
      return { plotWidth: 0, plotHeight: 0, minVal: 0, maxVal: 0, scaleX: () => 0, scaleY: () => 0 };
    }
    const plotWidth = Math.max(0, width - PADDING.left - PADDING.right);
    const plotHeight = Math.max(0, height - PADDING.top - PADDING.bottom);
    const values = data.map((d) => d.value);
    const minVal = Math.min(0, ...values);
    const maxVal = Math.max(0, ...values);
    const range = maxVal - minVal || 1;
    const scaleX = (i: number) =>
      PADDING.left + (i / Math.max(1, data.length - 1)) * plotWidth;
    const scaleY = (v: number) =>
      PADDING.top + plotHeight - ((v - minVal) / range) * plotHeight;
    return {
      plotWidth,
      plotHeight,
      minVal,
      maxVal,
      scaleX,
      scaleY,
    };
  }, [data, width, height]);
}

export const MJGraph: React.FC<MJGraphProps> = ({
  type,
  data,
  title,
  height = DEFAULT_HEIGHT,
  cardVariant = 'elevated',
  legendLabel,
  loading = false,
  className,
}) => {
  const width = 400;
  const chartHeight = height;
  const scale = useChartScale(data, width, chartHeight);

  const linePathD = useMemo(() => {
    if (data.length === 0 || scale.plotWidth <= 0) return '';
    const pts = data.map((d, i) => `${scale.scaleX(i)},${scale.scaleY(d.value)}`);
    return `M ${pts.join(' L ')}`;
  }, [data, scale]);

  const bars = useMemo(() => {
    if (data.length === 0) return [];
    const zeroY = scale.scaleY(0);
    const slotWidth = scale.plotWidth / data.length;
    const barW = slotWidth * 0.6;
    return data.map((d, i) => {
      const centerX = PADDING.left + (i + 0.5) * slotWidth;
      const barX = centerX - barW / 2;
      const y = scale.scaleY(d.value);
      const h = Math.abs(zeroY - y);
      const barY = d.value >= 0 ? y : zeroY - h;
      return { x: barX, y: barY, w: barW, h, value: d.value };
    });
  }, [data, scale]);

  const pieSlices = useMemo(() => {
    if (type !== 'pie' || data.length === 0) return [];
    const total = data.reduce((s, d) => s + Math.max(0, d.value), 0);
    if (total <= 0) return [];
    const cx = width / 2;
    const cy = chartHeight / 2;
    const r = Math.min(width, chartHeight) / 2 - PIE_PADDING;
    let startAngle = -Math.PI / 2;
    return data.map((d, i) => {
      const value = Math.max(0, d.value);
      const angle = (value / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;
      const midAngle = startAngle + angle / 2;
      const labelR = r * 0.55;
      const labelX = cx + labelR * Math.cos(midAngle);
      const labelY = cy + labelR * Math.sin(midAngle);
      const pathD = getPieSlicePath(cx, cy, r, startAngle, endAngle);
      const color = PIE_PALETTE[i % PIE_PALETTE.length];
      const percent = total > 0 ? (value / total) * 100 : 0;
      startAngle = endAngle;
      return { pathD, color, label: d.label, value, percent, labelX, labelY };
    });
  }, [type, data, width, chartHeight]);

  const footer = loading ? (
    <div className={styles.legend}>
      {type === 'pie' ? (
        [0, 1, 2].map((i) => (
          <span key={i} className={styles.legendItem}>
            <span className={styles['legendSkeletonDot']} aria-hidden />
            <span
              className={styles['legendSkeletonBar']}
              style={{ width: [56, 40, 48][i] }}
              aria-hidden
            />
            <span className={styles['legendSkeletonBarShort']} aria-hidden />
          </span>
        ))
      ) : type === 'bar' ? (
        [0, 1, 2].map((i) => (
          <span key={i} className={styles.legendItem}>
            <span className={styles['legendSkeletonDot']} aria-hidden />
            <span
              className={styles['legendSkeletonBar']}
              style={{ width: [52, 72, 44][i] }}
              aria-hidden
            />
          </span>
        ))
      ) : (
        [0, 1, 2].map((i) => (
          <span key={i} className={styles.legendItem}>
            <span className={styles['legendSkeletonDot']} aria-hidden />
            <span
              className={styles['legendSkeletonBar']}
              style={{ width: [48, 64, 40][i] }}
              aria-hidden
            />
          </span>
        ))
      )}
    </div>
  ) : type === 'pie' && pieSlices.length > 0 ? (
    <div className={styles.legend}>
      {pieSlices.map((slice, i) => (
        <span key={i} className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: slice.color }}
          />
          {slice.label}
          {' '}
          <span className={styles['legendPercent']}>({slice.percent.toFixed(0)}%)</span>
        </span>
      ))}
    </div>
  ) : legendLabel ? (
    <div className={styles.legend}>
      <span className={styles.legendItem}>
        <span
          className={styles.legendDot}
          style={{ background: vars.color.primaryGradientStart }}
        />
        {legendLabel}
      </span>
    </div>
  ) : undefined;

  return (
    <MJCard
      variant={cardVariant}
      title={title}
      footer={footer}
      className={className}
    >
      <div className={styles.graphWrap} style={{ height: chartHeight }}>
        {loading ? (
          <div
            className={styles.graphSkeleton}
            style={{ height: chartHeight }}
            aria-busy
            aria-label="読み込み中"
          />
        ) : (
        <svg
          className={styles.graphSvg}
          viewBox={`0 0 ${width} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height={chartHeight}
          aria-label={title ? `グラフ: ${title}` : 'グラフ'}
        >
          {/* グリッド線（Y）（line / bar のみ） */}
          {type !== 'pie' && scale.plotHeight > 0 &&
            [0.25, 0.5, 0.75].map((t) => {
              const y =
                PADDING.top +
                scale.plotHeight * (1 - t);
              return (
                <line
                  key={t}
                  className={styles.gridLine}
                  x1={PADDING.left}
                  y1={y}
                  x2={PADDING.left + scale.plotWidth}
                  y2={y}
                />
              );
            })}
          {/* 軸（line / bar のみ） */}
          {type !== 'pie' && (
          <>
          <line
            className={styles.axisLine}
            x1={PADDING.left}
            y1={PADDING.top}
            x2={PADDING.left}
            y2={PADDING.top + scale.plotHeight}
          />
          <line
            className={styles.axisLine}
            x1={PADDING.left}
            y1={PADDING.top + scale.plotHeight}
            x2={PADDING.left + scale.plotWidth}
            y2={PADDING.top + scale.plotHeight}
          />
          </>
          )}
          {type === 'line' && linePathD && (
            <path
              className={styles.linePath}
              d={linePathD}
              vectorEffect="non-scaling-stroke"
            />
          )}
          {type === 'line' &&
            data.map((d, i) => (
              <text
                key={i}
                className={styles['lineValueLabel']}
                x={scale.scaleX(i)}
                y={scale.scaleY(d.value) - 8}
                textAnchor="middle"
              >
                {d.value}
              </text>
            ))}
          {type === 'bar' &&
            bars.map((bar, i) => (
              <g key={i}>
                <rect
                  className={styles.barFill}
                  x={bar.x}
                  y={bar.y}
                  width={bar.w}
                  height={bar.h}
                />
                <text
                  className={styles['barValueLabel']}
                  x={bar.x + bar.w / 2}
                  y={bar.value >= 0 ? bar.y - 6 : bar.y + bar.h + 14}
                  textAnchor="middle"
                >
                  {bar.value}
                </text>
              </g>
            ))}
          {type === 'pie' &&
            pieSlices.map((slice, i) => (
              <g key={i}>
                <path
                  className={styles['pieSlice']}
                  d={slice.pathD}
                  fill={slice.color}
                />
                {slice.percent >= 4 && (
                  <text
                    className={styles['pieSliceLabel']}
                    x={slice.labelX}
                    y={slice.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {slice.label} {slice.percent.toFixed(0)}%
                  </text>
                )}
              </g>
            ))}
          {/* X ラベル（line / bar のみ） */}
          {type !== 'pie' &&
            data.map((d, i) => (
              <text
                key={i}
                className={styles.axisLabel}
                x={scale.scaleX(i)}
                y={chartHeight - 8}
                textAnchor="middle"
              >
                {d.label}
              </text>
            ))}
        </svg>
        )}
      </div>
    </MJCard>
  );
};
