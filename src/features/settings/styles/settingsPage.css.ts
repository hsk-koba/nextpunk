import { style } from '@vanilla-extract/css';
import { vars } from '@/constants/styles/vars.css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xl,
  width: '100%',
  maxWidth: 'none',
  boxSizing: 'border-box',
});

export const searchCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
  padding: vars.spacing.lg,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusMd,
  boxShadow: vars.shadow.xs,
});

export const searchTitle = style({
  color: vars.color.textPrimary,
});

export const searchGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: vars.spacing.lg,
  alignItems: 'end',
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const searchActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.spacing.sm,
  justifyContent: 'flex-end',
});

export const resultHeader = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
});

export const resultCount = style({
  color: vars.color.textSecondary,
  fontSize: vars.font.sizeSm,
});

export const tableWrap = style({
  width: '100%',
  overflowX: 'auto',
  marginTop: vars.spacing.lg,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.radiusMd,
  backgroundColor: vars.color.surface,
});

export const tableFullWidth = style({
  width: '100%',
});
