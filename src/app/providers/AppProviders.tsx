'use client';

import React from 'react';
import { YargramProvider } from '@yargram/react';
import { AlertProvider } from '@/components/MJAlert';
import { OverlayProvider } from '@/components/MJOverlayLoading';

export interface AppProvidersProps {
  children: React.ReactNode;
}

/** Yargram・グローバル UI プロバイダ（レイアウトシェルとは分離） */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <YargramProvider
      logWindow={{}}
      printer={{
        env: process.env.NODE_ENV === 'production' ? 'production' : 'local',
      }}
      api={{
        provider: 'graphql',
        uri: process.env.NEXT_PUBLIC_API_BASE_URL,
      }}
      auth={{
        productionOnly: process.env.NODE_ENV === 'production',
      }}
    >
      <OverlayProvider>
        <AlertProvider>{children}</AlertProvider>
      </OverlayProvider>
    </YargramProvider>
  );
};
