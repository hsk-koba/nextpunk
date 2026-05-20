export type SettingsUserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export const SAMPLE_USERS: SettingsUserRecord[] = [
  { id: '1', name: '田中 太郎', email: 'tanaka@example.com', role: 'エンジニア', status: '在籍' },
  { id: '2', name: '山田 花子', email: 'yamada@example.com', role: 'デザイナー', status: '在籍' },
  { id: '3', name: '佐藤 一郎', email: 'sato@example.com', role: 'マネージャー', status: '休暇' },
  { id: '4', name: '鈴木 次郎', email: 'suzuki@example.com', role: 'エンジニア', status: '在籍' },
  { id: '5', name: '高橋 美咲', email: 'takahashi@example.com', role: 'デザイナー', status: '在籍' },
  { id: '6', name: '伊藤 健', email: 'ito@example.com', role: 'エンジニア', status: '退職' },
];

export const ROLE_FILTER_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: 'エンジニア', label: 'エンジニア' },
  { value: 'デザイナー', label: 'デザイナー' },
  { value: 'マネージャー', label: 'マネージャー' },
] as const;

export const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: '在籍', label: '在籍' },
  { value: '休暇', label: '休暇' },
  { value: '退職', label: '退職' },
] as const;
