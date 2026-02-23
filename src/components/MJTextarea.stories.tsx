import type { Meta, StoryObj } from '@storybook/react';
import { MJTextarea } from './MJTextarea';

const meta: Meta<typeof MJTextarea> = {
  component: MJTextarea,
  title: 'Components/MJTextarea',
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
    loading: {
      control: 'boolean',
      description: '読み込み中（ラベル・テキストエリア枠をスケルトン表示）',
    },
    label: {
      control: 'text',
      description: 'ラベル',
    },
    rows: {
      control: 'number',
      description: '表示行数',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minHeight: 120, maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJTextarea>;

/** プライマリ（デフォルト） */
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'コメント',
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
    errorMessage: '入力は必須です',
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

/** 読み込み中（スケルトン） */
export const Loading: Story = {
  args: {
    variant: 'primary',
    label: 'コメント',
    placeholder: '読み込み中…',
    loading: true,
  },
};

/** ラベル付き */
export const WithLabel: Story = {
  args: {
    variant: 'primary',
    label: '説明',
    placeholder: '詳細を入力してください',
  },
};

/** 行数指定 */
export const WithRows: Story = {
  args: {
    variant: 'primary',
    label: '備考',
    placeholder: '3行で表示',
    rows: 3,
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <MJTextarea variant="primary" placeholder="primary" />
      <MJTextarea variant="outline" placeholder="outline" />
      <MJTextarea variant="text" placeholder="text" />
      <MJTextarea variant="danger" placeholder="danger" />
      <MJTextarea variant="default" placeholder="default" />
    </div>
  ),
};

/** 全サイズ一覧 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <MJTextarea size="sm" placeholder="Small" />
      <MJTextarea size="md" placeholder="Medium" />
      <MJTextarea size="lg" placeholder="Large" />
    </div>
  ),
};
