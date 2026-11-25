import { WorkSubnav } from "@/components/work-subnav";
import Link from "next/link";
import { estimateContent as c, estimateDefaults, estimateModel } from "@/content/estimate";
import { estimateInputSchema, estimateModelSchema } from "@/content/schemas/estimate";
import { Estimator } from "@/features/estimate/Estimator";
import { pageMetadata } from "@/seo/metadata";
import "./estimate.css";
estimateInputSchema.parse(estimateDefaults);
estimateModelSchema.parse(estimateModel);

export const metadata = pageMetadata(c.title, c.description, c.path);
export default function EstimatePage() { return <div className="container estimate-page">
      <WorkSubnav current="/estimate" />
      <header className="estimate-intro"><p className="label">{c.label}</p><h1>{c.title}</h1><p className="lead">{c.intro}</p><p className="estimate-range-notice">{c.rangeNotice}</p></header><noscript><p className="estimate-hint">{c.staticNote}</p></noscript><Estimator /><Link className="text-link estimate-lab-link" href={c.labPath}>{c.labLink}</Link></div>; }
