import { shell } from "@/content/site";
import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return <div className="container page-shell">
    <h1>{shell.notFoundTitle}</h1>
    <p>{shell.notFoundText}</p>
    <div><ButtonLink href={shell.home.href}>{shell.backHome}</ButtonLink></div>
  </div>;
}
