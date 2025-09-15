
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProjects } from '../../lib/projects';
import { AppRoutes } from '../../lib/common/AppRoutes';
import ItemList, { type Item } from '../../lib/common/ui/ItemList';
import { LoadingSpinnerFallback } from '../../lib/common/ui/spinner/LoadingSpinnerFallback';

export default function Projects() {
  const { data, loading, error, reload } = useProjects();
  const location = useLocation();
  useEffect(() => { reload(); }, [location.key, reload]);

  if (loading || !data) return <LoadingSpinnerFallback />;
  if (error) return <div className="prose"><p>Failed to load projects.</p></div>;

  return (
    <ItemList
      title={AppRoutes.PROJECTS.title}
      items={data as unknown as Item[]}
      countLabel="projects"
      listAriaLabel="Project list"
      paginationAriaLabel="Projects pagination"
      getItemHref={(p) => `${AppRoutes.PROJECTS.path}/${p.pid}`}
    />
  );
}
