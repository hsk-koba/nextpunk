import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { MJModal } from './MJModal';
import { MJButton } from './MJButton';

const meta: Meta<typeof MJModal> = {
  component: MJModal,
  title: 'Components/MJModal',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'モーダルの表示状態',
    },
    title: {
      control: 'text',
      description: 'モーダルタイトル',
    },
    hasFooter: {
      control: 'boolean',
      description: 'フッターを表示するか',
    },
    footerType: {
      control: 'select',
      options: ['isOK', 'hasCancelAndOK', 'hasCancelAndSave'],
      description: 'フッターのボタン構成',
    },
    onClose: { action: 'closed' },
  },
  args: {
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJModal>;

/** 「開く」ボタンでモーダルを表示。フッターはキャンセル＋OK */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MJButton label="開く" variant="primary" onClick={() => setOpen(true)} />
        <MJModal
          {...args}
          open={open}
          onClose={() => {
            args.onClose?.();
            setOpen(false);
          }}
          title="確認"
          body="この操作を実行してもよろしいですか？"
          hasFooter
          footerType="hasCancelAndOK"
        />
      </>
    );
  },
};

/** フッターなし。開く → × またはオーバーレイで閉じる */
export const WithoutFooter: Story = {
  render: function WithoutFooterStory(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MJButton label="開く" variant="outline" onClick={() => setOpen(true)} />
        <MJModal
          {...args}
          open={open}
          onClose={() => {
            args.onClose?.();
            setOpen(false);
          }}
          title="お知らせ"
          body="保存が完了しました。閉じるには右上の × を押すか、外側をクリックしてください。"
          hasFooter={false}
          footerType="isOK"
        />
      </>
    );
  },
};

/** フッターは OK のみ */
export const FooterOKOnly: Story = {
  render: function FooterOKOnlyStory(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MJButton label="開く" variant="primary" onClick={() => setOpen(true)} />
        <MJModal
          {...args}
          open={open}
          onClose={() => {
            args.onClose?.();
            setOpen(false);
          }}
          title="利用規約"
          body={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ margin: 0 }}>
                本サービスをご利用いただくには、以下の規約に同意する必要があります。
              </p>
              <p style={{ margin: 0, fontSize: 14, color: '#999' }}>
                同意する場合は「OK」ボタンを押してください。
              </p>
            </div>
          }
          hasFooter
          footerType="isOK"
        />
      </>
    );
  },
};

/** フッターはキャンセル＋保存 */
export const FooterCancelAndSave: Story = {
  render: function FooterCancelAndSaveStory(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MJButton label="開く" variant="primary" onClick={() => setOpen(true)} />
        <MJModal
          {...args}
          open={open}
          onClose={() => {
            args.onClose?.();
            setOpen(false);
          }}
          title="編集の保存"
          body="変更を保存しますか？"
          hasFooter
          footerType="hasCancelAndSave"
        />
      </>
    );
  },
};
