import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../../src/lib/common/ui/spinner/LoadingProvider";

export function renderWithRouterAndLoadingProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <LoadingProvider>{ui}</LoadingProvider>
    </MemoryRouter>
  );
}

export function renderWithLoadingProvider(ui: React.ReactElement) {
  return render(<LoadingProvider>{ui}</LoadingProvider>);
}