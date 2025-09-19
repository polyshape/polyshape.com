import { isDev, getEnvVar } from './env';
import { useCallback, useEffect, useState } from 'react';

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

// --- Local (filesystem) loader used in dev/mocks ---
function loadPublicationsLocal(): Publication[] {
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

  sortAndAssignPids(items);
  return items;
}

function sortAndAssignPids(items: Publication[]): void {
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
}

// --- Remote (API) loader ---
type BlobEntry = { url?: string; downloadUrl?: string; pathname?: string };

async function fetchRemotePublications(): Promise<Publication[]> {
  const listRes = await fetch(withCacheBuster('/api/publications'), { headers: { 'Accept': 'application/json' } });
  if (!listRes.ok) {
    throw new Error(`Failed to list publications (${listRes.status})`);
  }
  const blobs: BlobEntry[] = await listRes.json();
  const entries = Array.isArray(blobs) ? blobs : [];

  const docs = await Promise.all(entries.map(async (b) => {
    const dl = b.downloadUrl || (b.url ? `${b.url}?download=1` : undefined);
    if (!dl) return undefined;
    const res = await fetch(withCacheBuster(dl), { headers: { 'Accept': 'application/json' } });
    if (!res.ok) {
      return undefined;
    }
    const doc = (await res.json()) as PublicationDoc;
    const base = (b.pathname || '').split('/').pop() || '';
    const id = base.replace(/\.json$/i, '') || cryptoRandomId();
    return { id, pid: id, ...doc } as Publication;
  }));

  // Sort by date desc; keep pid as filename for remote
  const items = docs.filter(Boolean) as Publication[];
  const toTime = (s: string): number => {
    const iso = /^(\d{4})-(\d{2})$/.test(s) ? `${s}-01` : s;
    const t = new Date(iso).getTime();
    return Number.isFinite(t) ? t : 0;
  };
  items.sort((a, b) => toTime(b.date) - toTime(a.date));
  return items;
}

// Minimal random id for fallback when filename missing
function cryptoRandomId(): string {
  try {
    // Browsers
    const bytes = crypto.getRandomValues(new Uint8Array(6));
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Very rare fallback
    return Math.random().toString(36).slice(2, 10);
  }
}

function shouldUseApi(): boolean {
  // In production: always use API
  if (!isDev()) return true;
  // In dev: opt-in via flag
  const flag = getEnvVar('VITE_PUBLICATIONS_USE_API');
  return String(flag).toLowerCase() === 'true';
}

export async function fetchPublications(): Promise<Publication[]> {
  if (shouldUseApi()) {
    return fetchRemotePublications();
  }
  return Promise.resolve(loadPublicationsLocal());
}

// React hook to fetch publications without module-level caching
export function usePublications() {
  const [data, setData] = useState<Publication[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seq, setSeq] = useState(0);

  const reload = useCallback(() => setSeq((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPublications()
      .then((items) => { if (!cancelled) setData(items); })
      .catch((e) => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [seq]);

  return { data, error, loading, reload } as const;
}

// Add a cache-busting param to avoid stale reads after updates
function withCacheBuster(urlStr: string): string {
  try {
    const u = new URL(urlStr);
    u.searchParams.set('_', Date.now().toString());
    return u.toString();
  } catch {
    const sep = urlStr.includes('?') ? '&' : '?';
    return `${urlStr}${sep}_=${Date.now()}`;
  }
}
