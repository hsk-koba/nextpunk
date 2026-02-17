import fs from 'fs';
import path from 'path';

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('❌ Usage: node scripts/gen-feature.mjs <feature-path> (e.g., users/new)');
  process.exit(1);
}

// 先頭を大文字にする & スラッシュやハイフンを除去するヘルパー
// users/new -> UsersNew
const toPascalCase = (str) =>
  str
    .replace(/[/_-]+/g, ' ')
    .replace(/\s+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, '');

const FEATURE_NAME_PASCAL = toPascalCase(inputPath);
// src/app/users/new などの階層を維持
const APP_DIR = path.join(process.cwd(), 'src', 'app', inputPath);
// src/features も同様に階層を維持
const FEATURES_DIR = path.join(process.cwd(), 'src', 'features', inputPath);

// 作成するディレクトリリスト
const dirs = [
  APP_DIR,
  path.join(FEATURES_DIR, 'components'),
  path.join(FEATURES_DIR, 'constants'),
  path.join(FEATURES_DIR, 'styles'),
  path.join(FEATURES_DIR, 'utils'),
  path.join(FEATURES_DIR, 'contexts'),
];

// 1. ディレクトリの作成
dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 2. app/[path]/page.tsx の作成
const pageContent = `
import { ${FEATURE_NAME_PASCAL}PageContainer } from "@/features/${inputPath}/${FEATURE_NAME_PASCAL}PageContainer";

export default function ${FEATURE_NAME_PASCAL}Page() {
  return <${FEATURE_NAME_PASCAL}PageContainer />;
}
`;

// 3. features/[path]/[Name]PageContainer.tsx の作成
const containerContent = `
import React, { useEffect } from 'react';
import { usePrinter } from '@yargram/react';

export const ${FEATURE_NAME_PASCAL}PageContainer: React.FC = () => {
  const printer = usePrinter();

  useEffect(() => {
    printer.info('${FEATURE_NAME_PASCAL}PageContainer');
  }, [printer]);

  return (
    <div>
      <h1>${FEATURE_NAME_PASCAL} Page</h1>
    </div>
  );
};
`;

// ファイル書き込み
fs.writeFileSync(path.join(APP_DIR, 'page.tsx'), pageContent.trim() + '\n');
fs.writeFileSync(path.join(FEATURES_DIR, `${FEATURE_NAME_PASCAL}PageContainer.tsx`), containerContent.trim() + '\n');

// 各フォルダに .gitkeep を作成
dirs.slice(1).forEach(dir => {
  if (dir !== APP_DIR) { // APP_DIRにはpage.tsxがあるので不要
    fs.writeFileSync(path.join(dir, '.gitkeep'), '');
  }
});

console.log(`✅ Successfully generated feature at: ${inputPath}`);
console.log(`📂 App Directory:  app/${inputPath}`);
console.log(`📂 Feature Directory: features/${inputPath}`);