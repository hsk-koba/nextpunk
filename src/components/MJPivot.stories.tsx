import type { Meta, StoryObj } from '@storybook/react';
import { MJPivot } from './MJPivot';

const sampleRowHeaders = ['商品A', '商品B', '商品C'];
const sampleColumnHeaders = ['1月', '2月', '3月', '4月'];
const sampleData: number[][] = [
  [120, 180, 90, 150],
  [80, 220, 130, 95],
  [200, 110, 160, 180],
];

const meta: Meta<typeof MJPivot> = {
  component: MJPivot,
  title: 'Organisms/MJPivot',
  tags: ['autodocs'],
  argTypes: {
    rowDimensionLabel: {
      control: 'text',
      description: '行軸のラベル（左上）',
    },
    showRowTotals: {
      control: 'boolean',
      description: '行合計を表示',
    },
    showColumnTotals: {
      control: 'boolean',
      description: '列合計を表示',
    },
    overflowBase: {
      control: 'select',
      options: ['column', 'global'],
      description: 'Primary オーバーフローを列基準で100% / 全体基準で100%',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（スケルトン表示）',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJPivot>;

export const Default: Story = {
  args: {
    rowDimensionLabel: 'カテゴリ',
    rowHeaders: sampleRowHeaders,
    columnHeaders: sampleColumnHeaders,
    data: sampleData,
    showRowTotals: true,
    showColumnTotals: true,
    overflowBase: 'column',
  },
};

export const GlobalOverflow: Story = {
  args: {
    rowDimensionLabel: 'カテゴリ',
    rowHeaders: sampleRowHeaders,
    columnHeaders: sampleColumnHeaders,
    data: sampleData,
    showRowTotals: true,
    showColumnTotals: true,
    overflowBase: 'global',
  },
};

export const NoTotals: Story = {
  args: {
    rowDimensionLabel: '項目',
    rowHeaders: ['東', '西', '南', '北'],
    columnHeaders: ['Q1', 'Q2', 'Q3'],
    data: [
      [100, 150, 120],
      [80, 90, 110],
      [60, 70, 85],
      [40, 55, 60],
    ],
    showRowTotals: false,
    showColumnTotals: false,
    overflowBase: 'column',
  },
};

export const LargeNumbers: Story = {
  args: {
    rowDimensionLabel: '拠点',
    rowHeaders: ['東京', '大阪', '福岡'],
    columnHeaders: ['売上', '費用', '利益'],
    data: [
      [1250000, 800000, 450000],
      [980000, 620000, 360000],
      [410000, 280000, 130000],
    ],
    showRowTotals: true,
    showColumnTotals: true,
    overflowBase: 'column',
  },
};

export const Loading: Story = {
  args: {
    rowDimensionLabel: 'カテゴリ',
    rowHeaders: sampleRowHeaders,
    columnHeaders: sampleColumnHeaders,
    data: sampleData,
    showRowTotals: true,
    showColumnTotals: true,
    overflowBase: 'column',
    loading: true,
  },
};
