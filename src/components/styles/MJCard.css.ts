import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const base = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.border.radiusMd,
  color: vars.color.textPrimary,
  overflow: 'hidden',
  boxSizing: 'border-box',
});

export const root = styleVariants({
  elevated: [
    base,
    {
      boxShadow: vars.shadow.md,
      border: `1px solid ${vars.color.border}`,
    },
  ],
  outlined: [
    base,
    {
      border: `1px solid ${vars.color.border}`,
      boxShadow: vars.shadow.xs,
    },
  ],
  gradient: [
    base,
    {
      padding: '2px',
      background: vars.color.primary,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box',
      boxShadow: vars.shadow.xs,
    },
  ],
});

export const gradientInner = style({
  backgroundColor: vars.color.surface,
  borderRadius: 'calc(var(--card-radius) - 2px)',
  overflow: 'hidden',
  minHeight: '100%',
  '--card-radius': vars.border.radiusMd,
});

export const header = style({
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  borderBottom: `1px solid ${vars.color.border}`,
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  color: vars.color.textPrimary,
});

export const body = style({
  padding: vars.spacing.lg,
});

export const footer = style({
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  borderTop: `1px solid ${vars.color.border}`,
});

export const clickable = style({
  cursor: 'pointer',
  transition: vars.transition.fast,
  selectors: {
    '&:hover': {
      opacity: 0.95,
    },
  },
});
