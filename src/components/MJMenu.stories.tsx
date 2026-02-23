import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Copy, LogOut } from 'lucide-react';
import { MJMenu } from './MJMenu';
import { MJButton } from './MJButton';
import type { MJMenuItem } from './MJMenu';

const meta: Meta<typeof MJMenu> = {
  component: MJMenu,
  title: 'Components/MJMenu',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: '開閉状態（制御）' },
    defaultOpen: { control: 'boolean', description: '初期 open（非制御）' },
    anchorOrigin: {
      control: 'object',
      description: 'アンカーに対するメニューの付く位置',
    },
    transformOrigin: {
      control: 'object',
      description: 'メニューが伸びる基準点',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 48,
          minHeight: 200,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJMenu>;

const sampleItems: MJMenuItem[] = [
  { label: '編集', icon: Edit, onClick: () => console.log('編集') },
  { label: 'コピー', icon: Copy, onClick: () => console.log('コピー') },
  { type: 'divider' },
  { label: '削除', icon: Trash2, onClick: () => console.log('削除') },
  { label: '無効な項目', disabled: true },
];

/** ボタンクリックで開く（非制御） */
export const Default: Story = {
  args: {
    items: sampleItems,
    defaultOpen: false,
  },
  render: (args) => (
    <MJMenu {...args}>
      <button
        type="button"
        style={{
          padding: '10px 16px',
          border: '1px solid #333',
          borderRadius: 8,
          background: '#1a1a1a',
          color: '#fff',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '1rem',
        }}
      >
        メニューを開く
      </button>
    </MJMenu>
  ),
};

/** 三点リーダーアイコンボタンで開く */
export const WithIconButton: Story = {
  render: () => (
    <MJMenu items={sampleItems}>
      <button
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          border: '1px solid #333',
          borderRadius: 8,
          background: '#1a1a1a',
          color: '#fff',
          cursor: 'pointer',
        }}
        aria-label="メニューを開く"
      >
        <MoreVertical size={20} />
      </button>
    </MJMenu>
  ),
};

/** 制御モード（open + onClose） */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);
    const items: MJMenuItem[] = [
      { label: 'ログアウト', icon: LogOut, onClick: () => setOpen(false) },
    ];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <MJButton
          label={open ? '閉じる' : 'メニューを開く'}
          variant="primary"
          onClick={() => setOpen((o) => !o)}
        />
        <MJMenu open={open} onClose={() => setOpen(false)} items={items}>
          <button
            type="button"
            style={{
              padding: '8px 12px',
              background: 'transparent',
              border: '1px dashed #666',
              color: '#999',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            この要素はトリガー（クリックで開閉）
          </button>
        </MJMenu>
      </div>
    );
  },
};

/** 右寄せメニュー（anchorOrigin: bottom-right） */
export const AnchorBottomRight: Story = {
  args: {
    items: sampleItems,
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <MJMenu {...args}>
        <button
          type="button"
          style={{
            padding: '10px 16px',
            border: '1px solid #333',
            borderRadius: 8,
            background: '#1a1a1a',
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '1rem',
          }}
        >
          右寄せメニュー
        </button>
      </MJMenu>
    </div>
  ),
};
