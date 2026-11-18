import Link from "next/link";
import { labContent, accessContent as c } from "@/content/lab";
import { pageMetadata } from "@/seo/metadata";
import { AccessExplorer } from "@/features/lab/access-control/AccessExplorer";
import "./access.css";
export const metadata = pageMetadata(c.title, c.summary, c.path);
export default function AccessControlPage() { return <div className="container lab-shell"><header className="lab-intro"><Link className="text-link" href={labContent.path}>{labContent.back}</Link><h1>{c.title}</h1><p className="lead">{c.intro}</p></header><AccessExplorer /></div>; }
