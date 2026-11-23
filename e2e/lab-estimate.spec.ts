import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { accessContent as access, labContent, labRoutes, syncContent as sync } from "../src/content/lab";
import { estimateContent as estimate } from "../src/content/estimate";
import { site } from "../src/content/site";

async function checkActiveAccessibility(page: Page) {
  const results = await new AxeBuilder({ page }).setLegacyMode().analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical").map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }))).toEqual([]);
}

test("Lab index links to both working demos and the estimator", async ({ page }) => {
  await page.goto(labContent.path);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(labContent.title);
  for (const demo of labContent.demos) await expect(page.getByRole("article").filter({ has: page.getByRole("heading", { name: demo.title }) }).getByRole("link", { name: labContent.tryDemo })).toHaveAttribute("href", demo.path);
  await page.getByRole("link", { name: labContent.estimateLink }).click();
  await expect(page).toHaveURL(estimate.path);
});

test("offline sales sync once on reconnect and duplicate delivery leaves totals unchanged", async ({ page }) => {
  await page.goto(sync.path);
  const terminal = page.getByRole("region", { name: sync.branches[0].name, exact: true });
  const dashboard = page.locator('[data-dashboard-branch="dhaka"]');
  await terminal.getByRole("button", { name: sync.disconnect, exact: true }).click();
  for (let index = 0; index < 3; index++) await terminal.getByRole("button", { name: `${sync.createSale} · ${sync.money(sync.saleAmount)}`, exact: true }).click();
  for (let sequence = 117; sequence <= 119; sequence++) await expect(terminal.getByText(`DHK-02-${String(sequence).padStart(6, "0")}`, { exact: true })).toBeVisible();
  await expect(dashboard.getByText(sync.salesCount(0), { exact: true })).toBeVisible();
  await terminal.getByRole("button", { name: sync.reconnect, exact: true }).click();
  await expect(dashboard.getByText(sync.salesCount(3), { exact: true })).toBeVisible({ timeout: 15000 });
  await expect(dashboard.getByText(sync.money(sync.saleAmount * 3), { exact: true })).toBeVisible();
  await expect(terminal.getByText(sync.noPending)).toBeVisible();
  await page.getByRole("button", { name: sync.doubleSend, exact: true }).click();
  await expect(page.getByText(sync.duplicateCount(1), { exact: true })).toBeVisible();
  await expect(dashboard.getByText(sync.salesCount(3), { exact: true })).toBeVisible();
  await expect(page.getByRole("log")).toContainText("Duplicate DHK-02-000119 ignored");
  await checkActiveAccessibility(page);
  await page.getByRole("button", { name: sync.reset, exact: true }).click();
  await expect(dashboard.getByText(sync.salesCount(0), { exact: true })).toBeVisible();
});

test("access explorer explains ownership and branch denials and read-only audit access", async ({ page }) => {
  await page.goto(access.path);
  await page.getByRole("radio", { name: access.roles.cashier, exact: true }).check();
  const decision = page.getByRole("status");
  await expect(decision).toContainText(access.rules["own-sale"].text);
  await page.getByLabel(access.ownerLabel, { exact: true }).selectOption("other");
  await expect(decision).toContainText(access.rules["cashier-owner-denied"].text);
  await page.getByLabel(access.ownerLabel, { exact: true }).selectOption("me");
  await page.getByLabel(access.branchLabel, { exact: true }).selectOption("other");
  await expect(decision).toContainText(access.rules["branch-denied"].text);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("radio", { name: access.roles.auditor, exact: true }).check();
  await expect(decision).toContainText(access.rules["role-denied"].text);
  await page.getByLabel(access.actionLabel, { exact: true }).selectOption("view-report");
  await expect(decision).toContainText(access.rules["audit-read"].text);
  await expect(page.locator('td[data-allowed="true"]')).toHaveCount(6);
  await checkActiveAccessibility(page);
});

test("estimator updates live, validates counts, and encodes complete contact summaries", async ({ page }) => {
  await page.goto(estimate.path);
  const beforePrice = await page.locator("[data-estimate-price]").textContent();
  const beforeTimeline = await page.locator("[data-estimate-timeline]").textContent();
  await page.getByLabel(estimate.fields.branches, { exact: true }).fill("8");
  await page.getByLabel(estimate.fields.roles, { exact: true }).fill("6");
  await page.getByLabel(estimate.fields.offline, { exact: true }).check();
  await page.getByLabel(estimate.integrationLabels.payments, { exact: true }).check();
  await page.getByLabel(estimate.integrationLabels.accounting, { exact: true }).check();
  await page.getByLabel(estimate.fields.migration, { exact: true }).check();
  await page.getByLabel(estimate.fields.urgency, { exact: true }).selectOption("urgent");
  await expect(page.locator("[data-estimate-price]")).not.toHaveText(beforePrice!);
  await expect(page.locator("[data-estimate-timeline]")).not.toHaveText(beforeTimeline!);
  await expect(page.getByText(estimate.demoNotice, { exact: true }).first()).toBeVisible();
  const email = new URL((await page.getByRole("link", { name: estimate.emailLink }).getAttribute("href"))!);
  const whatsapp = new URL((await page.getByRole("link", { name: estimate.whatsappLink }).getAttribute("href"))!);
  expect(email.protocol).toBe("mailto:"); expect(email.pathname).toBe(site.email);
  for (const body of [email.searchParams.get("body"), whatsapp.searchParams.get("text")]) {
    expect(body).toContain(`${estimate.summaryLabels.branches}: 8`);
    expect(body).toContain(`${estimate.summaryLabels.roles}: 6`);
    expect(body).toContain(`${estimate.summaryLabels.offline}: ${estimate.yes}`);
    expect(body).toContain(estimate.demoNotice);
  }
  await page.getByLabel(estimate.fields.branches, { exact: true }).fill("101");
  await expect(page.getByLabel(estimate.fields.branches, { exact: true })).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator(".estimate-workspace").getByRole("alert")).toHaveText(estimate.invalid);
  await expect(page.getByRole("link", { name: estimate.emailLink })).toHaveCount(0);
  await page.getByLabel(estimate.fields.branches, { exact: true }).fill("8");
  await checkActiveAccessibility(page);
});

test("reduced motion jumps packets and removes estimator bar transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(sync.path);
  const terminal = page.getByRole("region", { name: sync.branches[0].name, exact: true });
  await terminal.getByRole("button", { name: sync.disconnect, exact: true }).click();
  await terminal.getByRole("button", { name: `${sync.createSale} · ${sync.money(sync.saleAmount)}`, exact: true }).click();
  await terminal.getByRole("button", { name: sync.reconnect, exact: true }).click();
  await expect(page.locator("animateMotion")).toHaveCount(0);
  await expect(page.locator('[data-dashboard-branch="dhaka"]')).toContainText(sync.salesCount(1));
  await page.goto(estimate.path);
  await expect(page.locator('.estimate-phase-bar [data-phase="build"]')).toHaveCSS("transition-duration", "0s");
});

test("no-JS demos retain the starting diagram, matrix and usable estimate links", async ({ browser, isMobile }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: isMobile ? { width: 393, height: 851 } : { width: 1280, height: 720 } });
  const page = await context.newPage();
  for (const path of [...labRoutes, estimate.path]) {
    expect((await page.goto(path))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.locator("[data-estimate-timeline]")).toBeVisible();
  await expect(page.getByRole("link", { name: estimate.emailLink })).toHaveAttribute("href", /^mailto:/);
  await page.goto(access.path); await expect(page.getByRole("table")).toBeVisible();
  await page.goto(sync.path); await expect(page.locator(".sync-diagram svg")).toBeVisible();
  await context.close();
});
