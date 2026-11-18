import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Footer } from "./footer";
import { footerGroups, shell, site } from "@/content/site";

afterEach(() => cleanup());

it("groups footer destinations under clear headings", async () => {
  render(await Footer());

  const nav = screen.getByRole("navigation", { name: shell.footerNavigation });
  for (const group of footerGroups) {
    const heading = within(nav).getByRole("heading", { name: group.label });
    const list = within(heading.parentElement!).getByRole("list");
    for (const link of group.links) {
      expect(within(list).getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  }
});

it("keeps the contact details and social links", async () => {
  render(await Footer());

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(shell.footerTitle);
  expect(screen.getByRole("link", { name: site.email })).toHaveAttribute("href", shell.email.href);
  for (const social of site.socials) {
    expect(screen.getByRole("link", { name: social.label })).toHaveAttribute("href", social.href);
  }
});
