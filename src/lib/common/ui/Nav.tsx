import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./theme/ThemeToggle";
import { AppRoutes } from "../AppRoutes";
import { useState } from "react";

const navItems = Object.values(AppRoutes).filter(route => route.isParent);

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link className="brand" to={AppRoutes.HOME.path}>
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img src="/logo.png" alt={AppRoutes.HOME.title} className="brand__logo" />
          </picture>
        </Link>
        <ThemeToggle/>

        <button
          className="burger--menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="burger--icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" width="32" height="3" rx="1.5" fill="currentColor" />
              <rect y="14" width="32" height="3" rx="1.5" fill="currentColor" />
              <rect y="21" width="32" height="3" rx="1.5" fill="currentColor" />
            </svg>
          </span>
        </button>

        <nav className={`menu${menuOpen ? " menu--open" : ""}`}>
          {navItems.map(route =>
            route.children.length ? (
              <div className="menu__group" key={route.id}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `menu__item${isActive ? " menu__item--active" : ""}`
                  }
                  onClick={e => e.preventDefault()}
                >
                  {route.title}
                </NavLink>
                <span className="menu__chevron" aria-hidden>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="submenu">
                  {route.children.map(childKey => {
                    const childRoute = AppRoutes[childKey];
                    return (
                      <NavLink
                        key={childRoute.id}
                        to={childRoute.path}
                        className="submenu__item"
                      >
                        {childRoute.title}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ) : (
              <NavLink
                key={route.id}
                to={route.path}
                end={route.path === AppRoutes.HOME.path}
                className={({ isActive }) =>
                  `menu__item${isActive ? " menu__item--active" : ""}`
                }
              >
                {route.title}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
