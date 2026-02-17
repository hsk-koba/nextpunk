'use client';

import React, { useEffect, useState } from 'react';
import { MJSidebar, MJSidebarAccountInfo, MJSidebarItemProps } from './MJSidebar';
import { YargramProvider } from '@yargram/react';
import * as styles from './styles/MJLayout.css';
import { FileText, Home, Settings } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export interface MJLayoutProps {
  /** メインコンテンツ */
  children: React.ReactNode;
  /** ルート要素の class */
  className?: string;
  /** メイン領域の class */
  mainClassName?: string;
}

export const MJLayout: React.FC<MJLayoutProps> = ({
  children,
  className,
  mainClassName,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [firstSegment, setFirstSegment] = useState("");

    useEffect(() => {
        if (pathname) {
          // split('/') すると ["", "user", "new"] になるため、[1] を指定
          const segment = pathname.split('/')[1]; 
          setTimeout(() => {
            setFirstSegment(segment);
          }, 0);
        }
    }, [pathname]);

    const accountInfo: MJSidebarAccountInfo = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
    };

    const sidebarItems: MJSidebarItemProps[] = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'docs', label: 'Docs', icon: FileText },
    ];

    const handleLogout = () => {
        console.log('logoutted');
    };

    return (
        <YargramProvider
          logWindow={{}}
          printer={{
            env: process.env.NODE_ENV === 'production' ? 'production' : 'local'
          }}
          api={{
            provider: 'graphql',
            uri: process.env.NEXT_PUBLIC_API_BASE_URL
          }}
          auth={{
            productionOnly: process.env.NODE_ENV === 'production',
          }}
        >
            <div className={[styles.root, className].filter(Boolean).join(' ')}>
                <MJSidebar 
                    items={sidebarItems} 
                    accountInfo={accountInfo} 
                    selectedItemId={firstSegment}
                    // onNavigatePath={() => {}}
                    onProfileClick={() => { router.push('/profile'); }}
                    onLogout={handleLogout}
                    width={280}
                />
                <main className={[styles.main, mainClassName].filter(Boolean).join(' ')}>
                    {children}
                </main>
            </div>
        </YargramProvider>
    )
};
