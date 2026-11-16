import { projects } from "../../src/content/projects";
import { shell } from "../../src/content/site";

export const pageRoutes = [
  "/",
  "/about",
  "/approach",
  "/work",
  ...projects.map((project) => shell.projectHref(project.slug)),
];
