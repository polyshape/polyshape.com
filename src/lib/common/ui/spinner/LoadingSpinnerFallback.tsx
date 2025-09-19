import { useEffect } from "react";
import { useLoading } from "./useLoading";

export function LoadingSpinnerFallback() {
  const { setLoadingState } = useLoading();
  useEffect(() => {
    setLoadingState("loading");
    return () => setLoadingState(null);
  }, [setLoadingState]);
  return null;
}
