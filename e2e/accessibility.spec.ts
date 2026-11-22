import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pageRoutes, previewRoutes } from "./helpers/routes";

for (const [mode, routes] of [["production", pageRoutes], ["preview", previewRoutes]] as const) {
 test.describe(`${mode} accessibility`, () => {
  if (mode === "preview") test.use({ baseURL: "http://localhost:3100" });
  for (const path of routes) {
  test(`no serious or critical accessibility violations on ${path}`, async ({ page }, testInfo) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);

    for (const theme of ["dark", "light"]) {
      await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
      const results = await new AxeBuilder({ page }).setLegacyMode().analyze();
      await testInfo.attach(`axe-${theme}`, {
        body: JSON.stringify({ violations: results.violations }, null, 2),
        contentType: "application/json",
      });

      const violations = results.violations
        .filter(({ impact }) => impact === "serious" || impact === "critical")
        .map(({ id, impact, help, helpUrl, nodes }) => ({
          id, impact, help, helpUrl,
          nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
        }));
      expect.soft(violations, `Accessibility violations on ${path} in ${theme}`).toEqual([]);
    }
  });
}

 });
}
