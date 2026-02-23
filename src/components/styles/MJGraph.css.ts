import { style } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';
import {
  skeletonGradient,
  skeletonAnimation,
  skeletonBackgroundSize,
} from '../../constants/styles/skeleton.css';

export const graphWrap = style({
  width: '100%',
  minHeight: 200,
  position: 'relative',
});

export const graphSvg = style({
  display: 'block',
  width: '100%',
  height: '100%',
  overflow: 'visible',
});

export const axisLine = style({
  stroke: vars.color.border,
  strokeWidth: 1,
});

export const gridLine = style({
  stroke: vars.color.border,
  strokeWidth: 1,
  opacity: 0.5,
});

export const linePath = style({
  fill: 'none',
  stroke: vars.color.primaryGradientStart,
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
});

export const barFill = style({
  fill: vars.color.primaryGradientStart,
  opacity: 0.9,
});

export const barFillSecondary = style({
  fill: vars.color.primaryGradientEnd,
  opacity: 0.9,
});

export const pieSlice = style({
  stroke: vars.color.surface,
  strokeWidth: 1.5,
});

export const pieSliceLabel = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  fill: vars.color.textPrimary,
  pointerEvents: 'none',
});

export const barValueLabel = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  fill: vars.color.textPrimary,
  pointerEvents: 'none',
});

export const lineValueLabel = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  fill: vars.color.textPrimary,
  pointerEvents: 'none',
});

export const legend = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.spacing.md,
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
});

export const legendItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

export const legendDot = style({
  width: 8,
  height: 8,
  borderRadius: 4,
  flexShrink: 0,
});

export const legendPercent = style({
  opacity: 0.85,
});

export const axisLabel = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  fill: vars.color.textMuted,
});

/** ローディング時: グラフ領域のスケルトン */
export const graphSkeleton = style({
  width: '100%',
  height: '100%',
  minHeight: 200,
  borderRadius: vars.border.radiusSm,
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** 凡例スケルトン: ドット */
export const legendSkeletonDot = style({
  width: 8,
  height: 8,
  borderRadius: 4,
  flexShrink: 0,
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** 凡例スケルトン: テキストバー */
export const legendSkeletonBar = style({
  height: 12,
  borderRadius: 4,
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** 凡例スケルトン: 短いバー（%用・pie用） */
export const legendSkeletonBarShort = style({
  height: 10,
  width: 28,
  borderRadius: 4,
  flexShrink: 0,
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});
