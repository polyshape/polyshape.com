import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppRoutes } from '../../lib/common/AppRoutes';
import { findProjectByPid, loadProjects, type Project } from '../../lib/projects';

function formatDate(p: Project) {
  const iso = p.date;
  const d = new Date(/^\d{4}-\d{2}$/.test(iso) ? `${iso}-01` : iso);
  const hasDay = /\d{4}-\d{2}-\d{2}/.test(iso);
  const month = d.toLocaleString(undefined, { month: 'long' });
  const year = d.getFullYear();
  if (hasDay) return `${d.getDate()} ${month} ${year}`;
  return `${month} ${year}`;
}

export default function ProjectDetails() {
  const { pid } = useParams();
  const project = useMemo(() => (pid ? findProjectByPid(pid) : undefined), [pid]);
  // Ensure projects are primed for fallback even if direct-load
  useMemo(() => loadProjects(), []);

  if (!project) {
    return (
      <div className="prose">
        <h1 className="hero__title">Project</h1>
        <p>Project not found.</p>
        <p><Link to={AppRoutes.PROJECTS.path}>Back to projects</Link></p>
      </div>
    );
  }

  const c = project.content;
  const blocks = Array.isArray(c) ? c : [String(c)];
  const partner = project.partner?.url
    ? <a href={project.partner.url} target="_blank" rel="noreferrer">{project.partner.name}</a>
    : project.partner?.name;

  return (
    <div className="prose">
      <h1 className="hero__title">{project.title}</h1>
      <p className="list__meta"><time dateTime={project.date}>{formatDate(project)}</time>{partner ? ' — ' : ''}{partner}</p>
      {blocks.map((t, i) => (<p key={i}>{t}</p>))}
    </div>
  );
}

