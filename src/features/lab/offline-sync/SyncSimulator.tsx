"use client";

import { useEffect, useReducer, type Dispatch } from "react";
import { syncContent as c } from "@/content/lab";
import { prefersReducedMotion, useReducedMotion } from "@/lib/use-reduced-motion";
import { branchTotals, createSyncState, syncTransition, type SyncAction, type Terminal } from "./engine";
import { SyncDiagram } from "./SyncDiagram";
import { useInteractive } from "../useInteractive";

type Action = SyncAction | { type: "reset" };
const setup = () => createSyncState(c.branches, c.firstSequence);
function DeliveryClock({ terminal, dispatch, reduced }: { terminal: Terminal; dispatch: Dispatch<Action>; reduced: boolean }) {
  const { id, online } = terminal;
  const orderId = terminal.inFlight?.id;
  useEffect(() => {
    if (!online || !orderId) return;
    const timer = setTimeout(() => dispatch({ type: "ack", branchId: id, orderId }), prefersReducedMotion() ? 0 : c.packetDelay);
    return () => clearTimeout(timer);
  }, [id, online, orderId, dispatch, reduced]);
  return null;
}
export function SyncSimulator() {
  const [state, dispatch] = useReducer((state: ReturnType<typeof setup>, action: Action) => action.type === "reset" ? setup() : syncTransition(state, action), undefined, setup);
  const reduced = useReducedMotion();
  const interactive = useInteractive();
  return <div className="sync-simulator"><p className="lab-note">{c.note}</p><noscript><p className="lab-note">{c.staticNote}</p></noscript><SyncDiagram state={state} reduced={reduced} />
    <div className="sync-terminals">{Object.values(state.terminals).map(terminal => <section key={terminal.id} className="lab-panel sync-terminal" aria-labelledby={`terminal-${terminal.id}`}>
      <DeliveryClock terminal={terminal} dispatch={dispatch} reduced={reduced} />
      <div className="sync-terminal-heading"><h2 id={`terminal-${terminal.id}`}>{terminal.name}</h2><span className="sync-status" data-online={terminal.online}>{terminal.online ? c.online : c.offline}</span></div><p className="label">{terminal.prefix}</p><p>{c.localSales}: <strong>{terminal.sales.length}</strong></p>
      <div className="sync-actions"><button type="button" disabled={!interactive} onClick={() => dispatch({ type: "sale", branchId: terminal.id, amount: c.saleAmount })}>{c.createSale} · {c.money(c.saleAmount)}</button><button type="button" className="lab-button-secondary" disabled={!interactive} onClick={() => dispatch({ type: terminal.online ? "disconnect" : "reconnect", branchId: terminal.id })}>{terminal.online ? c.disconnect : c.reconnect}</button></div>
      <h3 className="sync-queue-title">{c.pending} <span>{terminal.queue.length + (terminal.inFlight ? 1 : 0)}</span></h3><ul className="sync-queue">{[...(terminal.inFlight ? [terminal.inFlight] : []), ...terminal.queue].map(order => <li key={order.id}><code>{order.id}</code><span>{terminal.inFlight?.id === order.id ? c.sending : c.queued}</span></li>)}</ul>{!terminal.inFlight && !terminal.queue.length && <p className="lab-note">{c.noPending}</p>}
    </section>)}</div>
    <section className="lab-panel sync-dashboard" aria-labelledby="sync-dashboard-title"><h2 id="sync-dashboard-title">{c.dashboardTitle}</h2><dl className="sync-totals">{c.branches.map(branch => { const totals = branchTotals(state, branch.id); return <div key={branch.id} data-dashboard-branch={branch.id}><dt>{branch.name}</dt><dd><strong>{c.salesCount(totals.count)}</strong><span>{c.money(totals.amount)}</span></dd></div>; })}</dl><p role="status">{c.duplicateCount(state.ignoredDuplicates)}</p><div className="sync-actions"><button type="button" disabled={!interactive || !state.serverOrders.length} onClick={() => dispatch({ type: "double-send" })}>{c.doubleSend}</button><button type="button" className="lab-button-secondary" disabled={!interactive} onClick={() => dispatch({ type: "reset" })}>{c.reset}</button></div><p className="lab-note">{c.doubleSendNote}</p></section>
    <section className="lab-panel sync-events" aria-labelledby="sync-log-title"><h2 id="sync-log-title">{c.logTitle}</h2><div role="log" aria-live="polite" aria-relevant="additions" aria-label={c.logTitle} tabIndex={0}><ol>{state.events.slice(-30).map(event => <li key={event.id}>{c.eventText(event, event.branchId ? state.terminals[event.branchId].name : "")}</li>)}</ol></div></section>
  </div>;
}
