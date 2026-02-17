import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Home, Settings, FileText, FolderOpen, Edit, Copy } from 'lucide-react';
import { MJSidebar } from './MJSidebar';
import type { MJSidebarItemProps } from './MJSidebar';

const meta: Meta<typeof MJSidebar> = {
  component: MJSidebar,
  title: 'Components/MJSidebar',
  tags: ['autodocs'],
  argTypes: {
    logoText: { control: 'text', description: 'ロゴ横のテキスト' },
    collapsed: { control: 'boolean', description: '折りたたみ' },
    width: { control: 'number', description: '展開時の幅' },
    collapsedWidth: { control: 'number', description: '折りたたみ時の幅' },
    selectedItemId: { control: 'text', description: '選択中の項目 ID' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', background: '#0a0a0a' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJSidebar>;

const baseItems: MJSidebarItemProps[] = [
  { id: 'home', label: 'ホーム', icon: Home, path: '/' },
  { id: 'settings', label: '設定', icon: Settings, path: '/settings' },
  { id: 'docs', label: 'ドキュメント', icon: FileText, path: '/docs' },
];

const defaultAccountInfo = {
  name: '山田太郎',
  email: 'yamada@example.com',
  avatar: null as string | null,
};

/** 通常（展開） */
export const Default: Story = {
  args: {
    logoText: 'OctoHub',
    items: baseItems,
    accountInfo: defaultAccountInfo,
    selectedItemId: 'home',
    collapsed: false,
  },
  render: (args) => (
    <MJSidebar
      {...args}
      onNavigatePath={(path) => console.log('Navigate:', path)}
      onProfileClick={() => console.log('Profile')}
      onLogout={() => console.log('Logout')}
    />
  ),
};

/** 折りたたみ */
export const Collapsed: Story = {
  args: {
    ...Default.args,
    collapsed: true,
  },
  render: (args) => (
    <MJSidebar
      {...args}
      onNavigatePath={(path) => console.log('Navigate:', path)}
      onProfileClick={() => console.log('Profile')}
      onLogout={() => console.log('Logout')}
    />
  ),
};

/** バッジ付き項目 */
export const WithBadge: Story = {
  args: {
    logoText: 'OctoHub',
    items: [
      { id: 'home', label: 'ホーム', icon: Home, path: '/' },
      { id: 'notifications', label: 'お知らせ', icon: FileText, badge: 5, path: '/notifications' },
      { id: 'settings', label: '設定', icon: Settings, path: '/settings' },
    ],
    accountInfo: defaultAccountInfo,
    selectedItemId: 'home',
    collapsed: false,
  },
  render: (args) => (
    <MJSidebar
      {...args}
      onNavigatePath={(path) => console.log('Navigate:', path)}
      onProfileClick={() => console.log('Profile')}
      onLogout={() => console.log('Logout')}
    />
  ),
};

/** ポップアップメニュー付き項目 */
export const WithPopupMenu: Story = {
  args: {
    logoText: 'OctoHub',
    items: [
      { id: 'home', label: 'ホーム', icon: Home, path: '/' },
      {
        id: 'docs',
        label: 'ドキュメント',
        icon: FolderOpen,
        popupMenu: [
          { label: '開く', icon: FolderOpen, onClick: () => console.log('開く') },
          { label: '編集', icon: Edit, onClick: () => console.log('編集') },
          { label: 'コピー', icon: Copy, onClick: () => console.log('コピー') },
        ],
      },
      { id: 'settings', label: '設定', icon: Settings, path: '/settings' },
    ],
    accountInfo: defaultAccountInfo,
    selectedItemId: 'home',
    collapsed: false,
  },
  render: (args) => (
    <MJSidebar
      {...args}
      onNavigatePath={(path) => console.log('Navigate:', path)}
      onProfileClick={() => console.log('Profile')}
      onLogout={() => console.log('Logout')}
    />
  ),
};

/** 折りたたみ + バッジ（バッジがアイコンの右上に表示） */
export const CollapsedWithBadge: Story = {
  args: {
    logoText: 'OctoHub',
    items: [
      { id: 'home', label: 'ホーム', icon: Home, path: '/' },
      { id: 'notifications', label: 'お知らせ', icon: FileText, badge: 3, path: '/notifications' },
      { id: 'settings', label: '設定', icon: Settings, path: '/settings' },
    ],
    accountInfo: defaultAccountInfo,
    selectedItemId: 'home',
    collapsed: true,
  },
  render: (args) => (
    <MJSidebar
      {...args}
      onNavigatePath={(path) => console.log('Navigate:', path)}
      onProfileClick={() => console.log('Profile')}
      onLogout={() => console.log('Logout')}
    />
  ),
};

/** アカウントメニュー（プロフィール・ログアウト）の動作確認用 */
export const AccountMenu: Story = {
  args: {
    logoText: 'OctoHub',
    items: baseItems,
    accountInfo: { name: 'テストユーザー', email: 'test@example.com' },
    selectedItemId: 'home',
    collapsed: false,
  },
  render: (args) => (
    <MJSidebar
      {...args}
      onNavigatePath={(path) => console.log('Navigate:', path)}
      onProfileClick={() => console.log('プロフィール設定')}
      onLogout={() => console.log('ログアウト')}
    />
  ),
};

/** 展開/折りたたみをトグル可能 */
export const ToggleCollapsed: Story = {
  render: function ToggleCollapsedStory() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ display: 'flex' }}>
        <MJSidebar
          logoText="OctoHub"
          items={baseItems}
          accountInfo={defaultAccountInfo}
          selectedItemId="home"
          collapsed={collapsed}
          onNavigatePath={(path) => console.log('Navigate:', path)}
          onProfileClick={() => console.log('Profile')}
          onLogout={() => console.log('Logout')}
        />
        <div style={{ padding: 24, color: '#fff' }}>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            style={{
              padding: '8px 16px',
              background: '#333',
              border: '1px solid #555',
              borderRadius: 8,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {collapsed ? '展開' : '折りたたむ'}
          </button>
        </div>
      </div>
    );
  },
};
