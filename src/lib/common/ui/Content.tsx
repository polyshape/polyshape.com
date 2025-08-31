// Content.tsx
import type { ReactNode } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useTheme } from "./theme/useTheme";

export default function Content({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <OverlayScrollbarsComponent
      className="content"
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
