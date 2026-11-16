import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "@/lib/test-match-media";
import { SystemDiagram } from "./system-diagram";

afterEach(() => {
  cleanup();
});

const steps = ["POS", "Sync", "Cloud DB", "Dashboard"];

describe("SystemDiagram", () => {
  it("labels every step", () => {
    mockMatchMedia(false);
    render(<SystemDiagram steps={steps} label="How the system fits together" />);

    for (const step of steps) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
  });

  it("exposes an accessible label", () => {
    mockMatchMedia(false);
    render(<SystemDiagram steps={steps} label="How the system fits together" />);

    expect(screen.getByRole("img", { name: "How the system fits together" })).toBeInTheDocument();
  });

  it("draws a travelling dot for each connection", () => {
    mockMatchMedia(false);
    const { container } = render(<SystemDiagram steps={steps} label="Diagram" />);

    expect(container.querySelectorAll("circle[data-travel]")).toHaveLength(steps.length - 1);
  });

  it("renders the diagram on the server, without inline motion styles", () => {
    mockMatchMedia(false);
    const html = renderToStaticMarkup(<SystemDiagram steps={steps} label="Diagram" />);

    expect(html).toContain("POS");
    expect(html).toContain("Dashboard");
    expect(html).not.toContain("opacity: 0");
  });
});
