import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

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

export const baseIcon = styleVariants({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    verticalAlign: 'middle',
    lineHeight: 1,
  },
  sm: {
    width: 29,
    height: 29,
  },
  md: {
    width: 36,
    height: 36,
  },
  lg: {
    width: 50,
    height: 50,
  },
});

/* Base button */
export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textShadow: vars.shadow.md,
  gap: 8,
  padding: '12px 16px',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeBase,
  fontWeight: 500,
  lineHeight: 1.5,
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',
  border: `1px solid transparent`,
  borderRadius: `${vars.border.radiusSm}`,
  minHeight: 44,
  background: 'none',
  textTransform: 'none',
  transition: vars.transition.fast,
  boxSizing: 'border-box',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      background: vars.color.disabled,
      opacity: 0.6,
    },
  },
});

/* Variants */
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
    border: '1px solid transparent', // 枠線の太さ分だけ透明な線を作る
    borderRadius: `${vars.border.radiusSm}`, // 角丸が効く！
  
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

/* Sizes */
export const sizes = styleVariants({
  sm: {
    padding: '8px 16px',
    fontSize: vars.font.sizeSm,
    minHeight: 36,
  },
  md: {},
  lg: {
    padding: '18px 28px',
    fontSize: vars.font.sizeLg,
    minHeight: 52,
  },
});

/* Icon container (wraps icon or content) */
export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});

export const content = style({
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: 1.5,
});
