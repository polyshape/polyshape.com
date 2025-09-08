import { isDev } from './env';

export type PublicationDoc = {
  title: string;
  content: string | string[];
  // Date formats supported: YYYY-MM or YYYY-MM-DD
  date: string;
  publicationUrl?: string;
  authors?: string[];
  venue?: string;
};

export type Publication = PublicationDoc & {
  // Source filename without extension
  id: string;
  // Six-digit numeric id used for routing
  pid: string;
};

export function loadPublications(): Publication[] {
  const primary = import.meta.glob<{ default: PublicationDoc }>(
    '/src/content/publications/*.json',
    { eager: true }
  );
  const fallback = import.meta.glob<{ default: PublicationDoc }>(
    '/src/content/mocks/publications/*.json',
    { eager: true }
  );

  const hasPrimary = Object.keys(primary).length > 0;
  const modules = hasPrimary ? primary : (isDev() ? fallback : {});

  const items: Publication[] = Object.entries(modules).map(([path, mod]) => {
    const data = mod.default;
    const id = path.split('/').pop()!.replace(/\.json$/, '');
    return { id, pid: '000000', ...data } as Publication;
  });

  const toTime = (s: string): number => {
    const iso = /^(\d{4})-(\d{2})$/.test(s) ? `${s}-01` : s;
    const t = new Date(iso).getTime();
    return Number.isFinite(t) ? t : 0;
  };

  items.sort((a, b) => toTime(b.date) - toTime(a.date));
  items.forEach((item, index) => {
    const n = 200001 + index; // start from 200001 to avoid overlap with projects
    item.pid = String(n).padStart(6, '0');
  });
  return items;
}

export function findPublicationByPid(pid: string): Publication | undefined {
  return loadPublications().find(p => p.pid === pid);
}
