import { SearchTrigger } from "@/features/search/SearchTrigger";
import { searchContent as c } from "@/content/search";
import { pageMetadata } from "@/seo/metadata";
import { Reveal, StaggerIn } from "@/components/motion";
export const metadata = pageMetadata(c.title, c.intro, "/search");
export default function SearchPage() {
  return (
    <div className="container page-shell search-page">
      <Reveal><h1>{c.title}</h1></Reveal>
      <Reveal><p className="lead">{c.intro}</p></Reveal>
      <Reveal><SearchTrigger className="search-trigger--page" /></Reveal>
      <noscript>
        <ul>
          {c.pages
            .filter((page) => page.href !== "/search")
            .map((page) => (
              <li key={page.href}>
                <a href={page.href}>{page.title}</a>
              </li>
            ))}
        </ul>
      </noscript>
      {/* The list of pages is always there, so a visitor without JavaScript can
          still find their way around from here. */}
      <StaggerIn className="search-page-list">
        {c.pages
          .filter((page) => page.href !== "/search")
          .map((page) => (
            <article key={page.href}>
              <h2><a href={page.href}>{page.title}</a></h2>
              <p>{page.description}</p>
            </article>
          ))}
      </StaggerIn>
    </div>
  );
}
