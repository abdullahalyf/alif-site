import Link from "next/link";
import { Suspense } from "react";
import { estimateContent as c, estimateDefaults, estimateModel, serviceEstimatePresets } from "@/content/estimate";
import { estimateInputSchema, estimateModelSchema } from "@/content/schemas/estimate";
import { Estimator } from "@/features/estimate/Estimator";
import { pageMetadata } from "@/seo/metadata";
import "./estimate.css";

estimateInputSchema.parse(estimateDefaults);
estimateModelSchema.parse(estimateModel);

type SearchParams = Promise<{ service?: string | string[] }>;

async function ServiceEstimator({ searchParams }: { searchParams: SearchParams }) {
  const { service } = await searchParams;
  if (typeof service !== "string" || !Object.hasOwn(serviceEstimatePresets, service)) return <Estimator />;
  return <Estimator key={service} initialScope={{ ...estimateDefaults, ...serviceEstimatePresets[service] }} />;
}

export const metadata = pageMetadata(c.title, c.description, c.path);

export default function EstimatePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="container estimate-page">
      <header className="estimate-intro">
        <p className="label">{c.label}</p>
        <h1>{c.title}</h1>
        <p className="lead">{c.intro}</p>
        <p className="estimate-demo-notice">{c.demoNotice}</p>
      </header>
      <noscript><p className="estimate-hint">{c.staticNote}</p></noscript>
      <Suspense fallback={<Estimator />}>
        <ServiceEstimator searchParams={searchParams} />
      </Suspense>
      <Link className="text-link estimate-lab-link" href={c.labPath}>{c.labLink}</Link>
    </div>
  );
}
