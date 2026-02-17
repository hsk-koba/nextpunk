import type { Meta, StoryObj } from '@storybook/react';
import { MJInput } from './MJInput';

const meta: Meta<typeof MJInput> = {
  component: MJInput,
  title: 'Components/MJInput',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'text', 'danger', 'default'],
      description: '入力欄のバリアント',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'サイズ',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
    label: {
      control: 'text',
      description: 'ラベル（表示する場合はストーリー側でラップ）',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#0a0a0a', minHeight: 120, maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJInput>;

/** プライマリ（デフォルト） */
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'メールアドレス',
    placeholder: '入力してください',
  },
};

/** アウトライン */
export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'アウトライン',
  },
};

/** テキスト（下線のみ） */
export const Text: Story = {
  args: {
    variant: 'text',
    placeholder: 'テキストバリアント',
  },
};

/** エラー表示用 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    placeholder: 'エラーがあります',
    errorMessage: 'エラーは絶対必須です',
  },
};

/** デフォルト（ニュートラル） */
export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: 'デフォルト',
  },
};

/** 小さいサイズ */
export const SizeSmall: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    placeholder: 'Small',
  },
};

/** 大きいサイズ */
export const SizeLarge: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    placeholder: 'Large',
  },
};

/** 無効化 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    placeholder: '無効化されています',
    disabled: true,
  },
};

/** ラベル付き（tiny の MJTypography） */
export const WithLabel: Story = {
  args: {
    variant: 'primary',
    label: 'メールアドレス',
    placeholder: 'example@octohub.com',
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <MJInput variant="primary" placeholder="primary" />
      <MJInput variant="outline" placeholder="outline" />
      <MJInput variant="text" placeholder="text" />
      <MJInput variant="danger" placeholder="danger" />
      <MJInput variant="default" placeholder="default" />
    </div>
  ),
};

/** 全サイズ一覧 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <MJInput size="sm" placeholder="Small" />
      <MJInput size="md" placeholder="Medium" />
      <MJInput size="lg" placeholder="Large" />
    </div>
  ),
};
