import type { ReactNode } from "react";
import { TooltipConfigContext, DEFAULT_TOOLTIP_CONFIG, type TooltipConfig } from "./TooltipContext";

export function TooltipProvider({ children, config }: { children: ReactNode; config?: Partial<TooltipConfig> }) {
  const value: TooltipConfig = { ...DEFAULT_TOOLTIP_CONFIG, ...(config ?? {}) };
  return <TooltipConfigContext.Provider value={value}>{children}</TooltipConfigContext.Provider>;
}
