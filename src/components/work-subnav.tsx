import Link from "next/link";
import { workNavigation } from "@/content/site";

export function WorkSubnav({ current }: { current: string }) {
  return <nav className="work-subnav" aria-label={workNavigation.label}>
    <ul>{workNavigation.links.map(({ href, label }) =>
      <li key={href}><Link href={href} aria-current={current === href ? "page" : undefined}>{label}</Link></li>
    )}</ul>
  </nav>;
}
