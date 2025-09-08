import { useMemo } from 'react';
import { loadProjects } from '../../lib/projects';
import { AppRoutes } from '../../lib/common/AppRoutes';
import ItemList, { type Item } from '../../lib/common/ui/ItemList';

export default function Projects() {
  const projects = useMemo(() => loadProjects(), []);
  return (
    <ItemList
      title={AppRoutes.PROJECTS.title}
      items={projects as unknown as Item[]}
      countLabel="projects"
      listAriaLabel="Project list"
      paginationAriaLabel="Projects pagination"
      getItemHref={(p) => `${AppRoutes.PROJECTS.path}/${p.pid}`}
    />
  );
}
