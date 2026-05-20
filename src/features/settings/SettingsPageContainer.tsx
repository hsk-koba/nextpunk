import { MJLayout } from '@/components/MJLayout';
import { SettingsPageView } from './SettingsPageView';

/** 設定（Server Component + MJLayout） */
export function SettingsPageContainer() {
  return (
    <MJLayout>
      <SettingsPageView />
    </MJLayout>
  );
}
