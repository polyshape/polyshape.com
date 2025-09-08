import { useTheme } from "./useTheme";
import Tooltip from "../tooltip/Tooltip";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const label = isLight ? "Switch to dark theme" : "Switch to light theme";

  return (
    <Tooltip label={label}>
      <button
        className="theme-toggle"
        onClick={() => setTheme(isLight ? "dark" : "light")}
        aria-label={label}
        type="button"
      >
        {isLight ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4L19 19M5 19l-1.4 1.4M20.4 3.6L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        )}
      </button>
    </Tooltip>
  );
}
