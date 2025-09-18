import { Nav, ThemeToggle, type NavItem } from "@polyutils/components";
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";

function generateNavItems() {
  const routes = Object.values(AppRoutes).filter(route => route.isParent && route.shouldBeDisplayed);
  const navItems: NavItem[] = routes.map(route => {
    let children: NavItem[] | undefined = undefined;
    if (route.children.length > 0 && route.children.filter(child => AppRoutes[child].shouldBeDisplayed).length) {
      children = route.children.filter(child => AppRoutes[child].shouldBeDisplayed).map(childKey => {
        const childRoute = AppRoutes[childKey];
        return {
          id: childRoute.id,
          label: childRoute.title,
          to: childRoute.path,
        };
      });
    }
    return {
      id: route.id,
      label: route.title,
      to: route.path,
      end: route.path === AppRoutes.HOME.path,
      onClick: children ? (e) => { e.preventDefault(); } : undefined,
      items: children
    };
  });
  navItems.push({
    id: "github",
    label: "GitHub",
    href: "https://github.com/polyshape",
    onClick: (e) => {
      e.preventDefault();
      window.open("https://github.com/polyshape", "_blank");
    }
  });
  navItems.push({
    id: "github2",
    label: "GitHub2",
    href: "https://github.com/polyshape",
    onClick: (e) => {
      e.preventDefault();
      window.open("https://github.com/polyshape", "_blank");
    }
  });
  return navItems;
}

export default function Navigation() {
    return (
      <div className="nav">
        <div className="nav__inner">
          <Link className="brand" to={AppRoutes.HOME.path}>
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" alt={AppRoutes.HOME.title} className="brand__logo" />
            </picture>
          </Link>
          <ThemeToggle className="theme-toggle" />
          <Nav
            items={generateNavItems()}
            as={NavLink}
            showBorder={false}
            styles={{
              root: {flex: "1 1 auto", minWidth: 0},
              menu: { gap: "1.7rem" },
              subMenu: {backgroundColor: "var(--pc-nav-bg)", minWidth: "200px"},
              bar: {width: "100%", paddingTop: "8px", paddingRight: "0px"},
              link: {color: "var(--pc-fg)", fontSize: "1.2rem", fontWeight: 600},
              subLink: {fontWeight: 700, padding: ".7rem .9rem"},
            }}/>
        </div>
      </div>
    );
}