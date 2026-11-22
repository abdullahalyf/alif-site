import { WorkSubnav } from "@/components/work-subnav";
import Link from "next/link";
import { ArrowUpRight } from "@/components/arrows";
import { labContent as c } from "@/content/lab";
import { pageMetadata } from "@/seo/metadata";

export const metadata = pageMetadata(c.title, c.description, c.path);
export default function LabPage() {
  return <div className="container lab-shell">
      <WorkSubnav current="/lab" />
      <header className="lab-intro"><p className="label">{c.label}</p><h1>{c.title}</h1><p className="lead">{c.intro}</p></header><div className="lab-demo-cards">{c.demos.map((demo, index) => <article className="lab-demo-card" key={demo.id}><span className="lab-card-number">{String(index + 1).padStart(2, "0")}</span><h2>{demo.title}</h2><p>{demo.summary}</p><Link className="text-link" href={demo.path}>{c.tryDemo}<ArrowUpRight /></Link></article>)}</div><aside className="lab-next"><p>{c.estimateIntro}</p><Link className="text-link" href={c.estimatePath}>{c.estimateLink}<ArrowUpRight /></Link></aside></div>;
}
