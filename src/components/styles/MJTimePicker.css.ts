import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const duration = vars.transition.viewDuration;
const timing = vars.transition.viewTiming;

const backdropFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const backdropFadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const paperScaleIn = keyframes({
  from: { opacity: 0, transform: 'var(--menu-translate, none) scale(0.95)' },
  to: { opacity: 1, transform: 'var(--menu-translate, none) scale(1)' },
});

const paperScaleOut = keyframes({
  from: { opacity: 1, transform: 'var(--menu-translate, none) scale(1)' },
  to: { opacity: 0, transform: 'var(--menu-translate, none) scale(0.95)' },
});

export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1300,
});

export const backdropOpen = style({
  opacity: 0,
  animationName: backdropFadeIn,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

export const backdropClosing = style({
  animationName: backdropFadeOut,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

export const paper = style({
  position: 'fixed',
  zIndex: 1301,
  padding: vars.spacing.md,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusLg,
  boxShadow: `${vars.shadow.xs}, ${vars.shadow.lg}`,
  transformOrigin: 'var(--menu-transform-origin-x, 0) var(--menu-transform-origin-y, 0)',
});

export const paperOpen = style({
  opacity: 0,
  animationName: paperScaleIn,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

export const paperClosing = style({
  animationName: paperScaleOut,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

const ROW_HEIGHT = 40;
const VISIBLE_ROWS = 5;
const PICKER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;

/** iPhone風ホイールの外枠（中央ハイライト＋上下マスク） */
export const wheelWrap = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 0,
  height: PICKER_HEIGHT,
  position: 'relative',
  alignItems: 'stretch',
});

/** 1本のホイール列（時 or 分） */
export const wheelColumn = style({
  flex: 1,
  minWidth: 64,
  height: PICKER_HEIGHT,
  overflow: 'hidden',
  position: 'relative',
  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
});

/** 中央の選択帯（半透明のハイライト） */
export const wheelHighlight = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  height: ROW_HEIGHT,
  pointerEvents: 'none',
  borderRadius: vars.border.radiusSm,
  background: `linear-gradient(to bottom, transparent, ${vars.color.primary}22, transparent)`,
  borderTop: `1px solid ${vars.color.primaryGradientStart}44`,
  borderBottom: `1px solid ${vars.color.primaryGradientEnd}44`,
});

/** スクロール可能なリスト */
export const wheelScroll = style({
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollSnapType: 'y mandatory',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': { display: 'none' },
});

/** ホイールの1行（パディング用 or 項目） */
export const wheelRow = style({
  height: ROW_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  scrollSnapAlign: 'center',
  flexShrink: 0,
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  color: vars.color.textPrimary,
});

export const wheelRowPad = style([
  wheelRow,
  { visibility: 'hidden', pointerEvents: 'none' },
]);

export const wheelLabel = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  color: vars.color.textMuted,
  marginBottom: vars.spacing.xs,
  textAlign: 'center',
});

/** 選択中の時刻を大きく表示（ポップアップ内） */
export const selectedTimeDisplay = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: '2rem',
  fontWeight: vars.font.weightBold,
  color: vars.color.textPrimary,
  textAlign: 'center',
  letterSpacing: '0.05em',
  marginBottom: vars.spacing.md,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderRadius: vars.border.radiusSm,
  background: `linear-gradient(135deg, ${vars.color.primaryGradientStart}18, ${vars.color.primaryGradientEnd}18)`,
  border: `1px solid ${vars.color.primaryGradientStart}44`,
});

export const wheelLabelsRow = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 0,
  marginBottom: vars.spacing.xs,
});

export const wheelLabelCell = style({
  flex: 1,
  minWidth: 64,
  textAlign: 'center',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  color: vars.color.textMuted,
});

export const footerRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.sm,
  marginTop: vars.spacing.md,
  paddingTop: vars.spacing.sm,
  borderTop: `1px solid ${vars.color.border}`,
});
