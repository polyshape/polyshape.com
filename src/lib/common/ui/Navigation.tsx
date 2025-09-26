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
  return navItems;
}

export default function Navigation() {
  return (
      <Nav
          className="nav"
          items={generateNavItems()}
          as={NavLink}
          linkProp="to"
          showBorder={false}
          styles={{
            itemsWrapper: {paddingBottom: 4},
            root: {borderBottom: "1px solid var(--border)", padding: "5px 0"},
            menu: {gap: "2.5rem"},
            subMenu: {backgroundColor: "var(--pc-nav-bg)", minWidth: "200px"},
            bar: {paddingTop: "8px", paddingRight: "0px", paddingBottom: "10px", justifyContent: "center"},
            link: {color: "var(--pc-fg)", fontSize: "1.2rem", fontWeight: 600},
            subLink: {fontWeight: 700, padding: ".7rem .9rem"},
            burgerButton: {top: "6px"}
          }}
          customLeft={
            <div className="nav__items-left">
              <Link className="brand" to={AppRoutes.HOME.path}>
                <picture>
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img src="/logo.png" alt={AppRoutes.HOME.title} className="brand__logo" />
                </picture>
              </Link>
              <ThemeToggle className="theme-toggle" />
            </div>
          }
        />
    );
}