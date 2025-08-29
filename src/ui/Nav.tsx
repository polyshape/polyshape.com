import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link className="brand" to="/">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img src="/logo.png" alt="PolyShape" className="brand__logo" />
          </picture>
        </Link>

        <nav className="menu">
          <NavLink to="/" end className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`}>Home</NavLink>

          <div className="menu__group">
            <NavLink to="/mission" className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`} onClick={(e) => e.preventDefault()}>Mission</NavLink>
            <span className="menu__chevron" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="submenu">
              <NavLink to="/mission/mission-statement" className="submenu__item">Mission statement</NavLink>
              <NavLink to="/mission/why-polyshape" className="submenu__item">Why PolyShape</NavLink>
            </div>
          </div>

          <div className="menu__group">
            <NavLink to="/brand" className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`} onClick={(e) => e.preventDefault()}>Brand</NavLink>
            <span className="menu__chevron" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="submenu">
              <NavLink to="/brand/name" className="submenu__item">The name</NavLink>
              <NavLink to="/brand/logo" className="submenu__item">The logo</NavLink>
              <NavLink to="/brand/pitch-deck" className="submenu__item">Pitch deck</NavLink>
            </div>
          </div>

          <div className="menu__group">
            <NavLink to="/rnd" className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`} onClick={(e) => e.preventDefault()}>R&amp;D</NavLink>
            <span className="menu__chevron" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="submenu">
              <NavLink to="/rnd/software" className="submenu__item">Software</NavLink>
              <NavLink to="/rnd/patents" className="submenu__item">Patents</NavLink>
              <NavLink to="/rnd/publications" className="submenu__item">Publications</NavLink>
              <NavLink to="/rnd/dissemination" className="submenu__item">Dissemination</NavLink>
            </div>
          </div>
          <div className="menu__group">
            <NavLink to="/portfolio" className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`} onClick={(e) => e.preventDefault()}>Portfolio</NavLink>
            <span className="menu__chevron" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="submenu">
              <NavLink to="/portfolio/projects" className="submenu__item">Projects</NavLink>
              <NavLink to="/portfolio/partners" className="submenu__item">Partners</NavLink>
            </div>
          </div>
          <NavLink to="/news" className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`}>News</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `menu__item${isActive ? " menu__item--active" : ""}`}>Contact</NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
