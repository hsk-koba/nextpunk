# NEXTPUNK

Next.js 16 ベースのフロントエンド（OctoHub CMS）。TypeScript と Vanilla Extract で構築された UI と MJ デザインシステムを備えています。

## 技術スタック

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: [Vanilla Extract](https://vanilla-extract.style/)（型安全な CSS-in-JS）
- **UI**: MJ コンポーネント群（OctoHub テーマ）
- **Forms**: React Hook Form + Yup + `@hookform/resolvers`
- **Storybook**: 10（コンポーネントカタログ・Nextpunk テーマ）

## 必要環境

- Node.js 20+
- Yarn（推奨）または npm

## セットアップ

```bash
yarn install
```

## 開発

### アプリの起動

```bash
yarn dev
```

- 開発サーバー: **http://localhost:3050**
- ビルドには webpack を使用（Vanilla Extract 対応のため `--webpack` 指定）

### Storybook（コンポーネントカタログ）

```bash
yarn storybook
```

- **http://localhost:6006** で MJ コンポーネントの一覧・バリエーションを確認できます。
- 背景に「nightstar」を選ぶと夜空風のプレビューで表示されます。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `yarn dev` | 開発サーバー起動（ポート 3050, webpack） |
| `yarn build` | 本番ビルド（webpack） |
| `yarn start` | 本番サーバー起動 |
| `yarn storybook` | Storybook 開発サーバー（ポート 6006） |
| `yarn build-storybook` | Storybook の静的ビルド |
| `yarn lint` | ESLint 実行 |
| `yarn gen` | 機能生成スクリプト（`scripts/gen-feature.mjs`） |

## プロジェクト構成（抜粋）

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
├── components/             # MJ コンポーネント
│   ├── MJButton.tsx, MJInput.tsx, MJSelect.tsx, ...
│   ├── styles/            # Vanilla Extract スタイル (*.css.ts)
│   └── *.stories.tsx       # Storybook ストーリー
└── constants/
    └── styles/             # テーマ・トークン（vars.css.ts, skeleton.css.ts）

.storybook/
├── main.ts
├── preview.ts              # グローバルデコレータ・背景（nightstar など）
├── manager.ts              # テーマ（Nextpunk）
└── MainTheme.ts
```

## MJ コンポーネント

OctoHub テーマに合わせた共通 UI コンポーネントです。スタイルは `src/components/styles/*.css.ts` で Vanilla Extract により定義されています。

- **基本**: MJButton, MJIconButton, MJInput, MJSelect, MJCheckbox, MJRadio, MJTextarea, MJTypography, MJAvatar
- **レイアウト**: MJLayout, MJHeader, MJSidebar
- **オーバーレイ**: MJModal, MJMenu, MJDatePicker
- **データ**: MJTable（ソート・ローディング対応）

テーマトークン（色・タイポ・スペーシング・シャドウなど）は `src/constants/styles/vars.css.ts` で一元管理しています。

## ビルドまわり

- **webpack 使用**: Vanilla Extract のため、`dev` / `build` は `--webpack` で実行しています（Turbopack は未使用）。
- **next.config**: `@vanilla-extract/next-plugin` と `turbopack: {}` を設定済み。

## ライセンス

Private.
