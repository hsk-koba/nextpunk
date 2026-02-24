import type { Meta, StoryObj } from '@storybook/react';
import { OverlayProvider, useOverlay } from './MJOverlayLoading';
import { MJButton } from './MJButton';

function OverlayDemo() {
  const overlay = useOverlay();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <MJButton
        variant="primary"
        label="Loading 表示"
        onClick={() => overlay.showLoading()}
      />
      <MJButton
        variant="outline"
        label="メッセージ付きで表示"
        onClick={() => overlay.showLoading('処理中...')}
      />
      <MJButton
        variant="text"
        label="Loading 非表示"
        onClick={() => overlay.hideLoading()}
      />
    </div>
  );
}

const meta: Meta<typeof OverlayDemo> = {
  component: OverlayDemo,
  title: 'Organisms/MJOverlayLoading',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <OverlayProvider>
        <div style={{ padding: 24, minHeight: 200 }}>
          <Story />
        </div>
      </OverlayProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OverlayDemo>;

export const WithUseOverlay: Story = {
  args: {},
};

export const VisibleByDefault: Story = {
  render: function VisibleStory() {
    return (
      <OverlayProvider>
        <OverlayTrigger />
      </OverlayProvider>
    );
  },
};

function OverlayTrigger() {
  const overlay = useOverlay();
  return (
    <>
      <MJButton
        variant="primary"
        label="2秒間 Loading 表示"
        onClick={() => {
          overlay.showLoading('しばらくお待ちください');
          setTimeout(() => overlay.hideLoading(), 2000);
        }}
      />
    </>
  );
}
