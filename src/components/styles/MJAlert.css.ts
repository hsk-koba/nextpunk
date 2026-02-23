import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const duration = '0.35s';
const timing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const slideInFromTop = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideOutToTop = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
});

export const container = style({
  position: 'fixed',
  top: 20,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: vars.spacing.md,
  paddingTop: 'env(safe-area-inset-top, 8px)',
  zIndex: 1100,
  pointerEvents: 'none',
});

const baseWrapper = style({
  pointerEvents: 'auto',
  width: '100%',
  maxWidth: 400,
  padding: '2px',
  borderRadius: vars.border.radiusMd,
  boxShadow: vars.shadow.md,
  animationName: slideInFromTop,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

export const alertWrapperClosing = style({
  animationName: slideOutToTop,
  animationDuration: '0.25s',
  animationTimingFunction: 'ease-in',
  animationFillMode: 'forwards',
});

/* グラデーション枠: 外側がグラデーション、内側は surface */
const gradientBorderBase = {
  borderRadius: 'calc(var(--border-radius) - 2px)',
  background: vars.color.surface,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  minHeight: 48,
};

export const alertInner = style({
  ...gradientBorderBase,
  '--border-radius': vars.border.radiusMd,
});

export const iconBox = style({
  flexShrink: 0,
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const message = style({
  flex: 1,
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightNormal,
  color: vars.color.textPrimary,
  lineHeight: 1.4,
});

/* バリアント: 枠線グラデーションとアイコン色 */
const infoGradient = 'linear-gradient(135deg, #17A2B8 0%, #0d6efd 100%)';
const successGradient = 'linear-gradient(135deg, #28A745 0%, #20c997 100%)';
const errorGradient = 'linear-gradient(135deg, #DC3545 0%, #c82333 100%)';
const warningGradient = 'linear-gradient(135deg, #FFC107 0%, #fd7e14 100%)';

export const variantWrapper = styleVariants({
  info: [
    baseWrapper,
    {
      background: infoGradient,
    },
  ],
  success: [
    baseWrapper,
    {
      background: successGradient,
    },
  ],
  error: [
    baseWrapper,
    {
      background: errorGradient,
    },
  ],
  warning: [
    baseWrapper,
    {
      background: warningGradient,
    },
  ],
});

export const variantIcon = styleVariants({
  info: [{ color: '#17A2B8' }],
  success: [{ color: '#28A745' }],
  error: [{ color: '#DC3545' }],
  warning: [{ color: '#FFC107' }],
});
