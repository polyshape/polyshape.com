import { render } from "@testing-library/react";
import { LoadingProvider } from "../../../src/lib/common/ui/spinner/LoadingProvider";

export function renderWithProviders(ui: React.ReactElement) {
  return render(<LoadingProvider>{ui}</LoadingProvider>);
}
