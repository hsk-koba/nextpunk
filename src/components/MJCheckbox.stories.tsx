import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MJCheckbox } from './MJCheckbox';

const meta: Meta<typeof MJCheckbox> = {
  component: MJCheckbox,
  title: 'Components/MJCheckbox',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'チェックボックスの横のテキスト',
    },
    groupLabel: {
      control: 'text',
      description: '上に表示するグループラベル',
    },
    checked: {
      control: 'boolean',
      description: 'チェック状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
    errorMessage: {
      control: 'text',
      description: 'エラーメッセージ',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（スケルトン表示・クリック無効）',
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

type Story = StoryObj<typeof MJCheckbox>;

/** 基本 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [checked, setChecked] = useState(false);
    return (
      <MJCheckbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: '同意する',
  },
};

/** グループラベル付き */
export const WithGroupLabel: Story = {
  render: function WithGroupLabelStory(args) {
    const [checked, setChecked] = useState(false);
    return (
      <MJCheckbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    groupLabel: '以下の項目に同意してください',
    label: '利用規約に同意する',
  },
};

/** チェック済み */
export const Checked: Story = {
  render: function CheckedStory(args) {
    const [checked, setChecked] = useState(true);
    return (
      <MJCheckbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: 'ニュースレターを受け取る',
    checked: true,
  },
};

/** エラー表示 */
export const WithError: Story = {
  render: function WithErrorStory(args) {
    const [checked, setChecked] = useState(false);
    return (
      <MJCheckbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    groupLabel: '必須',
    label: '利用規約に同意してください',
    errorMessage: '送信するには同意が必要です',
  },
};

/** 無効化 */
export const Disabled: Story = {
  args: {
    label: '無効なチェックボックス',
    checked: false,
    disabled: true,
  },
};

/** 無効化・チェック済み */
export const DisabledChecked: Story = {
  args: {
    label: '無効（チェック済み）',
    checked: true,
    disabled: true,
  },
};

/** スケルトンローディング */
export const Loading: Story = {
  args: {
    label: '同意する',
    loading: true,
  },
};

/** スケルトンローディング（長いラベルで枠を保持） */
export const LoadingLongLabel: Story = {
  args: {
    label: '利用規約およびプライバシーポリシーに同意する',
    loading: true,
  },
};

/** 複数チェックボックス */
export const Multiple: Story = {
  render: function MultipleStory() {
    const [a, setA] = useState(false);
    const [b, setB] = useState(true);
    const [c, setC] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <MJCheckbox
          groupLabel="通知設定"
          label="メールで通知を受け取る"
          checked={a}
          onChange={(e) => setA(e.target.checked)}
        />
        <MJCheckbox
          label="プッシュ通知を有効にする"
          checked={b}
          onChange={(e) => setB(e.target.checked)}
        />
        <MJCheckbox
          label="SMSで受け取る"
          checked={c}
          onChange={(e) => setC(e.target.checked)}
        />
      </div>
    );
  },
};
