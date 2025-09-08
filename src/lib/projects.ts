import { isDev } from './env';

export type ProjectDoc = {
  title: string;
  content: string | string[];
  // Date is required; expected formats: YYYY-MM or YYYY-MM-DD
  date: string;
  partner?: { name: string; url?: string };
};

export type Project = ProjectDoc & {
  // Source filename without extension
  id: string;
  // Six-digit numeric id used for routing
  pid: string;
};

export function loadProjects(): Project[] {
  // Prefer real content; gracefully fall back to mocks when empty
  const primary = import.meta.glob<{ default: ProjectDoc }>(
    '/src/content/projects/*.json',
    { eager: true }
  );
  const fallback = import.meta.glob<{ default: ProjectDoc }>(
    '/src/content/mocks/projects/*.json',
    { eager: true }
  );
  const hasPrimary = Object.keys(primary).length > 0;
  const modules = hasPrimary ? primary : (isDev() ? fallback : {});

  const items: Project[] = Object.entries(modules).map(([path, mod]) => {
    const data = mod.default;
    const id = path.split('/').pop()!.replace(/\.json$/, '');
    // Temporary pid; will be overwritten after sorting
    return { id, pid: '000000', ...data } as Project;
  });

  const toTime = (s: string): number => {
    // Accept YYYY-MM or YYYY-MM-DD
    const iso = /^(\d{4})-(\d{2})$/.test(s) ? `${s}-01` : s;
    const t = new Date(iso).getTime();
    return Number.isFinite(t) ? t : 0;
  };

  items.sort((a, b) => toTime(b.date) - toTime(a.date));
  // Assign stable six-digit ids based on sorted order
  items.forEach((item, index) => {
    const n = 100001 + index; // start from 100001
    item.pid = String(n).padStart(6, '0');
  });
  return items;
}

export function findProjectByPid(pid: string): Project | undefined {
  return loadProjects().find(p => p.pid === pid);
}
