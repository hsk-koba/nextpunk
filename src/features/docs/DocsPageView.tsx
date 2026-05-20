'use client';

import { useEffect } from 'react';
import { usePrinter } from '@yargram/react';
import { MJTypography } from '@/components/MJTypography';

/** ドキュメントページのクライアント部分 */
export function DocsPageView() {
  const printer = usePrinter();

  useEffect(() => {
    printer.info('DocsPageView');
  }, [printer]);

  return (
    <div>
      <MJTypography variant="h1" bold>
        Docs
      </MJTypography>
    </div>
  );
}
