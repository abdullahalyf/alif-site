import { expect, it } from "vitest";
import { branchTotals, createSyncState, syncTransition, type SyncState } from "./engine";
const definitions = [{ id: "dhaka", name: "Dhaka", prefix: "DHK-02" }, { id: "sylhet", name: "Sylhet", prefix: "SYL-01" }, { id: "khulna", name: "Khulna", prefix: "KHL-03" }];
const initial = () => createSyncState(definitions);
const sell = (state: SyncState, branchId = "dhaka", amount = 25000) => syncTransition(state, { type: "sale", branchId, amount });
const ack = (state: SyncState, branchId = "dhaka") => syncTransition(state, { type: "ack", branchId, orderId: state.terminals[branchId]?.inFlight?.id ?? "" });

it("reserves unique, branch/device-prefixed IDs while offline", () => {
  let state = syncTransition(initial(), { type: "disconnect", branchId: "dhaka" });
  state = sell(sell(state));
  expect(state.terminals.dhaka.queue.map(order => order.id)).toEqual(["DHK-02-000117", "DHK-02-000118"]);
  expect(state.terminals.dhaka.inFlight).toBeNull(); expect(state.serverOrders).toHaveLength(0);
  state = sell(state, "sylhet"); expect(state.terminals.sylhet.inFlight?.id).toBe("SYL-01-000117");
});
it("sends online sales but changes the dashboard only after server receipt", () => {
  const sent = sell(initial()); expect(branchTotals(sent, "dhaka")).toEqual({ count: 0, amount: 0 });
  const accepted = ack(sent); expect(branchTotals(accepted, "dhaka")).toEqual({ count: 1, amount: 25000 });
  expect(accepted.terminals.dhaka.inFlight).toBeNull(); expect(accepted.terminals.dhaka.queue).toHaveLength(0);
});
it("reconnects and drains each device queue in FIFO order, one acknowledgement at a time", () => {
  let state = syncTransition(initial(), { type: "disconnect", branchId: "dhaka" });
  for (let index = 0; index < 4; index++) state = sell(state);
  state = syncTransition(state, { type: "reconnect", branchId: "dhaka" });
  expect(state.terminals.dhaka.inFlight?.sequence).toBe(117);
  for (let index = 0; index < 4; index++) state = ack(state);
  expect(state.serverOrders.map(order => order.sequence)).toEqual([117, 118, 119, 120]);
  expect(branchTotals(state, "dhaka")).toEqual({ count: 4, amount: 100000 });
});
it("returns an interrupted packet to the front of the local queue", () => {
  let state = sell(sell(initial()));
  state = syncTransition(state, { type: "disconnect", branchId: "dhaka" });
  expect(state.terminals.dhaka.queue.map(order => order.sequence)).toEqual([117, 118]);
  state = ack(state); expect(state.serverOrders).toHaveLength(0);
  state = syncTransition(state, { type: "reconnect", branchId: "dhaka" });
  state = ack(ack(state)); expect(state.serverOrders).toHaveLength(2);
});
it("ignores a replayed order without changing totals", () => {
  const state = ack(sell(initial()));
  const retry = syncTransition(state, { type: "double-send" });
  expect(retry.serverOrders).toEqual(state.serverOrders); expect(retry.ignoredDuplicates).toBe(1);
  expect(branchTotals(retry, "dhaka")).toEqual(branchTotals(state, "dhaka"));
});
it("handles a committed sale with a lost acknowledgement safely on reconnect", () => {
  let state = sell(initial());
  state = syncTransition(state, { type: "deliver", sale: state.terminals.dhaka.inFlight! });
  state = syncTransition(state, { type: "disconnect", branchId: "dhaka" });
  state = syncTransition(state, { type: "reconnect", branchId: "dhaka" }); state = ack(state);
  expect(state.serverOrders).toHaveLength(1); expect(state.ignoredDuplicates).toBe(1);
  expect(state.terminals.dhaka.queue).toHaveLength(0);
});
it("rejects a conflicting payload under an existing idempotency key", () => {
  const state = ack(sell(initial()));
  const result = syncTransition(state, { type: "deliver", sale: { ...state.serverOrders[0], amount: 99999 } });
  expect(result.rejectedConflicts).toBe(1); expect(result.ignoredDuplicates).toBe(0);
  expect(branchTotals(result, "dhaka").amount).toBe(25000);
});
it("isolates terminals and does not mutate earlier snapshots", () => {
  const previous = initial(), next = ack(sell(previous));
  expect(previous.terminals.dhaka.sales).toHaveLength(0); expect(previous.serverOrders).toHaveLength(0);
  expect(branchTotals(next, "sylhet")).toEqual({ count: 0, amount: 0 });
  expect(previous.events).toHaveLength(1);
});
it("allows arbitrary inter-branch arrival order while preserving every unique sale", () => {
  let state = sell(sell(initial()), "sylhet", 30000);
  state = ack(ack(state, "sylhet"));
  expect(state.serverOrders.map(order => order.id)).toEqual(["SYL-01-000117", "DHK-02-000117"]);
  expect(state.serverOrders.reduce((sum, order) => sum + order.amount, 0)).toBe(55000);
});
it("makes empty acknowledgements, repeated disconnects and empty double-sends safe", () => {
  let state = initial(); expect(ack(state).serverOrders).toHaveLength(0);
  expect(syncTransition(state, { type: "double-send" }).ignoredDuplicates).toBe(0);
  state = syncTransition(state, { type: "disconnect", branchId: "dhaka" });
  expect(syncTransition(state, { type: "disconnect", branchId: "dhaka" })).toBe(state);
});
it("rejects invalid setup, unknown branches and invalid money values", () => {
  expect(() => createSyncState([definitions[0], definitions[0]])).toThrow();
  expect(() => createSyncState([], 0)).toThrow();
  expect(() => sell(initial(), "missing")).toThrow();
  for (const amount of [0, -1, 1.2, NaN, Infinity]) expect(() => sell(initial(), "dhaka", amount)).toThrow();
});

it("ignores a delayed acknowledgement for a previous order", () => {
  let state = sell(sell(initial()));
  const oldId = state.terminals.dhaka.inFlight!.id;
  state = ack(state);
  const delayed = syncTransition(state, { type: "ack", branchId: "dhaka", orderId: oldId });
  expect(delayed.serverOrders).toHaveLength(1);
  expect(delayed.terminals.dhaka.inFlight?.sequence).toBe(118);
});
