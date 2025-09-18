import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ToastHost from "../../../src/lib/common/ui/ToastHost";
import { LoadingProvider, ThemeProvider } from "@polyutils/components";

export function renderWithRouterAndLoadingProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LoadingProvider>{ui}</LoadingProvider>
      </ThemeProvider>
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