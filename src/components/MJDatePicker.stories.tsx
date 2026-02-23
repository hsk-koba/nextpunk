import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MJDatePicker } from './MJDatePicker';

const meta: Meta<typeof MJDatePicker> = {
  component: MJDatePicker,
  title: 'Components/MJDatePicker',
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
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（スケルトン表示）',
    },
    label: {
      control: 'text',
      description: 'ラベル',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minHeight: 120, maxWidth: 400,  }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJDatePicker>;

/** プライマリ（デフォルト） */
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: '日付',
    value: '',
  },
};

/** 初期値あり */
export const WithValue: Story = {
  args: {
    variant: 'primary',
    label: '日付',
    value: new Date('2025-02-16'),
  },
};

/** アウトライン */
export const Outline: Story = {
  args: {
    variant: 'outline',
    label: '日付',
    value: '',
  },
};

/** テキスト（下線のみ） */
export const Text: Story = {
  args: {
    variant: 'text',
    label: '日付',
    value: '',
  },
};

/** エラー表示用 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    label: '日付',
    errorMessage: '日付を選択してください',
  },
};

/** デフォルト（ニュートラル） */
export const Default: Story = {
  args: {
    variant: 'default',
    label: '日付',
    value: '',
  },
};

/** 小さいサイズ */
export const SizeSmall: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    label: '日付',
    value: '',
  },
};

/** 大きいサイズ */
export const SizeLarge: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    label: '日付',
    value: '',
  },
};

/** 無効化 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: '日付',
    value: new Date('2025-02-16'),
    disabled: true,
  },
};

/** 読み込み中（スケルトン） */
export const Loading: Story = {
  args: {
    variant: 'primary',
    label: '日付',
    loading: true,
  },
};

/** min / max で範囲制限 */
export const MinMax: Story = {
  args: {
    variant: 'primary',
    label: '日付（2024年〜2026年）',
    min: new Date('2024-01-01'),
    max: new Date('2026-12-31'),
    value: new Date('2025-06-15'),
  },
};

/** 制御された値（選択した日付を表示） */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [date, setDate] = useState<Date | null>(new Date('2025-02-16'));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <MJDatePicker
          label="日付を選択"
          value={date}
          onChange={setDate}
          variant="primary"
        />
        {date != null && (
          <p style={{ color: '#999', fontSize: 14 }}>
            選択中: {date.toLocaleDateString('ja-JP')}
          </p>
        )}
      </div>
    );
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <MJDatePicker variant="primary" label="primary" />
      <MJDatePicker variant="outline" label="outline" />
      <MJDatePicker variant="text" label="text" />
      <MJDatePicker variant="danger" label="danger" />
      <MJDatePicker variant="default" label="default" />
    </div>
  ),
};

/** 全サイズ一覧 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <MJDatePicker size="sm" label="Small" />
      <MJDatePicker size="md" label="Medium" />
      <MJDatePicker size="lg" label="Large" />
    </div>
  ),
};
