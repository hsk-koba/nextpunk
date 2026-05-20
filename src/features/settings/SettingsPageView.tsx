'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { usePrinter } from '@yargram/react';
import { MJButton } from '@/components/MJButton';
import { MJInput } from '@/components/MJInput';
import { MJSelect } from '@/components/MJSelect';
import { MJTable, type SortDirection } from '@/components/MJTable';
import { MJTypography } from '@/components/MJTypography';
import {
  ROLE_FILTER_OPTIONS,
  SAMPLE_USERS,
  STATUS_FILTER_OPTIONS,
  type SettingsUserRecord,
} from './constants/sampleUsers';
import * as styles from './styles/settingsPage.css';

type TableRow = Record<string, React.ReactNode>;

const TABLE_COLUMNS = [
  { key: 'name' as const, label: '名前', sortable: true },
  { key: 'email' as const, label: 'メール', sortable: true },
  { key: 'role' as const, label: '役割', sortable: true },
  { key: 'status' as const, label: 'ステータス', sortable: true },
];

function toTableRow(user: SettingsUserRecord): TableRow {
  return {
    name: <MJTypography variant="small">{user.name}</MJTypography>,
    email: <MJTypography variant="small">{user.email}</MJTypography>,
    role: <MJTypography variant="small">{user.role}</MJTypography>,
    status: <MJTypography variant="small">{user.status}</MJTypography>,
  };
}

function filterUsers(
  users: SettingsUserRecord[],
  keyword: string,
  role: string,
  status: string,
): SettingsUserRecord[] {
  const q = keyword.trim().toLowerCase();
  return users.filter((user) => {
    if (role && user.role !== role) return false;
    if (status && user.status !== status) return false;
    if (!q) return true;
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });
}

function sortUsers(
  users: SettingsUserRecord[],
  sortKey: string,
  direction: SortDirection,
): SettingsUserRecord[] {
  const sorted = [...users].sort((a, b) => {
    const av = String(a[sortKey as keyof SettingsUserRecord] ?? '');
    const bv = String(b[sortKey as keyof SettingsUserRecord] ?? '');
    return av.localeCompare(bv, 'ja');
  });
  return direction === 'desc' ? sorted.reverse() : sorted;
}

/** 設定ページ（検索フォーム + テーブル） */
export function SettingsPageView() {
  const printer = usePrinter();

  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [appliedRole, setAppliedRole] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('');
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    printer.info('SettingsPageView');
  }, [printer]);

  const handleSearch = useCallback(() => {
    setLoading(true);
    setAppliedKeyword(keyword);
    setAppliedRole(roleFilter);
    setAppliedStatus(statusFilter);
    window.setTimeout(() => setLoading(false), 400);
  }, [keyword, roleFilter, statusFilter]);

  const handleReset = useCallback(() => {
    setKeyword('');
    setRoleFilter('');
    setStatusFilter('');
    setAppliedKeyword('');
    setAppliedRole('');
    setAppliedStatus('');
    setSortKey('name');
    setSortDirection('asc');
  }, []);

  const filtered = useMemo(
    () => filterUsers(SAMPLE_USERS, appliedKeyword, appliedRole, appliedStatus),
    [appliedKeyword, appliedRole, appliedStatus],
  );

  const sorted = useMemo(
    () => sortUsers(filtered, sortKey, sortDirection),
    [filtered, sortKey, sortDirection],
  );

  const tableData = useMemo(() => sorted.map(toTableRow), [sorted]);

  const handleSort = useCallback((key: string, direction: SortDirection) => {
    setSortKey(key);
    setSortDirection(direction);
  }, []);

  return (
    <div className={styles.page}>
      <MJTypography variant="h1" bold>
        Settings
      </MJTypography>

      <section className={styles.searchCard} aria-label="検索条件">
        <MJTypography variant="h3" bold className={styles.searchTitle}>
          ユーザー検索
        </MJTypography>
        <div className={styles.searchGrid}>
          <MJInput
            label="キーワード"
            placeholder="名前・メール"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <MJSelect
            label="役割"
            options={[...ROLE_FILTER_OPTIONS]}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
          <MJSelect
            label="ステータス"
            options={[...STATUS_FILTER_OPTIONS]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
        <div className={styles.searchActions}>
          <MJButton
            label="リセット"
            variant="outline"
            icon={RotateCcw}
            onClick={handleReset}
          />
          <MJButton
            label="検索"
            variant="primary"
            icon={Search}
            onClick={handleSearch}
          />
        </div>
      </section>

      <section aria-label="検索結果">
        <div className={styles.resultHeader}>
          <MJTypography variant="h3" bold>
            検索結果
          </MJTypography>
          <span className={styles.resultCount}>
            {loading ? '読み込み中…' : `${sorted.length} 件`}
          </span>
        </div>
        <div className={styles.tableWrap}>
          <MJTable
            className={styles.tableFullWidth}
            columns={TABLE_COLUMNS}
            data={tableData}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            loading={loading}
            getRowKey={(_, index) => sorted[index]?.id ?? index}
          />
        </div>
      </section>
    </div>
  );
}
