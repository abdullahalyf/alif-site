import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { Footer } from "./footer";
import { shell, site } from "@/content/site";

afterEach(() => cleanup());

it("shows a links column with the quieter pages", async () => {
  render(await Footer());

  const nav = screen.getByRole("navigation", { name: shell.footerLinksLabel });
  for (const link of shell.footerLinks) {
    expect(within(nav).getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
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
