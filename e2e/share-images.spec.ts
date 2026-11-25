import { expect, test } from "@playwright/test";
import { projects } from "../src/content/projects";
import { getPosts } from "../src/content/posts";
import { shell, writingContent } from "../src/content/site";

for (const path of [...projects.map((project) => shell.projectHref(project.slug)), ...getPosts({ includeDrafts: false }).map((post) => writingContent.postHref(post.slug))]) {
  for (const kind of ["opengraph-image", "twitter-image"]) {
    test(`${path}/${kind} returns a PNG`, async ({ request }) => {
      const response = await request.get(`${path}/${kind}`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
      const body = await response.body();
      expect([...body.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
      expect(body.readUInt32BE(16)).toBe(1200);
      expect(body.readUInt32BE(20)).toBe(630);
    });
  }
}

test("site share image is a 1200x630 PNG and the favicon is a PNG", async ({ request }) => {
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  const body = await og.body();
  expect([...body.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect(body.readUInt32BE(16)).toBe(1200);
  expect(body.readUInt32BE(20)).toBe(630);
  const home = await request.get("/");
  const icon = /rel="icon" href="([^"]+)"/.exec(await home.text())?.[1];
  expect(icon).toBeTruthy();
  const favicon = await request.get(icon!);
  expect(favicon.headers()["content-type"]).toContain("image/png");
});
