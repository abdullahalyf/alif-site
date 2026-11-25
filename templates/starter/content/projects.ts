import type { Project } from '../../../src/content/schema';

export const projects = [
{ // REPLACE
  "slug": "your-project", // REPLACE
  "title": "Your Project", // REPLACE
  "client": "Your client", // REPLACE
  "year": 2026, // REPLACE
  "role": "Your role", // REPLACE
  "category": "Client work", // REPLACE
  "summary": "Your project summary.", // REPLACE
  "problem": "Describe the problem.", // REPLACE
  "solution": [ // REPLACE
    "Describe your solution." // REPLACE
  ], // REPLACE
  "stack": [ // REPLACE
    "Your technology" // REPLACE
  ], // REPLACE
  "results": [ // REPLACE
    "Your verified result." // REPLACE
  ], // REPLACE
  "link": null, // REPLACE
  "images": [] // REPLACE
} // REPLACE
] satisfies Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}
