import type { ReactNode } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useTheme } from "./theme/useTheme";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";

export default function Content({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === AppRoutes.HOME.path;

  return (
    <OverlayScrollbarsComponent
      className={isHome ? "content content-main" : "content"}
      options={{
        scrollbars: {
          autoHide: "never",
          theme: theme === "dark" ? "os-theme-dark" : "os-theme-light"
        }
      }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
