import { useContext } from "react";
import { TooltipConfigContext } from "./TooltipContext";

export function useTooltip() {
  const ctx = useContext(TooltipConfigContext);
  if (!ctx) throw new Error("useTooltipConfig must be used within TooltipProvider");
  return ctx;
}

