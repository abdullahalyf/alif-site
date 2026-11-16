import { existsSync, statSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { z } from 'zod';
import { site } from '../src/content/site';
import { projects } from '../src/content/projects';
import { siteSchema, projectsSchema } from '../src/content/schema';
import { parsePost } from '../src/content/posts';
import { formatIssue } from './content-errors';

let errors = 0;
function error(message: string) { console.error(message); errors++; }
function validate(file: string, schema: z.ZodType, value: unknown) {
  const result = schema.safeParse(value);
  if (!result.success) result.error.issues.forEach(issue => error(formatIssue(file, issue)));
}
function images(value: unknown, file: string, path = '') {
  if (!value || typeof value !== 'object') return;
  const obj = value as Record<string, unknown>;
  if (typeof obj.src === 'string' && obj.src.startsWith('/')) {
    const publicRoot = resolve('public');
    const target = resolve(publicRoot, obj.src.slice(1));
    if (relative(publicRoot, target) === '..' || relative(publicRoot, target).startsWith(`..${sep}`) || !existsSync(target) || !statSync(target).isFile()) error(`${file} → ${path}.src: local image missing or outside public. Example: /images/portrait.jpg (add that file to public/images).`);
  }
  Object.entries(obj).forEach(([key, child]) => images(child, file, path ? `${path}.${key}` : key));
}
function inspectSource(file: string, draft = false) {
  const source = readFileSync(file, 'utf8');
  console.log(`${file}: ${(source.match(/\/\/ DEMO\b/g) ?? []).length} // DEMO markers`);
  if (!draft && source.includes('TODO(')) console.warn(`${file}: warning: leftover TODO( in non-draft content; replace with confirmed content.`);
}
validate('src/content/site.ts', siteSchema, site);
validate('src/content/projects.ts', projectsSchema, projects);
images(site, 'src/content/site.ts');
images(projects, 'src/content/projects.ts');
for (const file of readdirSync('src/content').filter(name => name.endsWith('.ts') && !name.endsWith('.test.ts'))) inspectSource(`src/content/${file}`);
const slugs = new Set<string>();
for (const name of readdirSync('src/content/posts').filter(name => name.endsWith('.md'))) {
  const file = `src/content/posts/${name}`;
  const slug = name.slice(0, -3);
  if (slugs.has(slug)) error(`${file} → slug: duplicate slug. Example: my-unique-post`);
  slugs.add(slug);
  try { const post = parsePost(readFileSync(file, 'utf8'), slug); inspectSource(file, post.draft); }
  catch (cause) {
    if (cause instanceof z.ZodError) cause.issues.forEach(issue => error(formatIssue(file, issue)));
    else error(`${file} → post: ${cause instanceof Error ? cause.message : String(cause)}. Example: start with --- YAML frontmatter and use a filename like my-post.md.`);
  }
}
console.log(errors ? `${errors} content error(s).` : 'Content validation passed (warnings do not block).');
process.exitCode = errors ? 1 : 0;
