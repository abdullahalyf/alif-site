import Link from "next/link";
import { labContent, syncContent as c } from "@/content/lab";
import { pageMetadata } from "@/seo/metadata";
import { SyncSimulator } from "@/features/lab/offline-sync/SyncSimulator";
import "./sync.css";
export const metadata = pageMetadata(c.title, c.summary, c.path);
export default function OfflineSyncPage() { return <div className="container lab-shell"><header className="lab-intro"><Link className="text-link" href={labContent.path}>{labContent.back}</Link><h1>{c.title}</h1><p className="lead">{c.intro}</p><Link className="text-link" href={c.caseStudyPath}>{c.caseStudyLink}</Link></header><SyncSimulator /></div>; }
