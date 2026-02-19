import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';
import {
  skeletonGradient,
  skeletonAnimation,
  skeletonBackgroundSize,
} from '../../constants/styles/skeleton.css';

const radioSize = 18;
const radioDotSize = 8;

/* クリック時のパルスアニメーション（MJButton と同様） */
const brightnessPulse = keyframes({
  from: { filter: 'brightness(1.7)' },
  to: { filter: 'brightness(1)' },
});

export const optionItemPulse = style({
  animation: `${brightnessPulse} 0.8s ease`,
});

/** ラジオの円のスケルトン */
export const circleSkeleton = style({
  flexShrink: 0,
  width: radioSize,
  height: radioSize,
  minWidth: radioSize,
  minHeight: radioSize,
  borderRadius: '50%',
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** ローディング時のオプションラベル領域（枠保持用の非表示テキスト + スケルトン） */
export const labelSkeletonWrapper = style({
  flex: 1,
  minWidth: 0,
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
});

export const labelPlaceholder = style({
  visibility: 'hidden',
  fontSize: 'inherit',
  lineHeight: 1.5,
});

/** オプションラベル文字のスケルトン */
export const labelSkeleton = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  height: '1em',
  width: '100%',
  minWidth: 80,
  borderRadius: 4,
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** グループラベル（上ラベル）のスケルトン用ラッパー */
export const groupLabelSkeletonWrapper = style({
  position: 'relative',
  display: 'inline-block',
  marginBottom: '9.5px',
  marginLeft: '3px',
});

export const groupLabelPlaceholder = style({
  visibility: 'hidden',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  lineHeight: 1.5,
});

/** グループラベル文字のスケルトン */
export const groupLabelSkeleton = style({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  height: '0.75em',
  minWidth: 80,
  maxWidth: '100%',
  borderRadius: 4,
  background: skeletonGradient,
  backgroundSize: skeletonBackgroundSize,
  animation: skeletonAnimation,
});

/** ローディング時はクリック無効 */
export const loading = style({
  cursor: 'wait',
  pointerEvents: 'none',
});

/* グループラベル用ラッパー */
export const labelWrapper = style({
  marginBottom: '9.5px',
  color: '#fff',
  marginLeft: '3px',
});

/* ラジオグループコンテナ */
export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
});

/* 1 つのラジオ項目（label 要素） */
export const optionItem = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  cursor: 'pointer',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeBase,
  color: vars.color.textPrimary,
  userSelect: 'none',
  selectors: {
    '&:has(input:disabled)': {
      cursor: 'not-allowed',
      color: vars.color.disabledText,
    },
  },
});

/* ネイティブ input を非表示にして独自の円で表示 */
export const input = style({
  position: 'absolute',
  width: 0,
  height: 0,
  opacity: 0,
  margin: 0,
  padding: 0,
  pointerEvents: 'none',
});

/* ラジオの円（外側） */
export const circle = style({
  flexShrink: 0,
  width: radioSize,
  height: radioSize,
  borderRadius: '50%',
  border: `2px solid ${vars.color.border}`,
  backgroundColor: 'transparent',
  transition: vars.transition.fast,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    [`${optionItem}:hover ${input}:not(:disabled) + &`]: {
      borderColor: vars.color.primaryGradientStart,
    },
    [`${input}:focus-visible + &`]: {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
    },
    [`${optionItem}:has(${input}:checked) &`]: {
      borderColor: vars.color.primaryGradientStart,
      borderWidth: 2,
    },
    [`${optionItem}:has(${input}:checked) &::after`]: {
      content: '""',
      display: 'block',
      width: radioDotSize,
      height: radioDotSize,
      borderRadius: '50%',
      backgroundColor: vars.color.primaryGradientStart,
    },
    [`${optionItem}:has(${input}:disabled) &`]: {
      borderColor: vars.color.border,
      backgroundColor: vars.color.disabled,
    },
    [`${optionItem}:has(${input}:disabled:checked) &::after`]: {
      backgroundColor: vars.color.disabledText,
    },
  },
});

/* オプションのテキストラベル */
export const optionLabel = style({
  flex: 1,
  color: '#fff',
});

/* エラーメッセージ用ラッパー */
export const errorMessageWrapper = style({
  marginTop: '4px',
  marginLeft: '3px',
});

export const errorMessage = style({
  color: vars.color.danger,
});
