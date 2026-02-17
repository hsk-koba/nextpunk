import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

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
