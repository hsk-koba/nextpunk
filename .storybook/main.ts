import type { StorybookConfig } from '@storybook/nextjs-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    // 既存の plugins を維持したまま末尾に追加（mergeConfig は plugins を丸ごと置き換えるため使わない）
    if (!Array.isArray(config.plugins)) config.plugins = [];
    config.plugins.push(vanillaExtractPlugin());
    return config;
  },
};
export default config;