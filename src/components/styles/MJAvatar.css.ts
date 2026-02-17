import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../constants/styles/vars.css';

/* 共通：円形・中央揃え・はみ出し非表示 */
export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: '50%',
  flexShrink: 0,
  backgroundColor: vars.color.surface,
  border: `2px solid ${vars.color.border}`,
});

/* サイズ */
export const sizes = styleVariants({
  sm: {
    width: '32px',
    height: '32px',
  },
  md: {
    width: '40px',
    height: '40px',
  },
  lg: {
    width: '56px',
    height: '56px',
  },
});

/* 画像 */
export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

/* 画像なし時のフォールバック（イニシャル等） */
export const fallback = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: vars.font.familyPrimary,
  fontWeight: vars.font.weightBold,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
});

/* フォールバック用フォントサイズ（サイズに応じて） */
export const fallbackSizes = styleVariants({
  sm: { fontSize: vars.font.sizeXs },
  md: { fontSize: vars.font.sizeSm },
  lg: { fontSize: vars.font.sizeBase },
});

// スケルトンローディング風アニメーション
const skeleton = keyframes({
  '0%': {
    backgroundPosition: '-200% 0',
  },
  '100%': {
    backgroundPosition: '200% 0',
  },
});

export const loading = style({
  borderRadius: '50%',
  background: `linear-gradient(to right, ${vars.color.surface} 0%, #333 50%, ${vars.color.surface} 100%)`,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: '200% 100%',
  animation: `${skeleton} 1.5s ease-in-out infinite`,
});
