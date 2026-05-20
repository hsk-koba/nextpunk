import { MJCard } from '@/components/MJCard';
import { MJLayout } from '@/components/MJLayout';
import { MJTypography } from '@/components/MJTypography';
import * as styles from './styles/homePage.css';

function Code({ children }: { children: string }) {
  return <code className={styles.code}>{children}</code>;
}

function Pre({ children }: { children: string }) {
  return <pre className={styles.codeBlock}>{children}</pre>;
}

/** ホーム（Server Component + MJLayout）— NEXTPUNK 使い方説明書 */
export function HomePageContainer() {
  return (
    <MJLayout>
      <article className={styles.page}>
        <header>
          <MJTypography variant="h1" bold>
            NEXTPUNK
          </MJTypography>
          <p className={styles.lead} style={{ marginTop: '0.5rem' }}>
            OctoHub CMS 向けの Next.js 16 フロントエンドです。MJ デザインシステムと
            Vanilla Extract によるダークテーマ UI を前提に、機能単位の feature 構成で開発します。
          </p>
        </header>

        <MJCard title="1. はじめに" variant="outlined">
          <div className={styles.sectionBody}>
            <MJTypography variant="p">
              このプロジェクト（パッケージ名 <Code>nextpunk</Code>
              ）では次の技術を使います。
            </MJTypography>
            <ul className={styles.list}>
              <li>Next.js 16（App Router）+ React 19 + TypeScript</li>
              <li>スタイル: Vanilla Extract（<Code>*.css.ts</Code>）</li>
              <li>UI: MJ コンポーネント（OctoHub テーマ）</li>
              <li>API / ログ: Yargram（<Code>@yargram/react</Code>）</li>
              <li>コンポーネントカタログ: Storybook 10</li>
            </ul>
          </div>
        </MJCard>

        <MJCard title="2. 開発環境の準備" variant="outlined">
          <div className={styles.sectionBody}>
            <MJTypography variant="p" bold>
              必要環境
            </MJTypography>
            <ul className={styles.list}>
              <li>Node.js 20 以上</li>
              <li>Yarn（推奨）</li>
            </ul>
            <Pre>{`yarn install
yarn dev          # http://localhost:3050
yarn storybook    # http://localhost:6006（MJ コンポーネント一覧）`}</Pre>
            <MJTypography variant="p">
              開発・本番ビルドは Vanilla Extract 対応のため webpack を使用します（
              <Code>--webpack</Code> 付き）。Turbopack は現状未使用です。
            </MJTypography>
          </div>
        </MJCard>

        <MJCard title="3. 新しい画面（feature）を追加する" variant="outlined">
          <div className={styles.sectionBody}>
            <MJTypography variant="p">
              機能は <Code>src/features/&lt;path&gt;</Code> にまとめ、ルートは{' '}
              <Code>src/app/&lt;path&gt;/page.tsx</Code> から PageContainer を読み込みます。
            </MJTypography>
            <Pre>{`yarn gen settings
# または
yarn gen users/profile`}</Pre>
            <MJTypography variant="p">生成される主なファイル:</MJTypography>
            <ul className={styles.list}>
              <li>
                <Code>*PageContainer.tsx</Code> — Server Component。{' '}
                <Code>MJLayout</Code> でラップ（SSR）
              </li>
              <li>
                <Code>*PageView.tsx</Code> — <Code>use client</Code>。hooks や Yargram
                などクライアント専用処理
              </li>
              <li>
                <Code>app/&lt;path&gt;/page.tsx</Code> — ルート定義（薄いラッパー）
              </li>
            </ul>
            <MJTypography variant="p">
              サイドバーにリンクを出す場合は{' '}
              <Code>src/constants/navigation/sidebar.ts</Code> の{' '}
              <Code>DEFAULT_SIDEBAR_ITEMS</Code> に項目を追加してください。
            </MJTypography>
          </div>
        </MJCard>

        <MJCard title="4. レイアウトとプロバイダ" variant="outlined">
          <div className={styles.sectionBody}>
            <ul className={styles.list}>
              <li>
                <Code>app/layout.tsx</Code> — フォント・グローバル CSS・
                <Code>AppProviders</Code>（Yargram / Alert / Overlay）のみ
              </li>
              <li>
                <Code>PageContainer</Code> — 各ページで <Code>MJLayout</Code>（サイドバー +
                メイン）を指定
              </li>
              <li>
                <Code>AppShell</Code> — サイドバー表示・<Code>usePathname</Code>{' '}
                による選択状態
              </li>
            </ul>
            <MJTypography variant="p">
              インタラクションが不要な UI は PageContainer 内にそのまま書けます（Server
              Component のまま SSR）。<Code>useState</Code> や <Code>useEffect</Code>、
              <Code>useAlert</Code> などが必要な部分だけ PageView に分離します。
            </MJTypography>
          </div>
        </MJCard>

        <MJCard title="5. MJ コンポーネント" variant="outlined">
          <div className={styles.sectionBody}>
            <MJTypography variant="p">
              <Code>src/components/</Code> に OctoHub テーマの UI があります。Storybook で
              バリエーションと nightstar 背景を確認できます。
            </MJTypography>
            <ul className={styles.list}>
              <li>基本: MJButton, MJInput, MJSelect, MJTypography, MJCard など</li>
              <li>日時: MJDatePicker, MJTimePicker（<Code>usePopover</Code> 利用）</li>
              <li>フィードバック: MJAlert + <Code>useAlert()</Code></li>
              <li>読み込み: MJOverlayLoading + <Code>useOverlay()</Code></li>
              <li>データ表示: MJTable, MJGraph, MJPivot</li>
            </ul>
            <MJTypography variant="p">
              色・タイポ・スペーシングは <Code>src/constants/styles/vars.css.ts</Code>{' '}
              で一元管理しています。フォーム系の variant は{' '}
              <Code>src/components/types/variants.ts</Code> の <Code>MJFieldVariant</Code>{' '}
              を参照してください。
            </MJTypography>
          </div>
        </MJCard>

        <MJCard title="6. グローバル UI の使い方（クライアント）" variant="outlined">
          <div className={styles.sectionBody}>
            <MJTypography variant="p">
              Alert と Overlay は root の <Code>AppProviders</Code> 配下で有効です。Client
              Component から次のように呼び出します。
            </MJTypography>
            <Pre>{`'use client';
import { useAlert } from '@/components/MJAlert';
import { useOverlay } from '@/components/MJOverlayLoading';

const alert = useAlert();
const overlay = useOverlay();

alert.showSuccess('保存しました');
overlay.showLoading('処理中…');
overlay.hideLoading();`}</Pre>
          </div>
        </MJCard>

        <MJCard title="7. よく使うコマンド" variant="gradient">
          <div className={styles.sectionBody}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeadCell}>コマンド</th>
                  <th className={styles.tableHeadCell}>説明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>
                    <Code>yarn dev</Code>
                  </td>
                  <td className={styles.tableCell}>開発サーバー（ポート 3050）</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    <Code>yarn build</Code>
                  </td>
                  <td className={styles.tableCell}>本番ビルド</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    <Code>yarn storybook</Code>
                  </td>
                  <td className={styles.tableCell}>MJ コンポーネントカタログ</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    <Code>yarn gen &lt;path&gt;</Code>
                  </td>
                  <td className={styles.tableCell}>feature + app ルートを生成</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    <Code>yarn test</Code>
                  </td>
                  <td className={styles.tableCell}>ユニットテスト（Vitest）</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>
                    <Code>yarn lint</Code>
                  </td>
                  <td className={styles.tableCell}>ESLint</td>
                </tr>
              </tbody>
            </table>
          </div>
        </MJCard>
      </article>
    </MJLayout>
  );
}
