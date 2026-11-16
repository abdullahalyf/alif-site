import { useId } from 'react';
import type { Diagram } from '@/content/schemas/diagrams';
import { diagramContent as c } from '@/content/diagrams';
import { layoutDiagram } from './layout';
export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  const id = useId().replaceAll(':', ''); const nodes = layoutDiagram(diagram);
  const width = Math.max(...nodes.map(node => node.x)) + 250; const height = Math.max(...nodes.map(node => node.y)) + 130;
  return <figure className="architecture-diagram"><div className="diagram-scroll" tabIndex={0} role="region" aria-label={diagram.title}><svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{diagram.title}</title><desc id={`${id}-desc`}>{diagram.description}</desc><defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>
    {diagram.edges.map((edge, index) => { const a = nodes.find(node => node.id === edge.from)!; const b = nodes.find(node => node.id === edge.to)!; return <g key={index}><path d={`M${a.x + 220},${a.y + 45} C${a.x + 270},${a.y + 45} ${b.x - 50},${b.y + 45} ${b.x},${b.y + 45}`} fill="none" stroke="currentColor" markerEnd={`url(#${id}-arrow)`}/><text x={(a.x + 220 + b.x) / 2} y={(a.y + b.y) / 2 + 25} textAnchor="middle" fontSize="11">{edge.label}</text></g>; })}
    {nodes.map(node => <g key={node.id} className={`diagram-node diagram-node--${node.kind}`}><rect x={node.x} y={node.y} width="220" height="90" rx={node.kind === 'db' ? 20 : 8}/><text x={node.x + 110} y={node.y + 50} textAnchor="middle" fontSize="14">{node.label}</text></g>)}
  </svg></div><figcaption><p>{diagram.description}</p><h2>{c.nodes}</h2><ul>{diagram.nodes.map(node => <li key={node.id}>{node.label}</li>)}</ul><h2>{c.connections}</h2><ul>{diagram.edges.map((edge, index) => <li key={index}>{diagram.nodes.find(node => node.id === edge.from)!.label} → {diagram.nodes.find(node => node.id === edge.to)!.label}: {edge.label}</li>)}</ul></figcaption></figure>;
}
