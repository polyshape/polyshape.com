import { Link, NavLink } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import ThemeToggle from "./theme/ThemeToggle";
import { AppRoutes } from "../AppRoutes";
import { useEffect, useRef, useState } from "react";
import { useTheme } from './theme/useTheme';

const navItems = Object.values(AppRoutes).filter(route => route.isParent);

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { theme } = useTheme();
  const burgerBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Close menu helper to centralize focus restoration
  const closeMenu = (restoreFocus = true) => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    if (restoreFocus) {
      // Move focus back to the control that opened the menu
      burgerBtnRef.current?.focus();
    }
  };

  // Toggle `inert` on the overlay when hidden so its descendants can't retain focus
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (!menuOpen) {
      el.setAttribute("inert", "");
    } else {
      el.removeAttribute("inert");
    }
  }, [menuOpen]);

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
          ref={burgerBtnRef}
          onClick={() => {
            setMenuOpen(open => !open);
            setOpenSubmenu(null);
          }}
        >
          <span className="burger--icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" width="32" height="3" rx="1.5" fill="currentColor" />
              <rect y="14" width="32" height="3" rx="1.5" fill="currentColor" />
              <rect y="21" width="32" height="3" rx="1.5" fill="currentColor" />
            </svg>
          </span>
        </button>

        {/* Overlay menu always rendered, but only visible below 830px via CSS */}
        <div
          aria-hidden={!menuOpen}
          className={`nav__overlay${menuOpen ? " nav__overlay--open" : ""}`}
          ref={overlayRef}
          onKeyDown={(e) => {
            if (e.key === "Escape" && menuOpen) {
              e.stopPropagation();
              closeMenu();
            }
          }}
        >
            <>
              <OverlayScrollbarsComponent
                options={{
                  scrollbars: {
                    autoHide: "never",
                    theme: theme === "dark" ? "os-theme-dark" : "os-theme-light"
                  }
                }}
              >
                <nav className="menu menu--overlay">
                  {navItems.map(route =>
                    route.children.length && route.children.filter(child => AppRoutes[child].shouldBeDisplayed).length ? (
                      <div className="menu__group" key={route.id}>
                        <NavLink
                          to={route.path}
                          className={({ isActive }) =>
                            `menu__item menu__item--overlay${isActive ? ' menu__item--active' : ''}`
                          }
                          style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
                          onClick={e => {
                            e.preventDefault();
                            setOpenSubmenu(openSubmenu === route.id ? null : route.id);
                          }}
                        >
                          <span>{route.title}</span>
                          <span className="menu__neutral-icon" aria-hidden>
                            {openSubmenu === route.id ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                        </NavLink>
                        {openSubmenu === route.id && route.children.length > 0 && route.children.filter(child => AppRoutes[child].shouldBeDisplayed).length > 0 && (
                          <>
                            {route.children.map(childKey => {
                              const childRoute = AppRoutes[childKey];
                              if (childRoute.shouldBeDisplayed === false) {
                                return null;
                              }
                              return (
                                <NavLink
                                  key={childRoute.id}
                                  to={childRoute.path}
                                  className="submenu__item submenu__item--small submenu__item--overlay"
                                  onClick={() => closeMenu()}
                                >
                                  {childRoute.title}
                                </NavLink>
                              );
                            })}
                          </>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        key={route.id}
                        to={route.path}
                        end={route.path === AppRoutes.HOME.path}
                        className={({ isActive }) =>
                          `menu__item menu__item--overlay${isActive ? ' menu__item--active' : ''}`
                        }
                        onClick={() => closeMenu()}
                      >
                        {route.title}
                      </NavLink>
                    )
                  )}
                </nav>
              </OverlayScrollbarsComponent>
              <button className="nav__overlay--close" aria-label="Close menu" onClick={() => closeMenu()}>
                &times;
              </button>
            </>
        </div>

        <nav className="menu">
          {navItems.map(route =>
            route.children.length && route.children.filter(child => AppRoutes[child].shouldBeDisplayed).length ? (
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
                    if (childRoute.shouldBeDisplayed === false) {
                      return null;
                    }
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
