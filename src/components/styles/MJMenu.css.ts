import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const duration = "0.2s";
const timing = vars.transition.viewTiming;

const backdropFadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const backdropFadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const paperScaleIn = keyframes({
  from: { opacity: 0, transform: 'var(--menu-translate, none) scale(0.02)' },
  to: { opacity: 1, transform: 'var(--menu-translate, none) scale(1)' },
});

const paperScaleOut = keyframes({
  from: { opacity: 1, transform: 'var(--menu-translate, none) scale(1)' },
  to: { opacity: 0, transform: 'var(--menu-translate, none) scale(0.02)' },
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

/** メニュー用ペーパー（position は JS で指定・ベース） */
export const paper = style({
  position: 'fixed',
  zIndex: 1301,
  minWidth: 160,
  maxWidth: 320,
  padding: `${vars.spacing.xs} 0`,
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

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const listItem = style({
  display: 'block',
});

/** メニュー項目ボタン */
export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  width: '100%',
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  border: 'none',
  background: 'transparent',
  color: vars.color.textPrimary,
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightNormal,
  textAlign: 'left',
  cursor: 'pointer',
  transition: `background-color ${vars.transition.fast}`,
  boxSizing: 'border-box',
  ':hover': {
    backgroundColor: vars.color.hover,
  },
  ':focus': {
    outline: 'none',
    backgroundColor: vars.color.hover,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.focus}`,
    outlineOffset: -2,
  },
});

export const itemDisabled = style({
  color: vars.color.disabledText,
  cursor: 'not-allowed',
  pointerEvents: 'none',
  ':hover': {
    backgroundColor: 'transparent',
  },
});

export const itemIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 20,
  height: 20,
  color: vars.color.textSecondary,
});

/** 区切り線 */
export const divider = style({
  height: 0,
  margin: `${vars.spacing.xs} 0`,
  border: 'none',
  borderTop: `1px solid ${vars.color.border}`,
});
