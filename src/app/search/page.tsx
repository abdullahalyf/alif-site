import { SearchTrigger } from "@/features/search/SearchTrigger";
import { searchContent as c } from "@/content/search";
import { pageMetadata } from "@/seo/metadata";
export const metadata = pageMetadata(c.title, c.intro, "/search");
export default function SearchPage() {
  return (
    <div className="container page-shell search-page">
      <h1>{c.title}</h1>
      <p className="lead">{c.intro}</p>
      <SearchTrigger className="search-trigger--page" />
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
    </div>
  );
}
