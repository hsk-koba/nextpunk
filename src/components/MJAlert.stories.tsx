import type { Meta, StoryObj } from '@storybook/react';
import { AlertProvider, useAlert } from './MJAlert';
import { MJButton } from './MJButton';

function AlertDemo() {
  const alert = useAlert();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <MJButton
        variant="primary"
        label="Info"
        onClick={() => alert.showInfo('保存しました。')}
      />
      <MJButton
        variant="primary"
        label="Success"
        onClick={() => alert.showSuccess('送信が完了しました。')}
      />
      <MJButton
        variant="danger"
        label="Error"
        onClick={() => alert.showError('エラーが発生しました。')}
      />
      <MJButton
        variant="outline"
        label="Warning"
        onClick={() => alert.showWarning('未保存の変更があります。')}
      />
    </div>
  );
}

const meta: Meta<typeof AlertDemo> = {
  component: AlertDemo,
  title: 'Organisms/MJAlert',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AlertProvider autoDismissMs={5000}>
        <div style={{ padding: 24, minHeight: 120 }}>
          <Story />
        </div>
      </AlertProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AlertDemo>;

export const WithUseAlert: Story = {
  args: {},
};

export const InfoOnly: Story = {
  render: () => <InfoTrigger />,
};

function InfoTrigger() {
  const alert = useAlert();
  return (
    <MJButton
      variant="primary"
      label="Show Info"
      onClick={() => alert.showInfo('iPhone風に上からスライドするアラートです。')}
    />
  );
}
