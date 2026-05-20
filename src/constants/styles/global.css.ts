import { globalStyle } from '@vanilla-extract/css';
import { vars } from './vars.css';

/** OctoHub ダークテーマを html/body に適用（vars と単一ソース） */
globalStyle('html', {
  colorScheme: 'dark',
  height: '100%',
  maxWidth: '100vw',
  overflow: 'hidden',
});

globalStyle('body', {
  color: vars.color.textPrimary,
  background: vars.color.background,
  fontFamily: vars.font.familyPrimary,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  height: '100%',
  maxWidth: '100vw',
  overflow: 'hidden',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});
