import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { contactContent as c } from "../src/content/contact";
import { site, shell } from "../src/content/site";
import { searchContent as search } from "../src/content/search";
import { diagrams } from "../src/content/diagrams";
test("contact validates inline errors and prepares both external destinations", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = ((url: string | URL | undefined) => {
      (window as unknown as { briefDestination: string }).briefDestination =
        String(url);
      return null;
    }) as typeof window.open;
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: c.emailButton }).click();
  await expect(page.locator(".brief-form").getByRole("alert")).toBeVisible();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await page.getByLabel("Name", { exact: true }).fill("Test & Partner");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Project type").selectOption("Business software");
  await page.getByLabel("Budget range").selectOption("Not sure yet");
  await page.getByLabel("Timeline").selectOption("Flexible");
  await page
    .getByLabel("Message", { exact: true })
    .fill("A business workflow that must keep working offline.");
  await page.getByRole("button", { name: c.emailButton }).click();
  const email = new URL(
    (await page.getByRole("link", { name: c.ready }).getAttribute("href"))!,
  );
  expect(email.protocol).toBe("mailto:");
  expect(email.pathname).toBe(site.email);
  expect(email.searchParams.get("body")).toContain("Test & Partner");
  await page.getByRole("button", { name: c.whatsappButton }).click();
  const whatsapp = new URL(
    (await page.getByRole("link", { name: c.ready }).getAttribute("href"))!,
  );
  expect(whatsapp.hostname).toBe("wa.me");
  expect(whatsapp.searchParams.get("text")).toContain("working offline");
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { briefDestination: string }).briefDestination,
    ),
  ).toBe(whatsapp.href);
});
test("contact has a direct email fallback without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/contact");
  await expect(page.getByRole("link", { name: c.fallback })).toHaveAttribute(
    "href",
    `mailto:${site.email}`,
  );
  await context.close();
});
test("search supports shortcut, focus trap, arrow selection, escape and navigation", async ({
  page,
}) => {
  await page.goto("/search");
  const trigger = page.getByRole("button", { name: new RegExp(shell.searchLabel) }).first();
  await trigger.focus();
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const input = page.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill("multi-branch");
  await expect(dialog.getByRole("option").first()).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(input).toHaveAttribute("aria-activedescendant", /result-1$/);
  await page.keyboard.press("ArrowUp");
  const violations = (
    await new AxeBuilder({ page }).analyze()
  ).violations.filter(
    (item) => item.impact === "serious" || item.impact === "critical",
  );
  expect(violations).toEqual([]);
  await dialog.getByRole("option").last().focus();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: search.close }),
  ).toBeFocused();
  await input.focus();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Meta+k");
  await input.fill("Services");
  await expect(dialog.getByRole("option").first()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/services$/);
});

test("search opens from the keyboard and the header button on any page", async ({
  page,
}) => {
  for (const path of ["/", "/about", "/work", "/services", "/writing"]) {
    await page.goto(path);

    // Ctrl+K opens the dialog from anywhere, without touching the mouse.
    await page.keyboard.press("Control+k");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("combobox")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // The header button opens the same dialog.
    await page.getByRole("button", { name: new RegExp(shell.searchLabel) }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("combobox")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});

test("the /search route still works on its own", async ({ page }) => {
  await page.goto("/search");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(search.title);
  await page.getByRole("button", { name: new RegExp(shell.searchLabel) }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("combobox")).toBeFocused();
});
test("search index is public JSON without drafts", async ({ request }) => {
  const response = await request.get("/search-index.json");
  expect(response.status()).toBe(200);
  const entries = await response.json();
  expect(
    entries.some((entry: { href: string }) => entry.href === "/contact"),
  ).toBe(true);
  expect(
    entries.some(
      (entry: { href: string }) => entry.href === "/writing/hello-im-alif",
    ),
  ).toBe(false);
});
test("resume print styles hide navigation and footer", async ({ page }) => {
  await page.goto("/resume");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".header")).toBeHidden();
  await expect(page.locator(".footer")).toBeHidden();
  await expect(page.getByRole("button", { name: "Download PDF" })).toBeHidden();
  await expect(
    page.getByRole("heading", { name: site.fullName, exact: true }),
  ).toBeVisible();
});
test("diagram exposes its graph as an accessible image and text", async ({
  page,
}) => {
  await page.goto("/work/multi-branch-pos/architecture");
  const diagram = diagrams["multi-branch-pos"];
  await expect(
    page.getByRole("img", { name: new RegExp(diagram.title) }),
  ).toBeVisible();
  await expect(page.locator("figcaption")).toContainText(diagram.description);
  await expect(page.locator("figcaption")).toContainText("Retry-safe queue");
  await page.goto("/work/not-a-project/architecture");
  await expect(
    page.getByRole("heading", { name: "Page not found", exact: true }),
  ).toBeVisible();
});

test("new pages fit the viewport with a single main heading", async ({
  page,
}) => {
  for (const path of [
    "/services",
    "/contact",
    "/resume",
    "/uses",
    "/search",
    "/work/multi-branch-pos/architecture",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }
});
