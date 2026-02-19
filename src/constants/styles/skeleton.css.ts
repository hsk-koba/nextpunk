import { keyframes } from '@vanilla-extract/css';
import { vars } from './vars.css';

/**
 * MJ コンポーネント共通のスケルトンローディング用。
 * vars.skeleton のトークンと keyframes / gradient をここで定義し、各コンポーネントから参照する。
 */

export const skeletonKeyframes = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const skeletonGradient = `linear-gradient(to right, ${vars.color.surface} 0%, ${vars.skeleton.midColor} 50%, ${vars.color.surface} 100%)`;

export const skeletonAnimation = `${skeletonKeyframes} ${vars.skeleton.duration} ${vars.skeleton.easing} infinite`;

export const skeletonBackgroundSize = vars.skeleton.backgroundSize;
