import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Resume } from "./Resume";
import { resumeContent as c } from "@/content/resume";
import { site } from "@/content/site";

afterEach(() => {
  cleanup();
});

it("renders identity, actions and every CV section", () => {
  render(<Resume />);
  expect(screen.getByRole("heading", { level: 1, name: c.name })).toBeInTheDocument();
  for (const section of c.sections)
    expect(screen.getByRole("heading", { level: 2, name: section.title })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
  expect(screen.getByRole("link", { name: c.download.label })).toHaveAttribute("href", c.download.href);
  expect(screen.getByRole("button", { name: c.print })).toBeInTheDocument();
});

it("keeps private details out of the public CV", () => {
  const text = JSON.stringify(c);
  for (const secret of ["252-15-834", "2007", "1629", "1988", "diu.edu.bd", "graphics.com.bd", "Savar"])
    expect(text).not.toContain(secret);
});
