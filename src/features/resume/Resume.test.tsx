import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Resume } from "./Resume";
import { resumeContent as c } from "@/content/resume";
import { site } from "@/content/site";
it("renders identity and every CV section", () => {
  render(<Resume />);
  expect(
    screen.getByRole("heading", { level: 1, name: site.fullName }),
  ).toBeInTheDocument();
  for (const name of [
    c.summaryTitle,
    c.experienceTitle,
    c.projectsTitle,
    c.educationTitle,
    c.skillsTitle,
    c.languagesTitle,
    c.achievementsTitle,
  ])
    expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
    "href",
    `mailto:${site.email}`,
  );
});
