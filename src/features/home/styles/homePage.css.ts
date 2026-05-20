import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/styles/vars.css';

export const page = style({
  maxWidth: 720,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xl,
});

export const lead = style({
  color: vars.color.textSecondary,
  lineHeight: 1.6,
});

export const sectionBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
  lineHeight: 1.65,
});

export const list = style({
  margin: 0,
  paddingLeft: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
});

export const code = style({
  fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
  fontSize: vars.font.sizeXs,
  color: vars.color.primaryGradientStart,
  backgroundColor: vars.color.surface,
  padding: '2px 6px',
  borderRadius: vars.border.radiusSm,
  border: `1px solid ${vars.color.border}`,
});

export const codeBlock = style({
  fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
  fontSize: vars.font.sizeXs,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  padding: vars.spacing.md,
  borderRadius: vars.border.radiusMd,
  border: `1px solid ${vars.color.border}`,
  overflowX: 'auto',
  whiteSpace: 'pre',
  lineHeight: 1.5,
  margin: 0,
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: vars.font.sizeSm,
});

export const tableHeadCell = style({
  textAlign: 'left',
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderBottom: `2px solid ${vars.color.border}`,
  color: vars.color.textPrimary,
  fontWeight: vars.font.weightBold,
});

export const tableCell = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: 'top',
});
