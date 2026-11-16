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
