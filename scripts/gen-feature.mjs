import fs from 'fs';
import path from 'path';

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('❌ Usage: node scripts/gen-feature.mjs <feature-path> (e.g., users/new)');
  process.exit(1);
}

const toPascalCase = (str) =>
  str
    .replace(/[/_-]+/g, ' ')
    .replace(/\s+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, '');

const FEATURE_NAME_PASCAL = toPascalCase(inputPath);
const APP_DIR = path.join(process.cwd(), 'src', 'app', inputPath);
const FEATURES_DIR = path.join(process.cwd(), 'src', 'features', inputPath);

const dirs = [
  APP_DIR,
  path.join(FEATURES_DIR, 'components'),
  path.join(FEATURES_DIR, 'constants'),
  path.join(FEATURES_DIR, 'styles'),
  path.join(FEATURES_DIR, 'utils'),
  path.join(FEATURES_DIR, 'contexts'),
];

dirs.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

const pageContent = `
import { ${FEATURE_NAME_PASCAL}PageContainer } from "@/features/${inputPath}/${FEATURE_NAME_PASCAL}PageContainer";

export default function ${FEATURE_NAME_PASCAL}Page() {
  return <${FEATURE_NAME_PASCAL}PageContainer />;
}
`;

/** SSR: Server Component が MJLayout でラップ */
const containerContent = `
import { MJLayout } from '@/components/MJLayout';
import { ${FEATURE_NAME_PASCAL}PageView } from './${FEATURE_NAME_PASCAL}PageView';

/** ${FEATURE_NAME_PASCAL}（Server Component + MJLayout） */
export function ${FEATURE_NAME_PASCAL}PageContainer() {
  return (
    <MJLayout>
      <${FEATURE_NAME_PASCAL}PageView />
    </MJLayout>
  );
}
`;

/** クライアント専用（hooks・Yargram 等） */
const viewContent = `
'use client';

import { useEffect } from 'react';
import { usePrinter } from '@yargram/react';
import { MJTypography } from '@/components/MJTypography';

export function ${FEATURE_NAME_PASCAL}PageView() {
  const printer = usePrinter();

  useEffect(() => {
    printer.info('${FEATURE_NAME_PASCAL}PageView');
  }, [printer]);

  return (
    <div>
      <MJTypography variant="h1" bold>
        ${FEATURE_NAME_PASCAL}
      </MJTypography>
    </div>
  );
}
`;

fs.writeFileSync(path.join(APP_DIR, 'page.tsx'), pageContent.trim() + '\n');
fs.writeFileSync(
  path.join(FEATURES_DIR, `${FEATURE_NAME_PASCAL}PageContainer.tsx`),
  containerContent.trim() + '\n',
);
fs.writeFileSync(
  path.join(FEATURES_DIR, `${FEATURE_NAME_PASCAL}PageView.tsx`),
  viewContent.trim() + '\n',
);

dirs.slice(1).forEach((dir) => {
  if (dir !== APP_DIR) {
    fs.writeFileSync(path.join(dir, '.gitkeep'), '');
  }
});

console.log(`✅ Successfully generated feature at: ${inputPath}`);
console.log(`📂 App Directory:  app/${inputPath}`);
console.log(`📂 Feature Directory: features/${inputPath}`);
console.log(`   - ${FEATURE_NAME_PASCAL}PageContainer.tsx (SSR + MJLayout)`);
console.log(`   - ${FEATURE_NAME_PASCAL}PageView.tsx (client)`);
