import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

const boxSize = 18;

/* クリック時のパルスアニメーション（MJButton / MJRadio と同様） */
const brightnessPulse = keyframes({
  from: { filter: 'brightness(1.7)' },
  to: { filter: 'brightness(1)' },
});

export const itemPulse = style({
  animation: `${brightnessPulse} 0.8s ease`,
});

/* グループラベル用ラッパー */
export const labelWrapper = style({
  marginBottom: '9.5px',
  color: '#fff',
  marginLeft: '3px',
});

/* 1 つのチェックボックス項目（label 要素） */
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

/* ネイティブ input を非表示 */
export const input = style({
  position: 'absolute',
  width: 0,
  height: 0,
  opacity: 0,
  margin: 0,
  padding: 0,
  pointerEvents: 'none',
});

/* チェックボックスの四角 */
export const box = style({
  position: 'relative',
  flexShrink: 0,
  width: boxSize,
  height: boxSize,
  minWidth: boxSize,
  minHeight: boxSize,
  borderRadius: vars.border.radiusSm,
  border: `2px solid ${vars.color.border}`,
  backgroundColor: 'transparent',
  transition: vars.transition.fast,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    [`${optionItem}:hover input:not(:disabled) + &`]: {
      borderColor: vars.color.primaryGradientStart,
    },
    [`${input}:focus-visible + &`]: {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
    },
    [`${optionItem}:has(${input}:checked) &`]: {
      borderColor: vars.color.primaryGradientStart,
      backgroundColor: vars.color.primaryGradientStart,
    },
    [`${optionItem}:has(${input}:checked) &::after`]: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 5,
      height: 9,
      border: `solid ${vars.color.textInverse}`,
      borderWidth: '0 2px 2px 0',
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    [`${optionItem}:has(${input}:disabled) &`]: {
      borderColor: vars.color.border,
      backgroundColor: vars.color.disabled,
    },
    [`${optionItem}:has(${input}:disabled:checked) &`]: {
      backgroundColor: vars.color.disabled,
      borderColor: vars.color.border,
    },
    [`${optionItem}:has(${input}:disabled:checked) &::after`]: {
      borderColor: vars.color.disabledText,
    },
  },
});

/* ラベルテキスト */
export const optionLabel = style({
  flex: 1,
});

/* エラーメッセージ用ラッパー（minHeight で高さを確保し、エラー表示の有無でレイアウトがずれないようにする） */
export const errorMessageWrapper = style({
  marginTop: '4px',
  marginLeft: '3px',
  minHeight: '1.25rem',
});

export const errorMessage = style({
  color: vars.color.danger,
});
