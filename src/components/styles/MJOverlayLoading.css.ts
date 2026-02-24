import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const duration = vars.transition.viewDuration;
const timing = vars.transition.viewTiming;

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const overlayFadeScaleIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const overlayFadeScaleOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

/** 全画面オーバーレイの背景（ベース） */
export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(4px)',
});

/** 表示時: 拡大 + フェードイン */
export const backdropOpen = style({
  opacity: 0,
  animationName: overlayFadeScaleIn,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

/** 非表示時: 縮小 + フェードアウト */
export const backdropClosing = style({
  animationName: overlayFadeScaleOut,
  animationDuration: duration,
  animationTimingFunction: timing,
  animationFillMode: 'forwards',
});

/** 中央のローディングブロック */
export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  padding: 0,
  backgroundColor: 'transparent',
});

/** スピナー */
export const spinner = style({
  display: 'inline-block',
  width: 40,
  height: 40,
  border: '3px solid',
  borderColor: vars.color.border,
  borderTopColor: vars.color.primaryGradientStart,
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

/** メッセージ（オプション） */
export const message = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  color: vars.color.textSecondary,
  marginTop: vars.spacing.md,
});
