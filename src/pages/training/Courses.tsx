import { LoadingSpinnerFallback } from "@polyutils/components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../../lib/common/AppRoutes";
import ItemList, { type Item } from "../../lib/common/ui/ItemList";
import { useCourses } from "../../lib/courses";

export default function Courses() {
  const { data, loading, error, reload } = useCourses();
  const location = useLocation();
  useEffect(() => {
    reload();
  }, [location.key, reload]);

  if (loading || !data) return <LoadingSpinnerFallback />;
  if (error)
    return (
      <div className="prose">
        <p>Failed to load courses.</p>
      </div>
    );

  return (
    <ItemList
      title={AppRoutes.COURSES.title}
      items={data as unknown as Item[]}
      countLabel="courses"
      listAriaLabel="Course list"
      paginationAriaLabel="Courses pagination"
      getItemHref={(p) => `${AppRoutes.COURSES.path}/${p.pid}`}
    />
  );
}
