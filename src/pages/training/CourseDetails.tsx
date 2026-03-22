import { LoadingSpinnerFallback } from "@polyutils/components";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AppRoutes } from "../../lib/common/AppRoutes";
import { parseMarkdown } from "../../lib/common/parseMarkdown";
import { useCourses, type Course } from "../../lib/courses";

function formatDate(p: Course) {
  const iso = p.date;
  const d = new Date(/^\d{4}-\d{2}$/.test(iso) ? `${iso}-01` : iso);
  const hasDay = /\d{4}-\d{2}-\d{2}/.test(iso);
  const month = d.toLocaleString(undefined, { month: "long" });
  const year = d.getFullYear();
  if (hasDay) return `${d.getDate()} ${month} ${year}`;
  return `${month} ${year}`;
}

export default function CourseDetails() {
  const { pid } = useParams();
  const { data, loading, error, reload } = useCourses();
  useEffect(() => {
    reload();
  }, [reload]);

  const course = useMemo(
    () => (data && pid ? data.find((p) => p.pid === pid) : undefined),
    [data, pid],
  );

  if (loading || !data) return <LoadingSpinnerFallback />;
  if (error)
    return (
      <div className="prose">
        <p>Failed to load course.</p>
      </div>
    );
  if (!course) {
    return (
      <div className="prose">
        <h1 className="hero__title">Course</h1>
        <p>Course not found.</p>
        <p>
          <Link to={AppRoutes.COURSES.path}>Back to courses</Link>
        </p>
      </div>
    );
  }

  const c = course.content;
  const blocks = Array.isArray(c) ? c : [String(c)];
  const partner = course.partner?.url ? (
    <a href={course.partner.url} target="_blank" rel="noreferrer">
      {course.partner.name}
    </a>
  ) : (
    course.partner?.name
  );

  return (
    <div className="prose">
      <h1 className="hero__title">{parseMarkdown(course.title)}</h1>
      <p className="list__meta">
        <time dateTime={course.date}>{formatDate(course)}</time>
        {partner ? " — " : ""}
        {partner}
      </p>
      {blocks.map((t, i) => (
        <p key={i}>{parseMarkdown(t)}</p>
      ))}
    </div>
  );
}
