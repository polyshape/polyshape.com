import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div aria-labelledby="notfound-title" className="error__page">
      <i className="fa-solid fa-triangle-exclamation error__icon" aria-hidden="true"></i>
      <h1 id="notfound-title">Page not found</h1>
      <p style={{ marginBottom: "1rem", opacity: 0.9 }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="menu__item error__home-link" style={{ fontWeight: 600 }}>
        <i className="fa-solid fa-left-long" aria-hidden="true"></i>
        <span>Go back home</span>
      </Link>
    </div>
  );
}
