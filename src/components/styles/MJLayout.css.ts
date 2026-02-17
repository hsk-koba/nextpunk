import { style } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/** レイアウトルート（サイドバー + メインを横並び） */
export const root = style({
  margin: 0,
  padding: 0,
  border: 0,
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: vars.color.background,
  fontFamily: vars.font.familyPrimary,
});

/** メインコンテンツ領域 */
export const main = style({
  margin: 0,
  padding: vars.spacing.md,
  border: 0,
  flex: 1,
  minWidth: 0,
  overflow: 'auto',
  backgroundColor: vars.color.background,
});
