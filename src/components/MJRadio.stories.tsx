import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MJRadio } from './MJRadio';

const defaultOptions = [
  { value: 'a', label: 'オプション A' },
  { value: 'b', label: 'オプション B' },
  { value: 'c', label: 'オプション C' },
];

const meta: Meta<typeof MJRadio> = {
  component: MJRadio,
  title: 'Components/MJRadio',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'radio の name（グループ識別）',
    },
    label: {
      control: 'text',
      description: 'グループラベル（tiny の MJTypography）',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（ラベル・各オプションの円と文字をスケルトン表示）',
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
          background: '#0a0a0a',
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

type Story = StoryObj<typeof MJRadio>;

/** 基本 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<string>('a');
    return (
      <MJRadio
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    name: 'radio-default',
    options: defaultOptions,
  },
};

/** ラベル付き */
export const WithLabel: Story = {
  render: function WithLabelStory(args) {
    const [value, setValue] = useState<string>('');
    return (
      <MJRadio
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    name: 'radio-with-label',
    label: '選択してください',
    options: [
      { value: 'yes', label: 'はい' },
      { value: 'no', label: 'いいえ' },
    ],
  },
};

/** エラー表示 */
export const WithError: Story = {
  render: function WithErrorStory(args) {
    const [value, setValue] = useState<string>('');
    return (
      <MJRadio
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    name: 'radio-error',
    label: '必須項目',
    options: defaultOptions,
    errorMessage: 'いずれかを選択してください',
  },
};

/** 無効化 */
export const Disabled: Story = {
  args: {
    name: 'radio-disabled',
    options: defaultOptions,
    value: 'b',
    disabled: true,
  },
};

/** 読み込み中（スケルトン） */
export const Loading: Story = {
  args: {
    name: 'radio-loading',
    label: '選択してください',
    options: defaultOptions,
    loading: true,
  },
};

/** 縦並び（デフォルト） */
export const Vertical: Story = {
  render: function VerticalStory(args) {
    const [value, setValue] = useState<string>('tokyo');
    return (
      <MJRadio
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    name: 'radio-vertical',
    label: '都道府県',
    options: [
      { value: 'tokyo', label: '東京都' },
      { value: 'osaka', label: '大阪府' },
      { value: 'fukuoka', label: '福岡県' },
    ],
  },
};
