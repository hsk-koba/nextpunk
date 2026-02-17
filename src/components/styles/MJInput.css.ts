import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/* スケルトンローディング */
const skeleton = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const loadingInputWrapper = style({
  position: 'relative',
  width: '100%',
  borderRadius: vars.border.radiusMd,
});

export const loadingSkeleton = style({
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  background: `linear-gradient(to right, ${vars.color.surface} 0%, #333 50%, ${vars.color.surface} 100%)`,
  backgroundSize: '200% 100%',
  animation: `${skeleton} 1.5s ease-in-out infinite`,
  pointerEvents: 'none',
});

/** ローディング時はクリック無効・入力無効 */
export const loading = style({
  cursor: 'wait',
  pointerEvents: 'none',
  opacity: 0.8,
});

const skeletonGradient = `linear-gradient(to right, ${vars.color.surface} 0%, #333 50%, ${vars.color.surface} 100%)`;

/** ローディング時のラベル領域（枠保持用の非表示テキスト + スケルトン） */
export const labelSkeletonWrapper = style({
  position: 'relative',
  display: 'inline-block',
  marginBottom: '4px',
  marginLeft: '3px',
});

export const labelPlaceholder = style({
  visibility: 'hidden',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  lineHeight: 1.5,
});

/** ラベル文字のスケルトン */
export const labelSkeleton = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  height: '0.75em',
  minWidth: 80,
  maxWidth: '100%',
  borderRadius: 4,
  background: skeletonGradient,
  backgroundSize: '200% 100%',
  animation: `${skeleton} 1.5s ease-in-out infinite`,
});

/* Base input (共通) */
export const base = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeBase,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusMd,
  padding: '8px 10px',
  minHeight: 40,
  width: '100%',
  boxSizing: 'border-box',
  transition: vars.transition.fast,
  resize: 'vertical',
  selectors: {
    '&::placeholder': {
      color: vars.color.textMuted,
      opacity: 1,
    },
    '&:hover:not(:disabled)': {
      borderColor: vars.color.primaryGradientStart,
      boxShadow: vars.shadow.sm,
      opacity: 0.9,
    },
    '&:focus': {
      outline: 'none',
      borderColor: vars.color.focus,
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: vars.color.disabled,
      borderColor: vars.color.border,
      color: vars.color.disabledText,
      cursor: 'not-allowed',
    },
  },
});

/* Variants */
export const variants = styleVariants({
  primary: {
    borderColor: vars.color.border,
    selectors: {
      '&:focus': {
        borderColor: vars.color.primaryGradientStart,
      },
    },
  },
  outline: {
    borderColor: vars.color.border,
    selectors: {
      '&:focus': {
        borderColor: vars.color.focus,
      },
    },
  },
  text: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderBottomColor: vars.color.border,
    selectors: {
      '&:hover:not(:disabled)': {
        borderBottomColor: vars.color.primaryGradientStart,
      },
      '&:focus': {
        borderColor: 'transparent',
        borderBottomColor: vars.color.focus,
      },
    },
  },
  danger: {
    borderColor: vars.color.danger,
    selectors: {
      '&:focus': {
        borderColor: vars.color.danger,
        boxShadow: `0 0 0 2px ${vars.color.danger}40`,
      },
    },
  },
  default: {
    borderColor: vars.color.border,
    selectors: {
      '&:focus': {
        borderColor: vars.color.textPrimary,
      },
    },
  },
});

/* Sizes */
export const sizes = styleVariants({
  sm: {
    padding: '6px 8px',
    fontSize: vars.font.sizeSm,
    minHeight: 32,
  },
  md: {},
  lg: {
    padding: '10px 12px',
    fontSize: vars.font.sizeLg,
    minHeight: 48,
  },
});

/* Label ラッパー（入力欄の上に表示するラベルとの間隔） */
export const labelWrapper = style({
    color: '#fff',
    marginBottom: '4px',
    marginLeft: '3px',
});

/* Label（スタンドアロンでラベルだけ使う場合） */
export const label = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: '#fff',
  marginBottom: '9.5px',
  display: 'block',
});

/* Error Message ラッパー */
export const errorMessageWrapper = style({
  marginTop: '4px',
  marginLeft: '3px',
});

/* Error Message */
export const errorMessage = style({
  color: vars.color.danger,
});
