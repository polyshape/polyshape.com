import { useCallback, useEffect, useState } from "react";
import { getEnvVar, isDev } from "./env";

export type CourseDoc = {
  title: string;
  content: string | string[];
  // Date is required; expected formats: YYYY-MM or YYYY-MM-DD
  date: string;
  partner?: { name: string; url?: string };
};

export type Course = CourseDoc & {
  // Source filename without extension
  id: string;
  // Six-digit numeric id used for routing
  pid: string;
};

// --- Local (filesystem) loader used in dev/mocks ---
async function loadCoursesLocal(): Promise<Course[]> {
  // Add configurable delay for dev testing (same env var as MSW)
  const delayTime = Number(import.meta.env.VITE_MSW_DELAY ?? 0);
  await new Promise((resolve) => setTimeout(resolve, delayTime));

  // Prefer real content; gracefully fall back to mocks when empty
  const primary = import.meta.glob<{ default: CourseDoc }>(
    "/src/content/projects/*.json",
    { eager: true },
  );
  const fallback = import.meta.glob<{ default: CourseDoc }>(
    "/src/content/mocks/projects/*.json",
    { eager: true },
  );
  const hasPrimary = Object.keys(primary).length > 0;
  const modules = hasPrimary ? primary : isDev() ? fallback : {};

  const items: Course[] = Object.entries(modules).map(([path, mod]) => {
    const data = mod.default;
    const id = path
      .split("/")
      .pop()!
      .replace(/\.json$/, "");
    // Temporary pid; will be overwritten after sorting
    return { id, pid: "000000", ...data } as Course;
  });

  // Double the items - each item appears twice with different IDs
  const doubledItems = [
    ...items,
    ...items.map((item) => ({ ...item, id: `${item.id}_copy` })),
  ];

  sortAndAssignPids(doubledItems);
  return doubledItems;
}

function sortAndAssignPids(items: Course[]): void {
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
    item.pid = String(n).padStart(6, "0");
  });
}

// --- Remote (API) loader ---
type BlobEntry = { url?: string; downloadUrl?: string; pathname?: string };

async function fetchRemoteCourses(): Promise<Course[]> {
  // Use new consolidated list endpoint
  const listRes = await fetch(withCacheBuster("/api/projects"), {
    headers: { Accept: "application/json" },
  });
  if (!listRes.ok) {
    throw new Error(`Failed to list courses (${listRes.status})`);
  }
  const blobs: BlobEntry[] = await listRes.json();
  const entries = Array.isArray(blobs) ? blobs : [];

  const docs = await Promise.all(
    entries.map(async (b) => {
      const dl = b.downloadUrl || (b.url ? `${b.url}?download=1` : undefined);
      if (!dl) return undefined;
      const res = await fetch(withCacheBuster(dl), {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        return undefined;
      }
      const doc = (await res.json()) as CourseDoc;
      const base = (b.pathname || "").split("/").pop() || "";
      const id = base.replace(/\.json$/i, "") || cryptoRandomId();
      // For remote items, use the filename (without .json) as both id and pid
      return { id, pid: id, ...doc } as Course;
    }),
  );

  // Use filename as pid and sort by date (desc)
  const items = docs.filter(Boolean) as Course[];
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
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    // Very rare fallback
    return Math.random().toString(36).slice(2, 10);
  }
}

function shouldUseApi(): boolean {
  // In production: always use API
  if (!isDev()) return true;
  // In dev: opt-in via flag
  const flag = getEnvVar("VITE_COURSES_USE_API");
  return String(flag).toLowerCase() === "true";
}

export async function fetchCourses(): Promise<Course[]> {
  if (shouldUseApi()) {
    return fetchRemoteCourses();
  }
  return loadCoursesLocal();
}

// React hook to fetch courses without module-level caching
export function useCourses() {
  const [data, setData] = useState<Course[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [seq, setSeq] = useState(0);

  const reload = useCallback(() => setSeq((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCourses()
      .then((items) => {
        if (!cancelled) setData(items);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [seq]);

  return { data, error, loading, reload } as const;
}

// Add a cache-busting param to avoid stale reads after updates
function withCacheBuster(urlStr: string): string {
  try {
    const u = new URL(urlStr);
    u.searchParams.set("_", Date.now().toString());
    return u.toString();
  } catch {
    const sep = urlStr.includes("?") ? "&" : "?";
    return `${urlStr}${sep}_=${Date.now()}`;
  }
}
