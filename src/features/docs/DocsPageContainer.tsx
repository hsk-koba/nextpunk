import { MJLayout } from '@/components/MJLayout';
import { DocsPageView } from './DocsPageView';

/** ドキュメント（Server Component + MJLayout） */
export function DocsPageContainer() {
  return (
    <MJLayout>
      <DocsPageView />
    </MJLayout>
  );
}
