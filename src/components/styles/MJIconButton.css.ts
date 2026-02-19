import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';
import {
  skeletonGradient,
  skeletonAnimation,
  skeletonBackgroundSize,
} from '../../constants/styles/skeleton.css';

const buttonBrightnessPulse = keyframes({
  from: {
    filter: 'brightness(1.7)',
  },
  to: {
    filter: 'brightness(1)',
  },
});

export const buttonBrightnessPulseAnimation = style({
  animation: `${buttonBrightnessPulse} 0.8s ease`,
});

/* Loading 状態 */
const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const loading = style({
  cursor: 'wait',
  pointerEvents: 'none',
  opacity: 0.8,
});

/** スピナーを中央に重ねるオーバーレイ */
export const loadingSpinnerOverlay = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '18px',
  height: '18px',
  border: '2px solid currentColor',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${spin} 0.7s linear infinite`,
  flexShrink: 0,
});

/* スケルトンローディング */
export const loadingSkeleton = style({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** ローディング時にボタンを position: relative にしてオーバーレイを載せる */
export const loadingContainer = style({
  position: 'relative',
});

/** 無効化時の見た目（Default と同じ背景・色 + opacity 0.6） */
export const disabledState = style({
  cursor: 'not-allowed',
  color: vars.color.textPrimary,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  opacity: 0.6,
});

/* アイコンボタン用ベース（サイズごとにレイアウト＋寸法） */
const iconButtonBase = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  flexShrink: 0,
  verticalAlign: 'middle' as const,
  lineHeight: 1,
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      background: vars.color.disabled,
      opacity: 0.6,
    },
  },
};
export const baseIcon = styleVariants({
  sm: { ...iconButtonBase, width: 29, height: 29 },
  md: { ...iconButtonBase, width: 36, height: 36 },
  lg: { ...iconButtonBase, width: 50, height: 50 },
});

/* Variants（MJButton と共通の見た目） */
export const variants = styleVariants({
  primary: {
    color: vars.color.textPrimary,
    background: vars.color.primary,
    border: `1px solid transparent`,
    borderRadius: `${vars.border.radiusSm}`,
    backgroundImage: `${vars.color.primary}`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    selectors: {
      '&:hover:not(:disabled)': {
        filter: 'brightness(1.2)',
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focus}`,
        outlineOffset: 2,
      },
    },
  },
  outline: {
    color: vars.color.textPrimary,
    position: 'relative',
    border: '1px solid transparent',
    borderRadius: `${vars.border.radiusSm}`,
    backgroundImage: `
      linear-gradient(${vars.color.surface}, ${vars.color.surface}), 
      linear-gradient(45deg, ${vars.color.primaryGradientStart}, ${vars.color.primaryGradientEnd})
    `,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    selectors: {
      '&:hover:not(:disabled)': {
        filter: 'brightness(1.2)',
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focus}`,
        outlineOffset: 2,
      },
    },
  },
  text: {
    color: vars.color.textPrimary,
    background: 'transparent',
    border: '1px solid transparent',
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.hover,
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focus}`,
        outlineOffset: 2,
      },
    },
  },
  danger: {
    color: vars.color.textInverse,
    background: vars.color.danger,
    border: `1px solid ${vars.color.danger}`,
    selectors: {
      '&:hover:not(:disabled)': {
        opacity: 0.9,
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.danger}`,
        outlineOffset: 2,
      },
    },
  },
  default: {
    color: vars.color.textPrimary,
    background: vars.color.surface,
    border: `1px solid ${vars.color.border}`,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.hover,
      },
      '&:focus-visible': {
        outline: `2px solid ${vars.color.focus}`,
        outlineOffset: 2,
      },
    },
  },
});

/** アイコンラッパー（ボタン内のアイコン用） */
export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});
