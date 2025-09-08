import { createContext } from "react";

export type TooltipConfig = {
  openDelay: number;
  closeDelay: number;
  offset: number;
};

export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
  openDelay: 150,
  closeDelay: 100,
  offset: 8,
};

export const TooltipConfigContext = createContext<TooltipConfig>(DEFAULT_TOOLTIP_CONFIG);

