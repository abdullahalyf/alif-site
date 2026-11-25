import { chromium } from "@playwright/test";
const [,, base, out, ...paths] = process.argv;
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
let bad = 0;
for (const [w, h, tag] of [[1440, 900, "d"], [390, 844, "m"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on("console", m => m.type() === "error" && errs.push(m.text())); p.on("pageerror", e => errs.push(String(e)));
  for (const path of paths) {
    errs.length = 0;
    await p.goto(base + path, { waitUntil: "networkidle" });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 450) { await p.evaluate(t => window.scrollTo(0, t), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(2500);
    const r = await p.evaluate(() => ({
      broken: [...document.querySelectorAll("img")].filter(i => { const r = i.getBoundingClientRect(); const vis = getComputedStyle(i).display !== "none" && r.width > 0 && r.left < innerWidth && r.right > 0; return vis && !i.closest("dialog") && (!i.complete || i.naturalWidth === 0); }).map(i => i.currentSrc || i.src),
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      h1: document.querySelectorAll("h1").length,
    }));
    const ok = !r.broken.length && !r.overflow && r.h1 === 1 && !errs.length;
    if (!ok) bad++;
    console.log(ok ? "OK " : "BAD", tag, path, JSON.stringify({ ...r, errs: errs.slice(0, 2) }));
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    if (out !== "-") await p.screenshot({ path: `${out}/${tag}${path.replace(/\//g, "_") || "_home"}.png`, fullPage: true });
  }
  await p.close();
}
await b.close(); process.exit(bad ? 1 : 0);
