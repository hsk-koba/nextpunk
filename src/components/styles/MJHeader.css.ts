import { style } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/**
 * ヘッダー（MJSidebar と同じトーン: 左にロゴ＋ナビ、右にアカウント）
 */
export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.md,
  minHeight: 56,
  padding: `0 ${vars.spacing.lg}`,
  backgroundColor: vars.color.background,
  borderBottom: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.md,
  fontFamily: vars.font.familyPrimary,
  flexShrink: 0,
});

/** 左側エリア（ロゴ + ナビ） */
export const left = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  minWidth: 0,
  flex: 1,
});

/** ロゴエリア（MJSidebar の logoBox 相当） */
export const logoBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexShrink: 0,
  padding: `${vars.spacing.md} 0`,
  marginRight: vars.spacing.sm,
  // borderRight: `1px solid ${vars.color.border}`,
});

/** ロゴテキスト（logo 未指定時・MJSidebar の logoText 相当） */
export const logoText = style({
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
  background: vars.color.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontFamily: vars.font.familyPrimary,
});

/** ナビ横並び */
export const navRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

/** ナビボタン（MJSidebar の listItemButton に合わせた見た目） */
export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
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
  ':hover': {
    backgroundColor: vars.color.hover,
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const navButtonSelected = style({
  background: vars.color.primary,
  color: vars.color.textInverse,
  ':hover': {
    opacity: 0.95,
    filter: 'hue-rotate(-10deg)',
  },
});

export const navButtonIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 24,
  minWidth: 24,
  color: 'inherit',
});

export const navButtonText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/** 右側エリア（アカウントボタン） */
export const right = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  flexShrink: 0,
});

/** アカウントボタン（MJSidebar の accountButton 相当） */
export const accountButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: vars.spacing.md,
  padding: vars.spacing.sm,
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
