import { style } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/* Sidebar コンテナ */
export const sidebar = style({
  height: '100vh',
  backgroundColor: vars.color.background,
  borderRight: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.md,
  display: 'flex',
  flexDirection: 'column',
  transition: `width ${vars.transition.normal}`,
  overflow: 'hidden',
  fontFamily: vars.font.familyPrimary,
});

/* Logo セクション */
export const logoSection = style({
  padding: vars.spacing.lg,
  borderBottom: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 80,
});

export const logoSectionExpanded = style({
  justifyContent: 'flex-start',
});

export const logoBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
});

export const logoText = style({
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
  background: vars.color.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontFamily: vars.font.familyPrimary,
});

export const logoPlaceholder = style({
  width: '32px',
  height: '32px',
  background: vars.color.primary,
  borderRadius: vars.border.radiusSm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.textInverse,
  fontSize: vars.font.sizeBase,
  fontWeight: vars.font.weightBold,
});

/* ナビゲーション */
export const navSection = style({
  flex: 1,
  overflowY: 'auto',
  padding: `${vars.spacing.md} 0`,
});

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const listItem = style({
  padding: 0,
  margin: `0 ${vars.spacing.sm}`,
  borderRadius: vars.border.radiusSm,
  overflow: 'hidden',
});

/* リスト項目ボタン */
export const listItemButton = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  width: '100%',
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  marginBottom: vars.spacing.xs,
  border: 'none',
  borderRadius: vars.border.radiusSm,
  background: 'transparent',
  color: vars.color.textPrimary,
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightNormal,
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  boxSizing: 'border-box',
  textAlign: 'left',
  textDecoration: 'none',
  justifyContent: 'flex-start',
  ':hover': {
    backgroundColor: vars.color.hover,
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const listItemButtonSelected = style({
  background: vars.color.primary,
  color: vars.color.textInverse,
  ':hover': {
    opacity: 0.95,
    filter: 'hue-rotate(-10deg)',
  },
});

export const listItemButtonCollapsed = style({
  justifyContent: 'center',
  padding: vars.spacing.md,
});

export const listItemIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '40px',
  minWidth: '40px',
  color: 'inherit',
});

export const listItemText = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
});

/* バッジ */
export const badge = style({
  backgroundColor: vars.color.danger,
  color: vars.color.textInverse,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  padding: '2px 6px',
  borderRadius: '100%',
  minWidth: '18px',
  height: '18px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: vars.spacing.sm,
});

export const badgeCollapsed = style({
  position: 'absolute',
  top: 8,
  right: 8,
  marginLeft: 0,
});

/* アカウントセクション */
export const accountSection = style({
  padding: vars.spacing.lg,
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
});

export const accountButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: vars.spacing.md,
  width: '100%',
  padding: vars.spacing.md,
  border: 'none',
  borderRadius: vars.border.radiusSm,
  background: 'transparent',
  color: vars.color.textPrimary,
  fontFamily: vars.font.familyPrimary,
  cursor: 'pointer',
  transition: `all ${vars.transition.fast}`,
  boxSizing: 'border-box',
  textAlign: 'left',
  ':hover': {
    backgroundColor: vars.color.hover,
  },
});

export const accountButtonCollapsed = style({
  justifyContent: 'center',
});

export const accountInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  flex: 1,
  minWidth: 0,
});

export const accountDetails = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
});

export const accountName = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.textPrimary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const accountEmail = style({
  fontFamily: vars.font.familyPrimary,
  fontSize: vars.font.sizeXs,
  color: vars.color.textSecondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/* リスト項目ラッパー（バッジ位置用） */
export const listItemButtonInner = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  flex: 1,
  minWidth: 0,
});

export const listItemButtonWrapper = style({
  position: 'relative',
});
