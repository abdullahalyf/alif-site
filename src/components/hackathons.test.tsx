import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hackathons } from "./hackathons";

describe("Hackathons", () => {
  it("renders nothing while the list is empty", () => {
    const { container } = render(<Hackathons items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each hackathon with its links", () => {
    const { getByText } = render(<Hackathons items={[{ name: "Test Hack", role: "Builder", result: "Finalist", github: "https://github.com/abdullahalyf/x" }]} />);
    expect(getByText("Test Hack")).toBeInTheDocument();
    expect(getByText("GitHub")).toHaveAttribute("href", "https://github.com/abdullahalyf/x");
  });
});
