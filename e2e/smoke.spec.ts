import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

test("home page renders the name and has no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(site.role);
  expect(errors).toEqual([]);
});
