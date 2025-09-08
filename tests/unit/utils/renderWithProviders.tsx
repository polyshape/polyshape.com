import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../../src/lib/common/ui/spinner/LoadingProvider";
import { ThemeProvider } from "../../../src/lib/common/ui/theme/ThemeProvider";
import ToastHost from "../../../src/lib/common/ui/ToastHost";

export function renderWithRouterAndLoadingProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <LoadingProvider>{ui}</LoadingProvider>
    </MemoryRouter>
  );
}

export function renderWithRouterAndThemeProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>
  );
}

export function renderWithLoadingProvider(ui: React.ReactElement) {
  return render(<LoadingProvider>{ui}</LoadingProvider>);
}

export function renderWithToastProvider(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <LoadingProvider>
        {ui}
        <ToastHost />
      </LoadingProvider>
    </ThemeProvider>
  );
}