import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * OctoHub グローバルテーマ（:root）
 * cyan → purple グラデーションをベースにしたダークテーマ
 */
export const vars = createGlobalTheme(':root', {
  /* カラーパレット - Color Palette */
  color: {
    primaryGradientStart: '#00D9FF',
    primaryGradientEnd: '#9D00FF',
    primary:
      'linear-gradient(135deg, #00D9FF 0%, #9D00FF 100%)',
    secondary: '#333333',
    background: '#000000',
    surface: '#1A1A1A',
    border: '#333333',
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textMuted: '#999999',
    textInverse: '#000000',
    /* システムカラー - System Colors */
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
    info: '#17A2B8',
    /* ステートカラー - State Colors */
    hover: '#1F1F1F',
    focus: '#00D9FF',
    disabled: '#2A2A2A',
    disabledText: '#666666',
  },

  /* フォント - Typography */
  font: {
    familyPrimary:
      "'Noto Sans JP', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weightNormal: '400',
    weightMedium: '500',
    weightBold: '700',
    sizeXs: '0.75rem',
    sizeSm: '0.875rem',
    sizeBase: '1rem',
    sizeLg: '1.125rem',
    sizeXl: '1.25rem',
    sizeXxl: '1.5rem',
  },

  /* スペーシング - Spacing */
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    xxl: '2rem',
    xxxl: '3rem',
  },

  /* ボーダー - Borders */
  border: {
    width: '1px',
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '12px',
  },

  /* シャドウ - Shadows */
  shadow: {
    xs: '0 1px 2px rgba(0,0,0,0.12)',
    sm: '0 1px 2px rgba(123, 123, 123, 0.3)',
    md: '0 4px 6px rgba(123, 123, 123, 0.3)',
    lg: '0 10px 15px rgba(123, 123, 123, 0.3)',
  },

  /* 遷移 - Transitions */
  transition: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
    viewDuration: '0.3s',
    viewTiming: 'ease-in-out',
  },

  /* スケルトンローディング（MJ コンポーネント共通） */
  skeleton: {
    duration: '1.5s',
    easing: 'ease-in-out',
    midColor: '#333',
    backgroundSize: '200% 100%',
  },
});
