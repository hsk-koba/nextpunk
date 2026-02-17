import type { Meta, StoryObj } from '@storybook/react';
import { MJAvatar } from './MJAvatar';

const meta: Meta<typeof MJAvatar> = {
  component: MJAvatar,
  title: 'Components/MJAvatar',
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '画像 URL',
    },
    alt: {
      control: 'text',
      description: '画像の代替テキスト（フォールバック時のイニシャル算出にも使用）',
    },
    initials: {
      control: 'text',
      description: '画像なし時に表示するテキスト（先頭2文字程度で表示）',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'サイズ',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: '#0a0a0a',
          minHeight: 120,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJAvatar>;

/** 画像あり（プレースホルダー） */
export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=octohub',
    alt: 'ユーザー',
    size: 'md',
  },
};

/** イニシャルのみ（画像なし） */
export const InitialsOnly: Story = {
  args: {
    initials: '田中太郎',
    size: 'md',
  },
};

/** 英字イニシャル */
export const InitialsEnglish: Story = {
  args: {
    initials: 'Taro Tanaka',
    size: 'md',
  },
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <MJAvatar initials="小" size="sm" />
      <MJAvatar initials="中" size="md" />
      <MJAvatar initials="大" size="lg" />
    </div>
  ),
};

/** 画像読み込み失敗時はイニシャル表示 */
export const FallbackOnError: Story = {
  args: {
    src: 'https://invalid.example/avatar.png',
    initials: 'エラー',
    size: 'md',
  },
};
