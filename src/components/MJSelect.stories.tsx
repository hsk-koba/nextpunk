import type { Meta, StoryObj } from '@storybook/react';
import { MJSelect } from './MJSelect';

const defaultOptions = [
  { value: 'a', label: 'オプション A' },
  { value: 'b', label: 'オプション B' },
  { value: 'c', label: 'オプション C' },
];

const meta: Meta<typeof MJSelect> = {
  component: MJSelect,
  title: 'Components/MJSelect',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'text', 'danger', 'default'],
      description: 'セレクトのバリアント',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'サイズ',
    },
    label: {
      control: 'text',
      description: 'ラベル（tiny の MJTypography）',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダー（先頭の空オプション）',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（ラベル・セレクト枠をスケルトン表示）',
    },
    errorMessage: {
      control: 'text',
      description: 'エラーメッセージ',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          minHeight: 120,
          maxWidth: 400,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJSelect>;

/** プライマリ（デフォルト）・プレースホルダー付き */
export const Primary: Story = {
  args: {
    variant: 'primary',
    options: defaultOptions,
    placeholder: '選択してください',
  },
};

/** ラベル付き */
export const WithLabel: Story = {
  args: {
    variant: 'primary',
    label: '都道府県',
    options: [
      { value: 'tokyo', label: '東京都' },
      { value: 'osaka', label: '大阪府' },
      { value: 'fukuoka', label: '福岡県' },
    ],
    placeholder: '選択してください',
  },
};

/** アウトライン */
export const Outline: Story = {
  args: {
    variant: 'outline',
    options: defaultOptions,
    placeholder: '選択してください',
  },
};

/** テキスト（下線のみ） */
export const Text: Story = {
  args: {
    variant: 'text',
    options: defaultOptions,
    placeholder: '選択してください',
  },
};

/** エラー表示 */
export const Danger: Story = {
  args: {
    variant: 'primary',
    options: defaultOptions,
    placeholder: '選択してください',
    errorMessage: '必須項目です',
  },
};

/** 小さいサイズ */
export const SizeSmall: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    options: defaultOptions,
    placeholder: 'Small',
  },
};

/** 大きいサイズ */
export const SizeLarge: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    options: defaultOptions,
    placeholder: 'Large',
  },
};

/** 無効化 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    options: defaultOptions,
    placeholder: '選択してください',
    disabled: true,
  },
};

/** 読み込み中（スケルトン） */
export const Loading: Story = {
  args: {
    variant: 'primary',
    label: '都道府県',
    options: defaultOptions,
    placeholder: '選択してください',
    loading: true,
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <MJSelect variant="primary" options={defaultOptions} placeholder="primary" />
      <MJSelect variant="outline" options={defaultOptions} placeholder="outline" />
      <MJSelect variant="text" options={defaultOptions} placeholder="text" />
      <MJSelect variant="danger" options={defaultOptions} placeholder="danger" />
      <MJSelect variant="default" options={defaultOptions} placeholder="default" />
    </div>
  ),
};
