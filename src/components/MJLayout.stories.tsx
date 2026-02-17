import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Home, Settings, FileText } from 'lucide-react';
import { MJLayout } from './MJLayout';
import type { MJSidebarItemProps } from './MJSidebar';

const meta: Meta<typeof MJLayout> = {
  component: MJLayout,
  title: 'Components/MJLayout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'サイドバーとメイン領域を横並びにしたレイアウト。現在の MJLayout はサイドバーの項目・アカウント情報・選択状態を内部で固定しており、`usePathname()` の第1セグメントで selectedItemId を決めています。外から渡した items / accountInfo は型のため受け取りますが、表示には使われません。',
      },
    },
  },
  argTypes: {
    children: { control: false, description: 'メインコンテンツ' },
    className: { control: 'text', description: 'ルート要素の class' },
    mainClassName: { control: 'text', description: 'メイン領域の class' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJLayout>;


const sampleMainContent = (
  <div style={{ padding: 24, color: '#fff' }}>
    <h1 style={{ margin: '0 0 16px', fontSize: '1.5rem' }}>メインコンテンツ</h1>
    <p style={{ color: '#ccc', margin: 0 }}>
      ここにページの本文を配置します。MJLayout はサイドバーとメイン領域を横並びにしたレイアウトです。サイドバーの項目・アカウントはコンポーネント内で固定されています。
    </p>
  </div>
);

/** 基本（Storybook では pathname が無いため selectedItemId は空になります） */
export const Default: Story = {
  args: {
  },
  render: (args) => <MJLayout {...args}>{sampleMainContent}</MJLayout>,
};

/** メインに長いコンテンツを置いた場合のスクロール */
export const LongContent: Story = {
  args: {
  },
  render: (args) => (
    <MJLayout {...args}>
      <div>
        <h1 style={{ margin: '0 0 16px', fontSize: '1.5rem' }}>長いコンテンツ</h1>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ color: '#ccc', margin: '0 0 12px' }}>
            段落 {i + 1}. メイン領域は overflow: auto のため、縦に長いコンテンツはスクロールして表示されます。
          </p>
        ))}
      </div>
    </MJLayout>
  ),
};

/** mainClassName でメイン領域に class を付与 */
export const WithMainClassName: Story = {
  args: {
    mainClassName: 'custom-main',
  },
  render: (args) => (
    <MJLayout {...args}>
      <div style={{ padding: 24, color: '#fff' }}>
        <h1 style={{ margin: '0 0 16px', fontSize: '1.5rem' }}>メインに class を付与</h1>
        <p style={{ color: '#ccc', margin: 0 }}>
          mainClassName でメイン要素に任意の class を付与できます。グローバル CSS などでスタイルを当てる場合に利用してください。
        </p>
      </div>
    </MJLayout>
  ),
};
