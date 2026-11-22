import Link from "next/link";
import { notFound } from "next/navigation";
import { approachDetail as c, site } from "@/content/site";
import { pageMetadata } from "@/seo/metadata";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/motion";

export function generateStaticParams() {
  return site.approach.map(({ slug }) => ({ slug }));
}

function find(slug: string) {
  const index = site.approach.findIndex((step) => step.slug === slug);
  return index < 0 ? null : { step: site.approach[index], index };
}

export async function generateMetadata({ params }: PageProps<"/approach/[slug]">) {
  const found = find((await params).slug);
  if (!found) notFound();
  return pageMetadata(found.step.title, found.step.text, c.href(found.step.slug));
}

export default async function ApproachStep({ params }: PageProps<"/approach/[slug]">) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { step, index } = found;
  const next = site.approach[(index + 1) % site.approach.length];
  return <article className="container section-space approach-detail">
    <SectionLabel>{c.stepLabel(index)}</SectionLabel>
    <div className="page-intro"><Reveal><h1>{step.title}</h1></Reveal><Reveal><p>{step.text}</p></Reveal></div>
    <div className="prose">
      {step.details.length ? step.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{c.pending}</p>}
    </div>
    <nav className="post-neighbours" aria-label={c.back}>
      <Link href="/approach">{c.back}</Link>
      <Link href={c.href(next.slug)}>{c.next}: {next.title}</Link>
    </nav>
  </article>;
}
