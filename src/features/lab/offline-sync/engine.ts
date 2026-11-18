import { terminalSchema, type TerminalDefinition } from "@/content/schemas/lab";

export type Sale = { id: string; branchId: string; sequence: number; amount: number };
export type Terminal = TerminalDefinition & { online: boolean; nextSequence: number; sales: Sale[]; queue: Sale[]; inFlight: Sale | null };
export type EventKind = "started" | "created" | "queued" | "sending" | "accepted" | "acknowledged" | "offline" | "reconnected" | "interrupted" | "duplicate" | "conflict";
export type SyncEvent = { id: number; kind: EventKind; branchId?: string; saleId?: string };
export type SyncState = { terminals: Record<string, Terminal>; serverOrders: Sale[]; events: SyncEvent[]; nextEventId: number; ignoredDuplicates: number; rejectedConflicts: number };
export type SyncAction = { type: "sale"; branchId: string; amount: number } | { type: "disconnect" | "reconnect"; branchId: string } | { type: "ack"; branchId: string; orderId: string } | { type: "deliver"; sale: Sale } | { type: "double-send" };

export function createSyncState(definitions: TerminalDefinition[], firstSequence = 117): SyncState {
  if (!definitions.length || !Number.isSafeInteger(firstSequence) || firstSequence < 1) throw new RangeError("Invalid terminal setup");
  definitions.forEach(definition => terminalSchema.parse(definition));
  if (new Set(definitions.map(item => item.id)).size !== definitions.length || new Set(definitions.map(item => item.prefix)).size !== definitions.length) throw new Error("Terminal identifiers must be unique");
  return { terminals: Object.fromEntries(definitions.map(definition => [definition.id, { ...definition, online: true, nextSequence: firstSequence, sales: [], queue: [], inFlight: null }])), serverOrders: [], events: [{ id: 0, kind: "started" }], nextEventId: 1, ignoredDuplicates: 0, rejectedConflicts: 0 };
}
function event(state: SyncState, kind: EventKind, branchId?: string, saleId?: string) {
  state.events.push({ id: state.nextEventId++, kind, branchId, saleId });
  if (state.events.length > 100) state.events.shift();
}
function sendNext(state: SyncState, terminal: Terminal) {
  if (terminal.online && !terminal.inFlight && terminal.queue.length) {
    terminal.inFlight = terminal.queue.shift()!;
    event(state, "sending", terminal.id, terminal.inFlight.id);
  }
}
function merge(state: SyncState, sale: Sale) {
  const terminal = state.terminals[sale.branchId];
  if (!terminal || sale.id !== `${terminal.prefix}-${String(sale.sequence).padStart(6, "0")}` || !Number.isSafeInteger(sale.sequence) || sale.sequence < 1 || !Number.isSafeInteger(sale.amount) || sale.amount <= 0) throw new RangeError("Invalid order payload");
  const existing = state.serverOrders.find(order => order.id === sale.id);
  if (existing) {
    if (existing.amount === sale.amount && existing.branchId === sale.branchId && existing.sequence === sale.sequence) {
      state.ignoredDuplicates++; event(state, "duplicate", sale.branchId, sale.id);
    } else {
      state.rejectedConflicts++; event(state, "conflict", sale.branchId, sale.id);
    }
    return;
  }
  state.serverOrders.push({ ...sale });
  event(state, "accepted", sale.branchId, sale.id);
}
/** Deterministic transitions; timers and packet animation belong to the UI. */
export function syncTransition(previous: SyncState, action: SyncAction): SyncState {
  const state: SyncState = { ...previous, terminals: Object.fromEntries(Object.entries(previous.terminals).map(([id, terminal]) => [id, { ...terminal, sales: [...terminal.sales], queue: [...terminal.queue] }])), serverOrders: [...previous.serverOrders], events: [...previous.events] };
  if (action.type === "deliver") { merge(state, action.sale); return state; }
  if (action.type === "double-send") { const last = state.serverOrders.at(-1); if (last) merge(state, last); return state; }
  const terminal = state.terminals[action.branchId];
  if (!terminal) throw new RangeError("Unknown terminal");
  if (action.type === "sale") {
    if (!Number.isSafeInteger(action.amount) || action.amount <= 0) throw new RangeError("Sale amount must be a positive integer");
    if (!Number.isSafeInteger(terminal.nextSequence) || terminal.nextSequence >= Number.MAX_SAFE_INTEGER) throw new RangeError("Order sequence exhausted");
    const sequence = terminal.nextSequence++;
    const sale = { id: `${terminal.prefix}-${String(sequence).padStart(6, "0")}`, branchId: terminal.id, sequence, amount: action.amount };
    terminal.sales.push(sale); terminal.queue.push(sale);
    event(state, "created", terminal.id, sale.id);
    if (!terminal.online) event(state, "queued", terminal.id, sale.id);
    sendNext(state, terminal);
  } else if (action.type === "disconnect") {
    if (!terminal.online) return previous;
    terminal.online = false;
    if (terminal.inFlight) { terminal.queue.unshift(terminal.inFlight); event(state, "interrupted", terminal.id, terminal.inFlight.id); terminal.inFlight = null; }
    event(state, "offline", terminal.id);
  } else if (action.type === "reconnect") {
    terminal.online = true; event(state, "reconnected", terminal.id); sendNext(state, terminal);
  } else if (action.type === "ack" && terminal.online && terminal.inFlight && terminal.inFlight.id === action.orderId) {
    const sale = terminal.inFlight;
    merge(state, sale); terminal.inFlight = null;
    event(state, "acknowledged", terminal.id, sale.id); sendNext(state, terminal);
  }
  return state;
}
export function branchTotals(state: SyncState, branchId: string) {
  const orders = state.serverOrders.filter(order => order.branchId === branchId);
  return { count: orders.length, amount: orders.reduce((sum, order) => sum + order.amount, 0) };
}
