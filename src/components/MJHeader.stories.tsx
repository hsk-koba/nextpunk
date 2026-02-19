import type { Meta, StoryObj } from '@storybook/react';
import { MJHeader } from './MJHeader';
import { Home, Settings, FileText } from 'lucide-react';

const defaultItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'docs', label: 'Docs', icon: FileText, path: '/docs' },
];

const defaultAccountInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
};

const meta: Meta<typeof MJHeader> = {
  component: MJHeader,
  title: 'Components/MJHeader',
  tags: ['autodocs'],
  argTypes: {
    logoText: {
      control: 'text',
      description: 'ロゴ横のテキスト（logo 未指定時）',
    },
    selectedItemId: {
      control: 'select',
      options: ['home', 'settings', 'docs'],
      description: '選択中ナビの id',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#0a0a0a', minHeight: 120 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MJHeader>;

/** ロゴテキスト + ナビ + アカウント（MJSidebar 風） */
export const Default: Story = {
  args: {
    logoText: 'OctoHub',
    items: defaultItems,
    accountInfo: defaultAccountInfo,
    selectedItemId: 'home',
    onNavigatePath: (path) => console.log('Navigate', path),
    onProfileClick: () => console.log('Profile'),
    onLogout: () => console.log('Logout'),
  },
};

/** カスタムロゴ（画像など） */
export const WithCustomLogo: Story = {
  args: {
    logo: (
      <img
        src="/nextpunk-clear.png"
        alt="Logo"
        width={120}
        height={36}
        style={{ objectFit: 'contain' }}
      />
    ),
    items: defaultItems,
    accountInfo: defaultAccountInfo,
    selectedItemId: 'settings',
    onLogout: () => console.log('Logout'),
  },
};
