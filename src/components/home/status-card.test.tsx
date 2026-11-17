import { cleanup, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { StatusCard } from "./status-card";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("StatusCard", () => {
  it("shows the name, availability, current build and stack", () => {
    render(<StatusCard />);

    expect(screen.getByText(site.name)).toBeInTheDocument();
    expect(screen.getByText(site.statusCard.availability)).toBeInTheDocument();
    expect(screen.getByText(site.statusCard.building)).toBeInTheDocument();
    expect(screen.getByText(site.statusCard.buildingLabel)).toBeInTheDocument();
    for (const item of site.statusCard.stack) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("shows a live clock in the configured timezone", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15T06:30:00Z"));

    render(<StatusCard />);

    // 06:30 UTC is 12:30 in Dhaka (UTC+6).
    expect(screen.getByText("12:30")).toBeInTheDocument();
    expect(screen.getByText(site.statusCard.timezoneLabel)).toBeInTheDocument();
  });

  it("renders without a clock value on the server", () => {
    const html = renderToStaticMarkup(<StatusCard />);

    expect(html).toContain(site.name);
    expect(html).toContain('<span class="status-card__time"></span>');
  });
});
