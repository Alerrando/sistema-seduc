import { render } from "@testing-library/react";
import Aside from "./index";

describe("Aside component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Aside />);

    expect(getByText("Dashboard")).toBeInTheDocument();
  });
});
