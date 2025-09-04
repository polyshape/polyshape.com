import { createContext } from "react";

export type LoadingState = "loading" | null;

export interface LoadingContextValue {
  state: LoadingState;
  setLoadingState: (state: LoadingState) => void;
}

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);
