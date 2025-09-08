import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppRoutes } from '../../lib/common/AppRoutes';
import { findPublicationByPid, loadPublications, type Publication } from '../../lib/publications';

function formatDate(p: Publication) {
  const iso = p.date;
  const d = new Date(/^\d{4}-\d{2}$/.test(iso) ? `${iso}-01` : iso);
  const hasDay = /\d{4}-\d{2}-\d{2}/.test(iso);
  const month = d.toLocaleString(undefined, { month: 'long' });
  const year = d.getFullYear();
  if (hasDay) return `${d.getDate()} ${month} ${year}`;
  return `${month} ${year}`;
}

export default function PublicationDetails() {
  const { pid } = useParams();
  const pub = useMemo(() => (pid ? findPublicationByPid(pid) : undefined), [pid]);
  // Prime loader for fallback when direct-loading a details page
  useMemo(() => loadPublications(), []);

  if (!pub) {
    return (
      <div className="prose">
        <h1 className="hero__title">Publication</h1>
        <p>Publication not found.</p>
        <p><Link to={AppRoutes.PUBLICATIONS.path}>Back to publications</Link></p>
      </div>
    );
  }

  const blocks = Array.isArray(pub.content) ? pub.content : [String(pub.content)];

  return (
    <div className="prose">
      <h1 className="hero__title">{pub.title}</h1>
      <div className="publication__meta">
        <p className="list__meta"><time dateTime={pub.date}>{formatDate(pub)}</time></p>

        {pub.publicationUrl && (
          <p>
            <a className="button__primary" href={pub.publicationUrl} target="_blank" rel="noreferrer">
              View publication
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" style={{ marginLeft: '0.45rem' }} />
            </a>
          </p>
        )}
      </div>

      <div className="publication__details">
        <h2>Abstract</h2>
        {blocks.map((t, i) => (<p key={i}>{t}</p>))}

        {Array.isArray(pub.authors) && pub.authors.length > 0 && (
          <>
            <h2>Authors</h2>
            <p>{pub.authors.filter(Boolean).join(', ')}</p>
          </>
        )}

        {pub.venue && (
          <>
            <h2>Venue</h2>
            <p>{pub.venue}</p>
          </>
        )}
      </div>
    </div>
  );
}
