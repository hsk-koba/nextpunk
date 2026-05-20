import { FileText, Home, Settings } from 'lucide-react';
import type { MJSidebarItemProps } from '@/components/MJSidebar';

export interface SidebarNavItem extends MJSidebarItemProps {
  /** URL 第1セグメント（例: home → /home）。ルート / は id home とマッピング */
  segment: string;
}

export const DEFAULT_SIDEBAR_ITEMS: SidebarNavItem[] = [
  { id: 'home', segment: '', label: 'Home', icon: Home, path: '/' },
  { id: 'settings', segment: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  /** path なし: クリックは AppShell でモーダル表示 */
  { id: 'docs', segment: 'docs', label: 'Docs', icon: FileText },
];

export const DEFAULT_ACCOUNT = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null as string | null,
};

/** pathname からサイドバー選択 id を解決 */
export function pathnameToSidebarId(
  pathname: string,
  items: SidebarNavItem[] = DEFAULT_SIDEBAR_ITEMS,
): string {
  const segment = pathname.split('/')[1] ?? '';
  const match = items.find((item) => item.segment === segment);
  return match?.id ?? items[0]?.id ?? 'home';
}

export function sidebarItemsToMJSidebar(
  items: SidebarNavItem[],
): MJSidebarItemProps[] {
  return items.map(({ segment: _segment, ...rest }) => rest);
}
