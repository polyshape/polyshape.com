import { useMemo } from 'react';
import { AppRoutes } from "../../lib/common/AppRoutes";
import { loadPublications } from "../../lib/publications";
import ItemList, { type Item } from "../../lib/common/ui/ItemList";

export default function Publications() {
  const pubs = useMemo(() => loadPublications(), []);
  return (
    <ItemList
      title={AppRoutes.PUBLICATIONS.title}
      items={pubs as unknown as Item[]}
      countLabel="publications"
      listAriaLabel="Publications list"
      paginationAriaLabel="Publications pagination"
      getItemHref={(p) => `${AppRoutes.PUBLICATIONS.path}/${p.pid}`}
    />
  );
}

