import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Plus,
  Trash2,
  Settings,
  Search,
  Heart,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { MJIconButton } from './MJIconButton';

const meta: Meta<typeof MJIconButton> = {
  component: MJIconButton,
  title: 'Components/MJIconButton',
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
      description: 'loading 時の表示（spinner / skeleton）',
    },
    icon: {
      description: 'lucide-react のアイコンコンポーネント',
      control: false,
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

type Story = StoryObj<typeof MJIconButton>;

/** プライマリ（デフォルト） */
export const Primary: Story = {
  args: {
    icon: Plus,
    variant: 'primary',
    'aria-label': '追加',
  },
};

/** アウトライン */
export const Outline: Story = {
  args: {
    icon: Settings,
    variant: 'outline',
    'aria-label': '設定',
  },
};

/** テキスト（枠なし） */
export const Text: Story = {
  args: {
    icon: Search,
    variant: 'text',
    'aria-label': '検索',
  },
};

/** 危険アクション（削除など） */
export const Danger: Story = {
  args: {
    icon: Trash2,
    variant: 'danger',
    'aria-label': '削除',
  },
};

/** デフォルト（ニュートラル） */
export const Default: Story = {
  args: {
    icon: Heart,
    variant: 'default',
    'aria-label': 'お気に入り',
  },
};

/** 小さいサイズ */
export const SizeSmall: Story = {
  args: {
    icon: Plus,
    size: 'sm',
    variant: 'primary',
    'aria-label': '追加',
  },
};

/** 大きいサイズ */
export const SizeLarge: Story = {
  args: {
    icon: Plus,
    size: 'lg',
    variant: 'primary',
    'aria-label': '追加',
  },
};

/** 無効化状態 */
export const Disabled: Story = {
  args: {
    icon: Share2,
    variant: 'primary',
    disabled: true,
    'aria-label': '共有',
  },
};

/** スピナーローディング */
export const Loading: Story = {
  args: {
    icon: Plus,
    variant: 'primary',
    loading: true,
    'aria-label': '追加',
  },
};

/** スケルトンローディング */
export const LoadingSkeleton: Story = {
  args: {
    icon: Plus,
    variant: 'primary',
    loading: true,
    loadingVariant: 'skeleton',
    'aria-label': '追加',
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <MJIconButton icon={Plus} variant="primary" aria-label="追加" onClick={fn()} />
      <MJIconButton icon={Settings} variant="outline" aria-label="設定" onClick={fn()} />
      <MJIconButton icon={Search} variant="text" aria-label="検索" onClick={fn()} />
      <MJIconButton icon={Trash2} variant="danger" aria-label="削除" onClick={fn()} />
      <MJIconButton icon={Heart} variant="default" aria-label="お気に入り" onClick={fn()} />
    </div>
  ),
};

/** 全サイズ一覧 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <MJIconButton
        icon={ChevronRight}
        size="sm"
        variant="primary"
        aria-label="次へ"
        onClick={fn()}
      />
      <MJIconButton
        icon={ChevronRight}
        size="md"
        variant="primary"
        aria-label="次へ"
        onClick={fn()}
      />
      <MJIconButton
        icon={ChevronRight}
        size="lg"
        variant="primary"
        aria-label="次へ"
        onClick={fn()}
      />
    </div>
  ),
};
