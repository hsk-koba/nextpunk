import { style } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  boxShadow: vars.shadow.xs,
});

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
  borderRight: `1px solid ${vars.color.border}`,
  whiteSpace: 'nowrap',
  backgroundColor: vars.color.surface,
});

export const headerCellCorner = style({
  minWidth: 80,
  textAlign: 'left',
});

export const bodyCell = style({
  padding: 0,
  color: vars.color.textPrimary,
  borderBottom: `1px solid ${vars.color.border}`,
  borderRight: `1px solid ${vars.color.border}`,
  verticalAlign: 'middle',
});

export const bodyCellLabel = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  fontWeight: vars.font.weightMedium,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  whiteSpace: 'nowrap',
});

export const bodyRow = style({
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.hover,
    },
  },
});

/** 数値セル：Primary オーバーフローバーを表示 */
export const pivotCellWrap = style({
  position: 'relative',
  minWidth: 56,
  height: '100%',
  minHeight: 36,
});

/** セル内の Primary 色バー（数値に応じた幅） */
export const pivotCellBar = style({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  background: vars.color.primary,
  opacity: 0.8,
  maxWidth: '100%',
  transition: 'width 0.2s ease-out',
});

export const pivotCellValue = style({
  position: 'relative',
  zIndex: 1,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
});

export const totalRow = style({
  fontWeight: vars.font.weightBold,
  backgroundColor: 'rgba(0,0,0,0.2)',
});

export const totalCell = style({
  backgroundColor: 'rgba(0,0,0,0.15)',
});
