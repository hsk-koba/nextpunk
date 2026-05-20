import { style } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/** レイアウトルート（サイドバー + メインを横並び） */
export const root = style({
  margin: 0,
  padding: 0,
  border: 0,
  display: 'flex',
  width: '100%',
  height: '100vh',
  minHeight: '100vh',
  overflow: 'hidden',
  backgroundColor: vars.color.background,
  fontFamily: vars.font.familyPrimary,
});

/** サイドバー枠（スクロール時もビューポートに固定） */
export const sidebarSlot = style({
  flexShrink: 0,
  position: 'sticky',
  top: 0,
  alignSelf: 'flex-start',
  height: '100vh',
  maxHeight: '100vh',
  zIndex: 20,
});

/** メインコンテンツ領域（この領域のみ縦スクロール） */
export const main = style({
  margin: 0,
  padding: vars.spacing.xxl,
  border: 0,
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  backgroundColor: vars.color.background,
});
