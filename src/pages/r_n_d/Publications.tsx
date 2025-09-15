
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from "../../lib/common/AppRoutes";
import { usePublications } from "../../lib/publications";
import ItemList, { type Item } from "../../lib/common/ui/ItemList";
import { LoadingSpinnerFallback } from '../../lib/common/ui/spinner/LoadingSpinnerFallback';

export default function Publications() {
  const { data, loading, error, reload } = usePublications();
  const location = useLocation();
  useEffect(() => { reload(); }, [location.key, reload]);

  if (loading || !data) return <LoadingSpinnerFallback />;
  if (error) return <div className="prose"><p>Failed to load publications.</p></div>;

  return (
    <ItemList
      title={AppRoutes.PUBLICATIONS.title}
      items={data as unknown as Item[]}
      countLabel="publications"
      listAriaLabel="Publications list"
      paginationAriaLabel="Publications pagination"
      getItemHref={(p) => `${AppRoutes.PUBLICATIONS.path}/${p.pid}`}
    />
  );
}

