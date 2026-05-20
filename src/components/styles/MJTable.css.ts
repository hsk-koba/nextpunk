import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/* ソートクリック時：水色 → 白に戻る */
const sortButtonFlashKeyframes = keyframes({
  '0%': { backgroundColor: vars.color.primaryGradientStart, color: vars.color.textInverse },
  '100%': { backgroundColor: vars.color.background, color: vars.color.textPrimary },
});

/* テーブル（縦枠線なし） */
export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  boxShadow: vars.shadow.xs,
});

/* ヘッダー行（白背景） */
export const thead = style({});

export const headerRow = style({
  color: vars.color.textPrimary,
});

export const headerCell = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  textAlign: 'center',
  fontWeight: vars.font.weightBold,
  color: vars.color.textPrimary,
  borderBottom: `2px solid ${vars.color.border}`,
  whiteSpace: 'nowrap',
});

/* 縦枠線はつけない（border-left / border-right なし） */
export const bodyCell = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  color: vars.color.textPrimary,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const bodyRow = style({
  //backgroundColor: vars.color.surface,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.hover,
    },
  },
});

/* ソート可能ヘッダー用ボタン */
export const sortButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  width: '100%',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  margin: `-${vars.spacing.sm} -${vars.spacing.md}`,
  border: 'none',
  background: 'none',
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  textAlign: 'center',
  borderRadius: vars.border.radiusSm,
});

/* ソートクリック時のフラッシュアニメーション */
export const sortButtonFlash = style({
  animation: `${sortButtonFlashKeyframes} 0.5s ease-out forwards`,
});
