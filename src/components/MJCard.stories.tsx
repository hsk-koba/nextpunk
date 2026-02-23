import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MJCard } from './MJCard';
import { MJButton } from './MJButton';
import { MJTypography } from './MJTypography';

const meta: Meta<typeof MJCard> = {
  component: MJCard,
  title: 'Molecules/MJCard',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'gradient'],
      description: 'カードの見た目',
    },
    title: {
      control: 'text',
      description: 'ヘッダー（タイトル）',
    },
    footer: {
      control: 'text',
      description: 'フッターのテキスト（Story ではボタンも可）',
    },
    onClick: { action: 'cardClicked' },
  },
  args: {
    onClick: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJCard>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'カードタイトル',
    children: (
      <MJTypography variant="p">
        これは elevated バリアントのカードです。シャドウと枠線で区切られたコンテンツ領域です。
      </MJTypography>
    ),
    footer: undefined,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'アウトライン',
    children: (
      <MJTypography variant="p">
        枠線と控えめなシャドウの outlined バリアントです。
      </MJTypography>
    ),
    footer: undefined,
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    title: 'グラデーション枠',
    children: (
      <MJTypography variant="p">
        テーマの primary グラデーションで枠を描いたカードです。
      </MJTypography>
    ),
    footer: undefined,
  },
};

export const WithFooter: Story = {
  args: {
    variant: 'elevated',
    title: 'フッター付き',
    children: (
      <MJTypography variant="p">
        保存するには下のボタンを押してください。
      </MJTypography>
    ),
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <MJButton variant="outline" label="キャンセル" />
        <MJButton variant="primary" label="保存" />
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    title: 'クリック可能なカード',
    children: (
      <MJTypography variant="p">
        クリックまたは Enter / Space で反応します。
      </MJTypography>
    ),
    footer: undefined,
    onClick: fn(),
  },
};

export const BodyOnly: Story = {
  args: {
    variant: 'outlined',
    title: undefined,
    children: (
      <MJTypography variant="p">
        ヘッダー・フッターなしのシンプルなカードです。
      </MJTypography>
    ),
    footer: undefined,
  },
};
