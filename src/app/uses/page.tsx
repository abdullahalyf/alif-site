import { usesContent as c } from '@/content/uses';
import { pageMetadata } from '@/seo/metadata';
import './uses.css';
export const metadata = pageMetadata('Uses', c.intro, '/uses');
export default function UsesPage() { return <div className="container page-shell uses-page"><header><h1>{c.title}</h1><p className="lead">{c.intro}</p></header>{c.groups.map(group => <section key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item.name}><h3>{item.name}</h3><p>{item.why}</p></li>)}</ul></section>)}</div>; }
