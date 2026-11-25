import Link from "next/link";
import { aboutNavigation, workNavigation } from "@/content/site";

type SubnavData = { label: string; links: { href: string; label: string }[] };

export function SectionSubnav({ nav, current }: { nav: SubnavData; current: string }) {
  return <nav className="work-subnav" aria-label={nav.label}>
    <ul>{nav.links.map(({ href, label }) =>
      <li key={href}><Link href={href} aria-current={current === href ? "page" : current.startsWith(`${href}/`) ? "location" : undefined}>{label}</Link></li>
    )}</ul>
  </nav>;
}

export function WorkSubnav({ current }: { current: string }) {
  return <SectionSubnav nav={workNavigation} current={current} />;
}

export function AboutSubnav({ current }: { current: string }) {
  return <SectionSubnav nav={aboutNavigation} current={current} />;
}
