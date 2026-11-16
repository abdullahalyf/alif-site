// @vitest-environment node
import { readFileSync } from 'node:fs';
import { it, expect } from 'vitest';
import { siteSchema, projectsSchema } from '../content/schema';
import { parsePost, postSchema } from '../content/posts';
import { site } from '../../templates/starter/content/site';
import { projects } from '../../templates/starter/content/projects';
it('starter content satisfies the production schemas and keeps the post draft', () => {
  expect(siteSchema.safeParse(site).success).toBe(true);
  expect(projectsSchema.safeParse(projects).success).toBe(true);
  const post = parsePost(readFileSync('templates/starter/content/posts/welcome.md', 'utf8'), 'welcome');
  expect(postSchema.safeParse(post).success).toBe(true);
  expect(post.draft).toBe(true);
});
