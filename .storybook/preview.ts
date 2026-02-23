import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { themes } from 'storybook/theming';

const NIGHTSTAR_VALUE = '#0f1729';

const nightStarStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: 24,
  boxSizing: 'border-box',
  background: `
    radial-gradient(2px 2px at 320px 80px, rgba(255,255,255,0.25), transparent),
    radial-gradient(1px 1px at 250px 200px, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 150px 50px, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 80px 120px, rgba(255,255,255,0.35), transparent),
    radial-gradient(1.5px 1.5px at 20px 30px, rgba(255,255,255,0.4), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(30, 58, 138, 0.1), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(88, 28, 135, 0.12), transparent),
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent),
    linear-gradient(180deg, #0f1729 0%, #0d0d1a 50%, #0f0f23 100%)
  `,
  backgroundColor: '#0f1729',
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const bg = context.globals?.backgrounds;
      const isNightstar =
        bg?.value === NIGHTSTAR_VALUE || bg?.name === 'dark';
      if (isNightstar) {
        return React.createElement('div', { style: nightStarStyle }, React.createElement(Story));
      }
      return React.createElement(Story);
    },
  ],
  parameters: {
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: NIGHTSTAR_VALUE},
        { name: 'light', value: '#ffffff' },
        { name: 'nightstar', value: NIGHTSTAR_VALUE },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;