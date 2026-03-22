import { vi } from "vitest";
import { AppRoutes } from "../../src/lib/common/AppRoutes";
import Courses from "../../src/pages/training/Courses";
import { renderWithRouterAndLoadingProviders } from "./utils/renderWithProviders";

vi.mock("../../src/lib/courses", () => import("./__mocks__/courses"));

describe("Courses page", () => {
  it("renders the main title", () => {
    const { getByText } = renderWithRouterAndLoadingProviders(<Courses />);
    expect(getByText(AppRoutes.COURSES.title)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = renderWithRouterAndLoadingProviders(<Courses />);
    expect(container.querySelector(".prose")).toBeInTheDocument();
    expect(container.querySelector(".hero__title")).toBeInTheDocument();
  });
});
