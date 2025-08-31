import { useMemo, useState } from 'react';
import { loadProjects, type Project } from '../../lib/projects';
import Modal from '../../lib/common/ui/Modal';
import { AppRoutes } from '../../lib/common/AppRoutes';

export default function Projects() {
  const projects = useMemo(() => loadProjects(), []);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find(p => p.id === openId) || null;
  const hasProjects = !!projects && !!projects.length;

  if (hasProjects) {
    return (
      <div className="prose prose--big">
        <h1 className="hero__title">{AppRoutes.PROJECTS.title}</h1>
        <div className="timeline">
          <div className="timeline__line" />
          <ol className="timeline__list">
            {projects.map((p, i) => (
              <li key={p.id} className="timeline__item">
                <span className="timeline__dot" />
                <div className={`timeline__side ${i % 2 === 0 ? 'timeline__side--left' : 'timeline__side--right'}`}>
                  <article
                    className="timeline__card"
                    onClick={() => setOpenId(p.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenId(p.id); } }}
                  >
                    <h3 className="timeline__title">{p.title}</h3>
                  </article>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Modal open={!!open} onClose={() => setOpenId(null)} title={open?.title}>
          {open && renderContent(open)}
        </Modal>
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

function renderContent(p: Project) {
  const c = p.content;
  if (Array.isArray(c)) {
    return <div>{c.map((para, idx) => <p key={idx}>{para}</p>)}</div>;
  }
  return <p>{String(c)}</p>;
}
