import { render } from "@testing-library/react";
import { AppRoutes } from "../../src/lib/common/AppRoutes";
import Workshops from "../../src/pages/training/Workshops";

describe("Workshops page", () => {
  it("renders the main title", () => {
    const { getByText } = render(<Workshops />);
    expect(getByText(AppRoutes.WORKSHOPS.title)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<Workshops />);
    expect(container.querySelector(".prose")).toBeInTheDocument();
    expect(container.querySelector(".hero__title")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { container } = render(<Workshops />);
    expect(container).toMatchSnapshot();
  });
});
