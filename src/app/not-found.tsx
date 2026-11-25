import Link from "next/link";
import { shell } from "@/content/site";
import { ButtonLink } from "@/components/button";
import "./not-found.css";

export default function NotFound() {
  return <div className="container page-shell not-found">
    <p className="not-found__code" aria-hidden="true">{shell.notFoundCode}</p>
    <h1>{shell.notFoundTitle}</h1>
    <p className="lead">{shell.notFoundText}</p>
    <ul className="not-found__links">
      {shell.notFoundLinks.map((link) => <li key={link.href}><Link href={link.href}><span>{link.label}</span><small>{link.text}</small></Link></li>)}
    </ul>
    <div><ButtonLink href={shell.home.href}>{shell.backHome}</ButtonLink></div>
  </div>;
}
