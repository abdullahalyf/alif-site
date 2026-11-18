import { expect, test } from "@playwright/test";
import { footerGroups, shell } from "../src/content/site";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("alif-intro-seen", "1"));
});

test("the menu traps focus, includes every footer link, and forwards a search", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const trigger = page.getByRole("button", { name: shell.menu, exact: true });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: shell.menu });
  expect(await menu.evaluate(element => element.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
  for (const link of footerGroups.flatMap((group) => group.links)) {
    await expect(menu.getByRole("link", { name: link.label, exact: true })).toHaveAttribute("href", link.href);
  }

  const search = menu.getByRole("searchbox");
  await search.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(menu.getByRole("link", { name: shell.contact.label, exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(search).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await search.fill("about");
  await search.press("Enter");
  await expect(menu).toBeHidden();
  const results = page.getByRole("dialog", { name: shell.searchLabel });
  await expect(results.getByRole("combobox")).toHaveValue("about");
  await expect(results.getByRole("option", { name: /About me/ }).first()).toBeVisible();
});

test("the navbar expands when the visitor scrolls up mid-page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const header = page.getByRole("banner");
  const height = async () => Math.round((await header.boundingBox())!.height);
  const full = await height();

  await page.evaluate(() => scrollTo({ top: 420, behavior: "instant" }));
  await expect.poll(height).toBe(50);
  await page.evaluate(() => scrollTo({ top: 340, behavior: "instant" }));
  await expect.poll(height).toBe(full);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(100);
});

test("the hero card grows and docks into the first slot", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const strip = page.locator(".hero-photo-story__strip");
  const first = strip.locator("li").first();
  const float = page.locator(".hero-photo-story__floating");
  async function position(fraction: number) {
    await strip.evaluate((element, fraction) => scrollTo({
      top: scrollY + element.getBoundingClientRect().top - innerHeight * fraction,
      behavior: "instant",
    }), fraction);
  }
  await position(0.99);
  await expect(float).toHaveCSS("opacity", "1");
  await expect(first).toHaveCSS("opacity", "0");
  const start = (await float.boundingBox())!;
  await position(isMobile ? 0.77 : 0.62);
  await expect.poll(async () => (await float.boundingBox())!.width).toBeGreaterThan(start.width + 10);
  await position(0.45);
  await expect(first).toHaveCSS("opacity", "1");
  await expect(float).toHaveCSS("opacity", "0");
});

test("desktop wheel scrolls the hovered card row and releases the page at both ends", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop wheel and drag");
  await page.goto("/");
  const row = page.locator(".project-carousel");
  await row.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await row.hover();
  const offset = () => row.evaluate(element => element.scrollLeft);
  const pageOffset = () => page.evaluate(() => scrollY);
  const start = await pageOffset();
  await page.mouse.wheel(0, 170);
  await expect.poll(offset).toBeGreaterThan(100);
  expect(await pageOffset()).toBe(start);

  const box = (await row.boundingBox())!;
  const y = Math.max(100, box.y + 30);
  await page.mouse.move(box.x + 250, y);
  await page.mouse.down();
  await page.mouse.move(box.x + 110, y, { steps: 8 });
  await page.mouse.up();
  await expect.poll(offset).toBeGreaterThan(260);

  await row.evaluate(element => { element.scrollLeft = element.scrollWidth; });
  await page.mouse.wheel(0, 180);
  await expect.poll(pageOffset).toBeGreaterThan(start + 30);
  await row.hover();
  await row.evaluate(element => { element.scrollLeft = 0; });
  const beforeUp = await pageOffset();
  await page.mouse.wheel(0, -180);
  await expect.poll(pageOffset).toBeLessThan(beforeUp - 30);
});
