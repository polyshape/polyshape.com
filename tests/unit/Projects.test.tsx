import { vi } from "vitest";
import Projects from "../../src/pages/portfolio/Projects";
import { AppRoutes } from "../../src/lib/common/AppRoutes";
import { renderWithRouterAndLoadingProviders } from "./utils/renderWithProviders";

vi.mock("../../src/lib/projects", () => import("./__mocks__/projects"));

describe("Projects page", () => {
  it("renders the main title", () => {
    const { getByText } = renderWithRouterAndLoadingProviders(<Projects />);
    expect(getByText(AppRoutes.PROJECTS.title)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = renderWithRouterAndLoadingProviders(<Projects />);
    expect(container.querySelector(".prose")).toBeInTheDocument();
    expect(container.querySelector(".hero__title")).toBeInTheDocument();
  });
});
