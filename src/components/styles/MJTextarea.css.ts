import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/* Base textarea（共通） */
export const base = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeBase,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusMd,
  padding: '8px 10px',
  minHeight: 80,
  width: '100%',
  boxSizing: 'border-box',
  transition: vars.transition.fast,
  resize: 'none',
  display: 'block',
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
    minHeight: 64,
  },
  md: {},
  lg: {
    padding: '10px 12px',
    fontSize: vars.font.sizeLg,
    minHeight: 120,
  },
});

/* Label ラッパー（入力欄の上に表示するラベルとの間隔） */
export const labelWrapper = style({
  color: '#fff',
  marginBottom: '4px',
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
