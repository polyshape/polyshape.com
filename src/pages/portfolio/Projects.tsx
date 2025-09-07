import { useMemo } from 'react';
import { loadProjects, type Project } from '../../lib/projects';
import { useSearchParams } from 'react-router-dom';
import { AppRoutes } from '../../lib/common/AppRoutes';

export default function Projects() {
  const projects = useMemo(() => loadProjects(), []);
  const [params, setParams] = useSearchParams();
  const hasProjects = !!projects && !!projects.length;
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const currentPage = clampPage(Number(params.get('page')) || 1, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visible = projects.slice(start, start + pageSize);
  const pageItems = buildPageItems(totalPages, currentPage, 1);

  function setPage(n: number) {
    const next = new URLSearchParams(params);
    next.set('page', String(clampPage(n, totalPages)));
    setParams(next, { replace: false });
  }

  if (hasProjects) {
    return (
      <div className="prose prose--big">
        <h1 className="hero__title">{AppRoutes.PROJECTS.title}</h1>
        <div className="list__intro">
          <small className="list__count">{projects.length} projects</small>
        </div>

        <ol className="list" aria-label="Project list">
          {visible.map((p) => (
            <li
              key={p.id}
              className="list__row"
              onClick={() => openInNewTab(`${AppRoutes.PROJECTS.path}/${p.pid}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openInNewTab(`${AppRoutes.PROJECTS.path}/${p.pid}`);
                }
              }}
            >
              <time className="list__date" dateTime={getDateISO(p)}>{formatDate(p)}</time>
              <div className="list__content">
                <h3 className="list__title">{p.title}</h3>
                <p className="list__preview">{getPreview(p)}</p>
                {p.partner?.name && (
                  <div className="list__partner">{p.partner.name}</div>
                )}
              </div>
              <div className="list__cta" aria-hidden="true">
                <span className="list__arrow"/>
              </div>
            </li>
          ))}
        </ol>

        {totalPages > 1 && (
          <nav className="pager" aria-label="Projects pagination">
            <button className="pager__btn pager__btn--chev pager__btn--left" onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page"></button>
            {pageItems.map((item, idx) => (
              typeof item === 'number' ? (
                <button key={item} className={`pager__btn ${item === currentPage ? 'pager__btn--active' : ''}`} onClick={() => setPage(item)} aria-current={item === currentPage ? 'page' : undefined}>
                  {item}
                </button>
              ) : (
                <span key={`e-${idx}`} className="pager__ellipsis" aria-hidden="true">…</span>
              )
            ))}
            <button className="pager__btn pager__btn--chev pager__btn--right" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages} aria-label="Next page"></button>
          </nav>
        )}
      </div>
    );
  } else {
    return (
      <div className="prose">
        <h1 className="hero__title">{AppRoutes.PROJECTS.title}</h1>
        <p>
          Coming Soon.
        </p>
      </div>
    );
  }
}

function getPreview(p: Project) {
  const c = p.content;
  const text = Array.isArray(c) ? c[0] : String(c || '');
  return text;
}

function getDateISO(p: Project): string {
  return p.date || '';
}

function formatDate(p: Project): string {
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
