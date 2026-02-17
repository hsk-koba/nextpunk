import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/* スケルトンローディング */
const skeleton = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const loadingSelectWrapper = style({
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

/** ローディング時はクリック無効・選択無効 */
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
  marginBottom: '9.5px',
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

/* ドロップダウン矢印用（右端にスペースを確保） */
const selectPaddingRight = '28px';

/* 下向き矢印 SVG (chevron) */
const arrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

/* Base select（MJInput 風） */
export const base = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeBase,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusMd,
  padding: '8px 10px',
  paddingRight: selectPaddingRight,
  minHeight: 40,
  width: '100%',
  boxSizing: 'border-box',
  transition: vars.transition.fast,
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundImage: arrowSvg,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  backgroundSize: '16px',
  selectors: {
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
    paddingRight: selectPaddingRight,
    fontSize: vars.font.sizeSm,
    minHeight: 32,
  },
  md: {},
  lg: {
    padding: '10px 12px',
    paddingRight: selectPaddingRight,
    fontSize: vars.font.sizeLg,
    minHeight: 48,
  },
});

/* Label ラッパー */
export const labelWrapper = style({
  marginBottom: '9.5px',
  color: '#fff',
  marginLeft: '3px',
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
