'use client';

import React from 'react';
import { AppShell } from '@/app/shell/AppShell';

export interface MJLayoutProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
}

/** サイドバー + メイン領域（PageContainer から利用。Providers は root layout） */
export const MJLayout: React.FC<MJLayoutProps> = ({
  children,
  className,
  mainClassName,
}) => {
  return (
    <AppShell className={className} mainClassName={mainClassName}>
      {children}
    </AppShell>
  );
};
