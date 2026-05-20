'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MJSidebar, type MJSidebarItemProps } from '@/components/MJSidebar';
import { MJModal } from '@/components/MJModal';
import { MJTypography } from '@/components/MJTypography';
import * as layoutStyles from '@/components/styles/MJLayout.css';
import {
  DEFAULT_ACCOUNT,
  DEFAULT_SIDEBAR_ITEMS,
  pathnameToSidebarId,
  sidebarItemsToMJSidebar,
} from '@/constants/navigation/sidebar';
import { cn } from '@/utils/cn';

export interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
}

/** サイドバー + メイン領域のシェル（データ取得・プロバイダは含まない） */
export const AppShell: React.FC<AppShellProps> = ({
  children,
  className,
  mainClassName,
}) => {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [docsErrorOpen, setDocsErrorOpen] = useState(false);

  const handleItemClick = useCallback((item: MJSidebarItemProps) => {
    if (item.id === 'docs') {
      setDocsErrorOpen(true);
    }
  }, []);

  const handleNavigatePath = useCallback(
    (path: string) => {
      if (path === '/docs') {
        setDocsErrorOpen(true);
        return;
      }
      router.push(path);
    },
    [router],
  );

  const selectedItemId = useMemo(
    () => pathnameToSidebarId(pathname),
    [pathname],
  );

  const sidebarItems = useMemo(
    () => sidebarItemsToMJSidebar(DEFAULT_SIDEBAR_ITEMS),
    [],
  );

  return (
    <div className={cn(layoutStyles.root, className)}>
      <div className={layoutStyles.sidebarSlot}>
        <MJSidebar
          items={sidebarItems}
          accountInfo={DEFAULT_ACCOUNT}
          selectedItemId={selectedItemId}
          onItemClick={handleItemClick}
          onNavigatePath={handleNavigatePath}
          onProfileClick={() => router.push('/profile')}
          onLogout={() => {
            // TODO: 認証連携
          }}
          width={280}
        />
      </div>
      <main className={cn(layoutStyles.main, mainClassName)}>{children}</main>
      <MJModal
        open={docsErrorOpen}
        onClose={() => setDocsErrorOpen(false)}
        title="エラー"
        body={
          <MJTypography variant="p">DocsはHomeの中にあります</MJTypography>
        }
        hasFooter
        footerType="isOK"
        isCloseButtonEnabled
      />
    </div>
  );
};
