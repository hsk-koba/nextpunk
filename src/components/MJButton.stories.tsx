import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Plus, ChevronRight } from 'lucide-react';
import { MJButton } from './MJButton';

const meta: Meta<typeof MJButton> = {
  component: MJButton,
  title: 'Components/MJButton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'text', 'danger', 'default'],
      description: 'ボタンのバリアント',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'ボタンサイズ',
    },
    iconPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'アイコンの位置',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（クリック無効）',
    },
    loadingVariant: {
      control: 'radio',
      options: ['spinner', 'skeleton'],
      description: 'loading 時の表示（spinner: スピナーのみ / skeleton: スケルトンアニメ）',
    },
    label: {
      control: 'text',
      description: 'ボタンラベル（children がない場合に表示）',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minHeight: 120 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJButton>;

/** プライマリ（デフォルト） */
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

/** アウトラインボタン */
export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
  },
};

/** テキストボタン（枠なし） */
export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
  },
};

/** 危険アクション用（削除など） */
export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
};

/** デフォルト（ニュートラル） */
export const Default: Story = {
  args: {
    label: 'Default Button',
    variant: 'default',
  },
};

/** 小さいサイズ */
export const SizeSmall: Story = {
  args: {
    label: 'Small',
    size: 'sm',
    variant: 'primary',
  },
};

/** 大きいサイズ */
export const SizeLarge: Story = {
  args: {
    label: 'Large',
    size: 'lg',
    variant: 'primary',
  },
};

/** 無効化状態 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

/** 読み込み中（loading） */
export const Loading: Story = {
  args: {
    label: 'Submit',
    variant: 'primary',
    loading: true,
  },
};

/** 読み込み中・アウトライン */
export const LoadingOutline: Story = {
  args: {
    label: "Submit",
    variant: 'outline',
    loading: true,
    loadingVariant: "spinner"
  },
};

/** スケルトンローディング */
export const LoadingSkeleton: Story = {
  args: {
    label: 'Submit',
    variant: 'primary',
    loading: true,
    loadingVariant: 'skeleton',
  },
};

/** 先頭にアイコン（lucide-react） */
export const WithIconStart: Story = {
  args: {
    label: 'Add Item',
    variant: 'primary',
    icon: Plus,
    iconPosition: 'start',
  },
};

/** 末尾にアイコン（lucide-react） */
export const WithIconEnd: Story = {
  args: {
    label: 'Next',
    variant: 'outline',
    icon: ChevronRight,
    iconPosition: 'end',
  },
};

/** children でラベルを渡す */
export const WithChildren: Story = {
  args: {
    children: 'Custom children',
    variant: 'primary',
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <MJButton label="Primary" variant="primary" onClick={fn()} />
      <MJButton label="Outline" variant="outline" onClick={fn()} />
      <MJButton label="Text" variant="text" onClick={fn()} />
      <MJButton label="Danger" variant="danger" onClick={fn()} />
      <MJButton label="Default" variant="default" onClick={fn()} />
    </div>
  ),
};

/** 全サイズ一覧 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <MJButton label="Small" size="sm" variant="primary" onClick={fn()} />
      <MJButton label="Medium" size="md" variant="primary" onClick={fn()} />
      <MJButton label="Large" size="lg" variant="primary" onClick={fn()} />
    </div>
  ),
};
