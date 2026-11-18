import { useId } from "react";
import { syncContent as c } from "@/content/lab";
import type { SyncState } from "./engine";

export function SyncDiagram({ state, reduced }: { state: SyncState; reduced: boolean }) {
  const id = useId();
  return <figure className="sync-diagram"><div className="sync-diagram-scroll" data-horizontal-scroll tabIndex={0} role="region" aria-label={c.diagramTitle}><svg viewBox="0 0 820 380" role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>{c.diagramTitle}</title><desc id={`${id}-desc`}>{c.diagramDescription}</desc>
    {Object.values(state.terminals).map((terminal, index) => { const y = 50 + index * 130; const path = `M220 ${y + 25} C320 ${y + 25} 300 205 400 205`; return <g key={terminal.id}><path d={path} className="sync-connection" data-online={terminal.online} /><rect x="20" y={y - 10} width="200" height="75" rx="12" className="sync-diagram-node" /><text x="40" y={y + 20}>{terminal.name} · {terminal.prefix}</text><text x="40" y={y + 45} className="sync-svg-label">{terminal.online ? c.online : c.offline}</text>{terminal.inFlight && <circle className="sync-packet" r="6" cx={reduced ? 400 : 0} cy={reduced ? 205 : 0} aria-hidden="true">{!reduced && <animateMotion dur={`${c.packetDelay / 1000}s`} path={path} fill="freeze" />}</circle>}</g>; })}
    <path d="M560 205 H650" className="sync-connection" data-online="true" /><rect x="400" y="160" width="160" height="90" rx="16" className="sync-cloud" /><text className="sync-cloud-label" x="480" y="198" textAnchor="middle">{c.cloud}</text><text x="480" y="225" textAnchor="middle" className="sync-svg-label sync-cloud-label">{c.salesCount(state.serverOrders.length)}</text><rect x="650" y="160" width="150" height="90" rx="12" className="sync-diagram-node" /><text x="725" y="198" textAnchor="middle">{c.owner}</text><text x="725" y="225" textAnchor="middle" className="sync-svg-label">{c.salesCount(state.serverOrders.length)}</text>
  </svg></div><figcaption>{c.diagramHint}</figcaption></figure>;
}
