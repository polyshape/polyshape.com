import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Item = {
  id: string;
  pid: string;
  title: string;
  content: string | string[];
  date: string;
  partner?: { name: string; url?: string };
  authors?: string[];
  venue?: string;
};

type ItemListProps = {
  title: string;
  items: Item[];
  pageSize?: number;
  countLabel?: string;
  listAriaLabel?: string;
  paginationAriaLabel?: string;
  getItemHref?: (item: Item) => string;
};

export default function ItemList({
  title,
  items,
  pageSize = 5,
  countLabel = 'items',
  listAriaLabel,
  paginationAriaLabel,
  getItemHref,
}: ItemListProps) {
  const [params, setParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = clampPage(Number(params.get('page')) || 1, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = useMemo(() => items.slice(start, start + pageSize), [items, start, pageSize]);
  const pageItems = useMemo(() => buildPageItems(totalPages, currentPage, 1), [totalPages, currentPage]);
  const hasItems = items.length > 0;

  function setPage(n: number) {
    const next = new URLSearchParams(params);
    next.set('page', String(clampPage(n, totalPages)));
    setParams(next, { replace: false });
  }

  if (!hasItems) {
    return (
      <div className="prose">
        <h1 className="hero__title">{title}</h1>
        <p>Coming Soon.</p>
      </div>
    );
  }

  return (
    <div className="prose prose--big">
      <h1 className="hero__title">{title}</h1>
      <div className="list__intro">
        <small className="list__count">{items.length} {countLabel}</small>
      </div>

      <ol className="list" aria-label={listAriaLabel || `${title} list`}>
        {visible.map((p) => (
          <li
            key={p.id}
            className="list__row"
            role={getItemHref ? 'link' : undefined}
            tabIndex={getItemHref ? 0 : -1}
            onClick={() => {
              const href = getItemHref?.(p);
              if (href) openInNewTab(href);
            }}
            onKeyDown={(e) => {
              if (!getItemHref) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const href = getItemHref?.(p);
                if (href) openInNewTab(href);
              }
            }}
          >
            <time className="list__date" dateTime={getDateISO(p)}>{formatDate(p)}</time>
            <div className="list__content">
              <h3 className="list__title">{p.title}</h3>
              <p className="list__preview">{getPreview(p)}</p>
              {Array.isArray(p.authors) && p.authors.length > 0
                ? (
                  <div className="list__partner">{p.authors.filter(Boolean).join(", ")}</div>
                )
                : (p.partner?.name && (
                  <div className="list__partner">{p.partner.name}</div>
                ))}
              {p.venue && (
                <div className="list__venue">{p.venue}</div>
              )}
            </div>
            <div className="list__cta" aria-hidden="true">
              <i className="list__arrow fa-solid fa-circle-right" aria-hidden="true"></i>
            </div>
          </li>
        ))}
      </ol>

      {totalPages > 1 && (
        <nav className="pager" aria-label={paginationAriaLabel || `${title} pagination`}>
          <button className="pager__btn" onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page">
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
          </button>
          {pageItems.map((item, idx) => (
            typeof item === 'number' ? (
              <button key={item} className={`pager__btn ${item === currentPage ? 'pager__btn--active' : ''}`} onClick={() => setPage(item)} aria-current={item === currentPage ? 'page' : undefined}>
                {item}
              </button>
            ) : (
              <span key={`e-${idx}`} className="pager__ellipsis" aria-hidden="true">…</span>
            )
          ))}
          <button className="pager__btn" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages} aria-label="Next page">
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </nav>
      )}
    </div>
  );
}

function getPreview(p: Item) {
  const c = p.content;
  const text = Array.isArray(c) ? c[0] : String(c || '');
  return text;
}

function getDateISO(p: Item): string {
  return p.date || '';
}

function formatDate(p: Item): string {
  const iso = getDateISO(p);
  if (!iso) return '';
  const d = new Date(iso);
  const hasDay = /\d{4}-\d{2}-\d{2}/.test(iso);
  const month = d.toLocaleString(undefined, { month: 'long' });
  const year = d.getFullYear();
  if (hasDay) {
    const day = d.getDate();
    return `${day} ${month} ${year}`;
  }
  return `${month} ${year}`;
}

function clampPage(n: number, max: number) {
  return Math.max(1, Math.min(max, n));
}

function buildPageItems(total: number, current: number, delta: number): Array<number | '...'> {
  const pages: number[] = [];
  const left = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) pages.push(i);
  }
  const items: Array<number | '...'> = [];
  let last = 0;
  for (const p of pages) {
    if (last && p - last > 1) items.push('...');
    items.push(p);
    last = p;
  }
  return items;
}

function openInNewTab(path: string) {
  const w = window.open(path, '_blank');
  if (w) w.opener = null;
}
