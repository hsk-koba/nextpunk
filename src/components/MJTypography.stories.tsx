import type { Meta, StoryObj } from '@storybook/react';
import { MJTypography } from './MJTypography';

const meta: Meta<typeof MJTypography> = {
  component: MJTypography,
  title: 'Components/MJTypography',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'small', 'tiny'],
      description: 'タイポグラフィのバリアント',
    },
    bold: {
      control: 'boolean',
      description: '太字',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（テキストの代わりにスケルトンバーを表示）',
    },
    children: {
      control: 'text',
      description: '表示するテキスト',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#0a0a0a', color: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJTypography>;

/** 見出し1 */
export const H1: Story = {
  args: {
    variant: 'h1',
    children: '見出しレベル1',
  },
};

/** 見出し2 */
export const H2: Story = {
  args: {
    variant: 'h2',
    children: '見出しレベル2',
  },
};

/** 見出し3 */
export const H3: Story = {
  args: {
    variant: 'h3',
    children: '見出しレベル3',
  },
};

/** 見出し4 */
export const H4: Story = {
  args: {
    variant: 'h4',
    children: '見出しレベル4',
  },
};

/** 見出し5 */
export const H5: Story = {
  args: {
    variant: 'h5',
    children: '見出しレベル5',
  },
};

/** 見出し6 */
export const H6: Story = {
  args: {
    variant: 'h6',
    children: '見出しレベル6',
  },
};

/** 段落 */
export const Paragraph: Story = {
  args: {
    variant: 'p',
    children:
      'これは段落テキストです。本文や説明文に使用します。複数行になっても読みやすい行間とフォントサイズで表示されます。',
  },
};

/** スパン（インライン用） */
export const Span: Story = {
  args: {
    variant: 'span',
    children: 'インライン用のスパンテキスト',
  },
};

/** スモール（補足テキスト） */
export const Small: Story = {
  args: {
    variant: 'small',
    children: '補足やキャプション用の小さめテキスト',
  },
};

/** タイニー（最小サイズ） */
export const Tiny: Story = {
  args: {
    variant: 'tiny',
    children: '最小サイズのテキスト',
  },
};

/** 太字 */
export const Bold: Story = {
  args: {
    variant: 'p',
    bold: true,
    children: '太字の段落テキスト',
  },
};

/** 読み込み中（スケルトン） */
export const Loading: Story = {
  args: {
    variant: 'h1',
    children: '読み込み中のテキスト',
    loading: true,
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <MJTypography variant="h1">見出し1 (h1)</MJTypography>
      <MJTypography variant="h2">見出し2 (h2)</MJTypography>
      <MJTypography variant="h3">見出し3 (h3)</MJTypography>
      <MJTypography variant="h4">見出し4 (h4)</MJTypography>
      <MJTypography variant="h5">見出し5 (h5)</MJTypography>
      <MJTypography variant="h6">見出し6 (h6)</MJTypography>
      <MJTypography variant="p">段落 (p)</MJTypography>
      <MJTypography variant="span">スパン (span)</MJTypography>
      <MJTypography variant="small">スモール (small)</MJTypography>
      <MJTypography variant="tiny">タイニー (tiny)</MJTypography>
    </div>
  ),
};

/** 見出し＋本文の例 */
export const HeadingWithBody: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <MJTypography variant="h3">OctoHub へようこそ</MJTypography>
      <MJTypography variant="p">
        OctoHub は、cyan から purple へのグラデーションをテーマにしたダークモードの UI
        です。MJTypography で見出しと本文のスタイルを統一できます。
      </MJTypography>
      <MJTypography variant="small">最終更新: 2025年</MJTypography>
    </div>
  ),
};
