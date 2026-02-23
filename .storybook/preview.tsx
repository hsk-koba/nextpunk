import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { themes } from 'storybook/theming';

const NIGHTSTAR_VALUE = '#060810';

const nightStarStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: 24,
  boxSizing: 'border-box',
  backgroundImage: [
    `radial-gradient(2px 2px at 320px 80px, rgba(0, 255, 255, 0.2), transparent)`,
    `radial-gradient(1px 1px at 250px 200px, rgba(255, 0, 255, 0.18), transparent)`,
    `radial-gradient(1px 1px at 150px 50px, rgba(255, 255, 255, 0.35), transparent)`,
    `radial-gradient(1.5px 1.5px at 80px 120px, rgba(0, 255, 255, 0.15), transparent)`,
    `radial-gradient(1.5px 1.5px at 20px 30px, rgba(255, 255, 255, 0.25), transparent)`,
    `radial-gradient(ellipse 70% 40% at 90% 10%, rgba(0, 200, 255, 0.06), transparent)`,
    `radial-gradient(ellipse 50% 35% at 10% 90%, rgba(255, 0, 128, 0.05), transparent)`,
    `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(88, 28, 135, 0.08), transparent)`,
    `linear-gradient(180deg, #060810 0%, #050508 40%, #08061a 70%, #060810 100%)`
  ].join(','),
  backgroundColor: '#060810',
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      // ✅ 修正2: context.globals.backgrounds.value で判定
      const bgValue = context.globals?.backgrounds?.value;
      const isNightstar = bgValue === NIGHTSTAR_VALUE;

      return isNightstar ? (
        <div style={nightStarStyle}>
          <Story />
        </div>
      ) : (
        <Story />
      );
    },
  ],
  parameters: {
    docs: {
      theme: themes.dark,
    },

    backgrounds: {
      options: [
        { name: 'dark', value: '#000000'},
        { name: 'light', value: '#ffffff' },
        { name: 'nightstar', value: NIGHTSTAR_VALUE },
      ],
      initialGlobals: {
        // 👇 Set the initial background color
        backgrounds: { value: 'nightstar' },
      },
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

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;