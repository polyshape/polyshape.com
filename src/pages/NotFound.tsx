import {
  ArrowLeftIcon,
  WarningTriangleFilledIcon,
} from "@polyutils/components";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div aria-labelledby="notfound-title" className="error__page">
      <WarningTriangleFilledIcon
        style={{ fontSize: 80, color: "var(--pc-accent)" }}
      />
      <h1 id="notfound-title">Page not found</h1>
      <p style={{ marginBottom: "1rem", opacity: 0.9 }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="error__home-link" style={{ fontWeight: 600 }}>
        <ArrowLeftIcon style={{ fontSize: 40 }} weight={"bold"} />
        <span>Go back home</span>
      </Link>
    </div>
  );
}
