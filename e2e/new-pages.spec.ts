import { getPosts } from "../src/content/posts";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { contactContent as c } from "../src/content/contact";
import { site, shell, pageContent } from "../src/content/site";
import { searchContent as search } from "../src/content/search";
import { diagrams, diagramContent } from "../src/content/diagrams";
import { waitForHydration } from "./helpers/routes";
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
  await waitForHydration(page);
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
  await waitForHydration(page);
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
    await new AxeBuilder({ page }).setLegacyMode().analyze()
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
    // The shortcut is attached by a client component, so the page has to be
    // hydrated before the key can reach it.
    await waitForHydration(page);

    // Ctrl+K opens the dialog from anywhere, without touching the mouse.
    const dialog = page.getByRole("dialog", { name: search.open });
    const combobox = dialog.getByRole("combobox");
    await page.keyboard.press("Control+k");
    await expect(dialog).toBeVisible();
    await expect(combobox).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // The header button opens the same dialog.
    await page.getByRole("button", { name: new RegExp(shell.searchLabel) }).first().click();
    await expect(dialog).toBeVisible();
    await expect(combobox).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
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
  const hrefs = entries.map((entry: { href: string }) => entry.href);
  for (const post of getPosts({ includeDrafts: false })) {
    expect(hrefs).toContain(`/writing/${post.slug}`);
  }
  expect(
    entries.some((entry: { href: string }) => entry.href === "/contact"),
  ).toBe(true);
  expect(
    entries.some(
      (entry: { href: string }) => entry.href === "/writing/hello-im-alif",
    ),
  ).toBe(false);
});
test("resume redirects permanently to the printable CV", async ({ page, request }) => {
  const redirect = await request.get("/resume", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe("/contact#cv");
  await page.goto("/resume");
  await expect(page).toHaveURL(/\/contact#cv$/);
  const download = page.getByRole("link", { name: "Download CV (PDF)" });
  await expect(download).toHaveAttribute("download", "");
  const pdf = await request.get((await download.getAttribute("href"))!);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".header")).toBeHidden();
  await expect(page.locator(".footer")).toBeHidden();
  await expect(page.locator(".contact-details")).toBeHidden();
  await expect(page.getByRole("button", { name: "Print CV" })).toBeHidden();
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

test("a case study carries its system design diagram", async ({ page }) => {
  await page.goto("/work/multi-branch-pos");
  const diagram = diagrams["multi-branch-pos"];

  const section = page.locator(".case-section--diagram");
  await expect(section).toBeVisible();
  await expect(
    section.getByRole("heading", { name: pageContent.systemDesign }),
  ).toBeVisible();
  await expect(
    section.getByRole("img", { name: new RegExp(diagram.title) }),
  ).toBeVisible();

  // The legend headings sit one level below the section heading.
  await expect(
    section.getByRole("heading", { name: diagramContent.nodes, level: 3 }),
  ).toBeVisible();
  await expect(
    section.getByRole("heading", { name: diagramContent.connections, level: 3 }),
  ).toBeVisible();

  // The full-size diagram is one click away.
  await section.getByRole("link", { name: pageContent.systemDesignLink }).click();
  await expect(page).toHaveURL(
    new RegExp(`${diagramContent.path("multi-branch-pos")}$`),
  );
});

test("the diagram stays static under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/multi-branch-pos");
  await page.locator(".case-section--diagram").scrollIntoViewIfNeeded();

  const state = await page.evaluate(() => {
    const edges = [
      ...document.querySelectorAll<SVGPathElement>(
        ".case-section--diagram .diagram-edge",
      ),
    ];
    const nodes = [
      ...document.querySelectorAll<SVGGElement>(
        ".case-section--diagram .diagram-node",
      ),
    ];
    return {
      offsets: edges.map((edge) => getComputedStyle(edge).strokeDashoffset),
      opacities: nodes.map((node) => getComputedStyle(node).opacity),
    };
  });

  // Nothing is hidden and no edge is left half-drawn.
  expect(state.offsets.every((offset) => offset === "0px")).toBe(true);
  expect(state.opacities.every((opacity) => opacity === "1")).toBe(true);
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

test("Work filters its project rows by category", async ({ page }) => {
  await page.goto("/work");
  const filter = page.getByRole("combobox", { name: "Filter by category" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const rows = page.locator(".work-row");
  const count = await rows.count();
  await filter.selectOption("Research");
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("Traffic Accident Risk Prediction");
  await expect(rows.first().locator("img")).toBeVisible();
  await filter.selectOption("");
  await expect(rows).toHaveCount(count);
});

test("each service offers a timeline and a link to the estimator", async ({ page }) => {
  await page.goto("/services");
  const blocks = page.locator(".service-block");
  await expect(blocks).toHaveCount(4);
  const presets = { architecture: "web", operations: "pos", offline: "mobile", access: "dashboard" };
  for (const [service, type] of Object.entries(presets)) {
    await page.goto("/services");
    await waitForHydration(page);
    const block = blocks.and(page.locator(`#${service}`));
    await expect(block.getByText("Typical timeline")).toBeVisible();
    const link = block.getByRole("link", { name: "Estimate this" });
    await expect(link).toHaveAttribute("href", `/estimate?service=${service}`);
    await link.click();
    await expect(page.getByRole("combobox", { name: "Project type" })).toHaveValue(type);
    const offline = page.getByRole("checkbox", { name: "Needs to work offline" });
    if (service === "offline") await expect(offline).toBeChecked();
    else await expect(offline).not.toBeChecked();
  }
  await page.goto("/estimate?service=constructor");
  await expect(page.getByRole("combobox", { name: "Project type" })).toHaveValue("pos");
});
