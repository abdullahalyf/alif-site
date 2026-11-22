import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Resume } from "./Resume";
import { resumeContent as c } from "@/content/resume";
import { site } from "@/content/site";
import { mockMatchMedia } from "@/lib/test-match-media";

afterEach(() => {
  cleanup();
});

it("renders identity and every CV section", () => {
  // The entrance animations read the motion preference, and GSAP's
  // ScrollTrigger needs `matchMedia`, which jsdom does not implement.
  mockMatchMedia(false);
  render(<Resume id="cv" />);
  expect(
    screen.getByRole("heading", { level: 2, name: site.fullName }),
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
    expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
    "href",
    `mailto:${site.email}`,
  );
});
