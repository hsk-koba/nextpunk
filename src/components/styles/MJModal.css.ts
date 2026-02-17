import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const duration = vars.transition.viewDuration;
const timing = vars.transition.viewTiming;

const overlayFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const overlayFadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const paperScaleIn = keyframes({
  from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.85)' },
  to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const paperScaleOut = keyframes({
  from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  to: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.85)' },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
});

export const overlayOpen = style({
  opacity: 0,
  animationName: overlayFadeIn,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

export const overlayClosing = style({
  animationName: overlayFadeOut,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

export const paper = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  border: `1px solid transparent`,
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
  width: '100%',
  maxWidth: 400,
  backgroundColor: vars.color.surface,
  backgroundImage: `
    linear-gradient(${vars.color.surface}, ${vars.color.surface}), 
    linear-gradient(45deg, ${vars.color.primaryGradientStart}, ${vars.color.primaryGradientEnd})
  `,
  
  // 描画範囲を指定
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  borderRadius: `${vars.border.radiusMd}`,
  padding: vars.spacing.md,
  color: vars.color.textPrimary,
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

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: vars.spacing.sm,
  // borderBottom: `1px solid ${vars.color.border}`,
});

export const body = style({
  padding: vars.spacing.md,
  minHeight: 30,
});

export const footer = style({
  padding: vars.spacing.sm,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.sm
});