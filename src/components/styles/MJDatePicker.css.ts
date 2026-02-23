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

/** 外側クリック用の透明オーバーレイ（ベース） */
export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1300,
});

/** オープン時: フェードイン */
export const backdropOpen = style({
  opacity: 0,
  animationName: backdropFadeIn,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

/** クローズ時: フェードアウト */
export const backdropClosing = style({
  animationName: backdropFadeOut,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

/** カレンダー用ペーパー（ベース） */
export const paper = style({
  position: 'fixed',
  zIndex: 1301,
  padding: vars.spacing.md,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusMd,
  boxShadow: `${vars.shadow.xs}, ${vars.shadow.lg}`,
  transformOrigin: 'var(--menu-transform-origin-x, 0) var(--menu-transform-origin-y, 0)',
});

/** オープン時: フェードイン + 小→標準 */
export const paperOpen = style({
  opacity: 0,
  animationName: paperScaleIn,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

/** クローズ時: フェードアウト + 標準→小 */
export const paperClosing = style({
  animationName: paperScaleOut,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

/** 月ナビゲーション（前月・表示月・翌月） */
export const monthNav = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: vars.spacing.sm,
  gap: vars.spacing.sm,
});

export const monthLabel = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeBase,
  fontWeight: vars.font.weightMedium,
  color: vars.color.textPrimary,
  minWidth: 120,
  textAlign: 'center',
});

export const navButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  padding: 0,
  border: 'none',
  borderRadius: vars.border.radiusSm,
  background: 'transparent',
  color: vars.color.textPrimary,
  cursor: 'pointer',
  transition: `background-color ${vars.transition.fast}`,
  ':hover': {
    backgroundColor: vars.color.hover,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.focus}`,
    outlineOffset: 2,
  },
});

/** 曜日ヘッダー行 */
export const weekdaysRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 2,
  marginBottom: vars.spacing.xs,
});

export const weekdayCell = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  color: vars.color.textMuted,
  textAlign: 'center',
  padding: `${vars.spacing.xs} 0`,
});

/** 日付グリッド */
export const daysGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 2,
});

export const dayCell = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 32,
  height: 32,
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  color: vars.color.textPrimary,
  border: 'none',
  borderRadius: vars.border.radiusSm,
  background: 'transparent',
  cursor: 'pointer',
  transition: `background-color ${vars.transition.fast}, color ${vars.transition.fast}`,
  boxSizing: 'border-box',
  ':hover': {
    backgroundColor: vars.color.hover,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.focus}`,
    outlineOffset: -2,
  },
});

export const dayCellOtherMonth = style({
  color: vars.color.textMuted,
  opacity: 0.6,
});

export const dayCellSelected = style({
  background: vars.color.primary,
  color: vars.color.textInverse,
  fontWeight: vars.font.weightMedium,
  ':hover': {
    filter: 'brightness(1.1)',
    backgroundColor: 'transparent',
    backgroundImage: vars.color.primary,
  },
});

export const dayCellToday = style({
  border: `1px solid ${vars.color.primaryGradientStart}`,
});

export const dayCellDisabled = style({
  color: vars.color.disabledText,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  ':hover': {
    backgroundColor: 'transparent',
  },
});
