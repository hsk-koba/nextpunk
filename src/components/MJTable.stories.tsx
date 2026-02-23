import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import type { SortDirection } from './MJTable';
import { MJTable } from './MJTable';
import { MJTypography } from './MJTypography';

type SampleRow = {
  id: React.ReactNode;
  name: React.ReactNode;
  role: React.ReactNode;
  status: React.ReactNode;
};

const sampleData: SampleRow[] = [
  { 
    id: <MJTypography variant="small">1</MJTypography>, 
    name: <MJTypography variant="small">田中 太郎</MJTypography>, 
    role: <MJTypography variant="small">エンジニア</MJTypography>, 
    status: <MJTypography variant="small">在籍</MJTypography> 
  },
  { 
    id: <MJTypography variant="small">2</MJTypography>, 
    name: <MJTypography variant="small">山田 花子</MJTypography>, 
    role: <MJTypography variant="small">デザイナー</MJTypography>, 
    status: <MJTypography variant="small">在籍</MJTypography> 
  },
  { 
    id: <MJTypography variant="small">3</MJTypography>, 
    name: <MJTypography variant="small">佐藤 一郎</MJTypography>, 
    role: <MJTypography variant="small">マネージャー</MJTypography>, 
    status: <MJTypography variant="small">休暇</MJTypography> 
  },
  { 
    id: <MJTypography variant="small">4</MJTypography>, 
    name: <MJTypography variant="small">鈴木 次郎</MJTypography>, 
    role: <MJTypography variant="small">エンジニア</MJTypography>, 
    status: <MJTypography variant="small">在籍</MJTypography> 
  },
];

/** loading プロップ用：文字列データでスケルトン幅を合わせる */
const sampleDataStrings = [
  { id: '1', name: '田中 太郎', role: 'エンジニア', status: '在籍' },
  { id: '2', name: '山田 花子', role: 'デザイナー', status: '在籍' },
  { id: '3', name: '佐藤 一郎', role: 'マネージャー', status: '休暇' },
  { id: '4', name: '鈴木 次郎', role: 'エンジニア', status: '在籍' },
];

const columns = [
  { key: 'name' as const, label: '名前', sortable: true },
  { key: 'role' as const, label: '役割', sortable: true },
  { key: 'status' as const, label: 'ステータス', sortable: true },
];

const meta: Meta<typeof MJTable> = {
  component: MJTable,
  title: 'Organisms/MJTable',
  tags: ['autodocs'],
  argTypes: {
    sortKey: {
      control: 'select',
      options: ['name', 'role', 'status'],
      description: 'ソート対象の列',
    },
    sortDirection: {
      control: 'radio',
      options: ['asc', 'desc'],
      description: 'ソート方向',
    },
    loading: {
      control: 'boolean',
      description: '読み込み中（ヘッダー・セルを MJTypography のスケルトン表示）',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          minHeight: 200,
          maxWidth: 600,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJTable>;

/** ソート可能なテーブル（白ヘッダー・縦枠線なし） */
export const Default: Story = {
  render: function DefaultStory() {
    const [sortKey, setSortKey] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const sortedData = useMemo(() => {
      return [...sampleData].sort((a, b) => {
        const aVal = a[sortKey as keyof SampleRow];
        const bVal = b[sortKey as keyof SampleRow];
        const cmp = String(aVal).localeCompare(String(bVal), 'ja');
        return sortDirection === 'asc' ? cmp : -cmp;
      });
    }, [sortKey, sortDirection]);

    return (
      <MJTable<SampleRow>
        columns={columns}
        data={sortedData}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key, dir) => {
          setSortKey(key);
          setSortDirection(dir);
        }}
        getRowKey={(_row, index) => index}
      />
    );
  },
};

/** ソートなし（onSort を渡さない） */
export const NotSortable: Story = {
  args: {
    columns: [
      { key: 'name', label: '名前', sortable: false },
      { key: 'role', label: '役割', sortable: false },
      { key: 'status', label: 'ステータス', sortable: false },
    ],
    data: sampleData,
    getRowKey: (_row, index) => index,
  },
};

/** 読み込み中（スケルトン） */
export const Loading: Story = {
  args: {
    columns,
    data: sampleDataStrings,
    getRowKey: (_row, index) => index,
    loading: true,
  },
};
