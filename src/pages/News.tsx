import { AppRoutes } from "../lib/common/AppRoutes";

export default function News() {
  return (
    <div className="prose">
      <h1 className="hero__title">{AppRoutes.NEWS.title}</h1>
      <p>
        Coming Soon.
      </p>
    </div>
  );
}

