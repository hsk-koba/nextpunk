import type { Meta, StoryObj } from '@storybook/react';
import { MJGraph } from './MJGraph';
import type { MJGraphDataPoint } from './MJGraph';

const sampleData: MJGraphDataPoint[] = [
  { label: '1月', value: 40 },
  { label: '2月', value: 65 },
  { label: '3月', value: 52 },
  { label: '4月', value: 78 },
  { label: '5月', value: 90 },
  { label: '6月', value: 85 },
];

const sampleDataWithNegative: MJGraphDataPoint[] = [
  { label: 'A', value: 20 },
  { label: 'B', value: -10 },
  { label: 'C', value: 35 },
  { label: 'D', value: -5 },
  { label: 'E', value: 50 },
];

const meta: Meta<typeof MJGraph> = {
  component: MJGraph,
  title: 'Organisms/MJGraph',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie'],
      description: 'グラフの種類',
    },
    title: {
      control: 'text',
      description: 'カードのタイトル',
    },
    height: {
      control: { type: 'number', min: 120, max: 400 },
      description: 'グラフの高さ（px）',
    },
    cardVariant: {
      control: 'select',
      options: ['elevated', 'outlined', 'gradient'],
      description: 'MJCard のバリアント',
    },
    legendLabel: {
      control: 'text',
      description: 'フッター凡例のラベル',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（スケルトン表示）',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJGraph>;

export const LineChart: Story = {
  args: {
    type: 'line',
    data: sampleData,
    title: '月別推移',
    height: 220,
    cardVariant: 'elevated',
    legendLabel: '売上（件）',
  },
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: sampleData,
    title: '月別比較',
    height: 220,
    cardVariant: 'elevated',
    legendLabel: '件数',
  },
};

export const GradientCard: Story = {
  args: {
    type: 'line',
    data: sampleData,
    title: 'グラデーション枠のグラフ',
    height: 200,
    cardVariant: 'gradient',
    legendLabel: 'データ',
  },
};

export const WithNegativeValues: Story = {
  args: {
    type: 'bar',
    data: sampleDataWithNegative,
    title: 'プラス・マイナス',
    height: 220,
    cardVariant: 'outlined',
    legendLabel: '差分',
  },
};

export const MinimalData: Story = {
  args: {
    type: 'line',
    data: [
      { label: 'A', value: 10 },
      { label: 'B', value: 80 },
    ],
    title: '2点のみ',
    height: 180,
    cardVariant: 'outlined',
  },
};

const pieData: MJGraphDataPoint[] = [
  { label: 'A', value: 35 },
  { label: 'B', value: 25 },
  { label: 'C', value: 20 },
  { label: 'D', value: 12 },
  { label: 'E', value: 8 },
];

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: pieData,
    title: '構成比',
    height: 260,
    cardVariant: 'elevated',
  },
};

export const PieChartGradient: Story = {
  args: {
    type: 'pie',
    data: pieData,
    title: '円グラフ（グラデーション枠）',
    height: 260,
    cardVariant: 'gradient',
  },
};

export const Loading: Story = {
  args: {
    type: 'line',
    data: sampleData,
    title: '月別推移',
    height: 220,
    cardVariant: 'elevated',
    legendLabel: '売上（件）',
    loading: true,
  },
};
