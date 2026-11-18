"use client";
import { useId, useState } from "react";
import { accessContent as c } from "@/content/lab";
import { operationSchema, resourceSchema, roleSchema, type Role } from "@/content/schemas/lab";
import { evaluateAccess } from "./engine";
import { useInteractive } from "../useInteractive";

export function AccessExplorer() {
  const [role, setRole] = useState<Role>("owner");
  const [actionId, setActionId] = useState<string>(c.actions[0].id);
  const [branch, setBranch] = useState("same");
  const [owner, setOwner] = useState("me");
  const interactive = useInteractive();
  const id = useId();
  const action = c.actions.find(item => item.id === actionId) ?? c.actions[0];
  const context = { actorBranch: "DHK", recordBranch: branch === "same" ? "DHK" : "SYL", actorId: "me", recordOwnerId: owner === "me" ? "me" : "teammate" };
  const decision = evaluateAccess({ role, resource: action.resource, operation: action.operation, context });
  const rule = c.rules[decision.rule];
  return <div className="access-explorer"><p className="lab-note">{c.note}</p><noscript><p className="lab-note">{c.staticNote}</p></noscript>
    <fieldset className="access-roles" disabled={!interactive}><legend>{c.rolePicker}</legend><div>{roleSchema.options.map(value => <label key={value} data-selected={role === value}><input type="radio" name={`${id}-role`} value={value} checked={role === value} onChange={() => setRole(value)} /><span>{c.roles[value]}</span></label>)}</div></fieldset>
    <section className="lab-panel" aria-labelledby="access-matrix-title"><h2 id="access-matrix-title">{c.matrixTitle}</h2><div className="access-matrix-scroll" data-horizontal-scroll role="region" aria-label={c.matrixTitle} tabIndex={0}><table><caption>{c.matrixCaption(c.roles[role])}</caption><thead><tr><th scope="col">{c.resourceLabel}</th>{operationSchema.options.map(operation => <th scope="col" key={operation}>{c.operations[operation]}</th>)}</tr></thead><tbody>{resourceSchema.options.map(resource => <tr key={resource}><th scope="row">{c.resources[resource]}</th>{operationSchema.options.map(operation => { const permission = evaluateAccess({ role, resource, operation, context }); return <td key={operation} data-allowed={permission.allowed}><span aria-hidden="true">{permission.allowed ? "✓" : "—"}</span> {permission.allowed ? c.allowed : c.denied}</td>; })}</tr>)}</tbody></table></div><p className="lab-note">{c.matrixHint}</p></section>
    <section className="lab-panel access-action" aria-labelledby="access-action-title"><h2 id="access-action-title">{c.actionTitle}</h2><div className="access-action-grid"><fieldset disabled={!interactive}><div><label htmlFor={`${id}-action`}>{c.actionLabel}</label><select id={`${id}-action`} value={actionId} onChange={event => setActionId(event.target.value)}>{c.actions.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div><div><label htmlFor={`${id}-branch`}>{c.branchLabel}</label><select id={`${id}-branch`} value={branch} onChange={event => setBranch(event.target.value)}><option value="same">{c.sameBranch}</option><option value="other">{c.otherBranch}</option></select></div><div><label htmlFor={`${id}-owner`}>{c.ownerLabel}</label><select id={`${id}-owner`} value={owner} onChange={event => setOwner(event.target.value)}><option value="me">{c.ownRecord}</option><option value="other">{c.otherRecord}</option></select></div></fieldset><div className="access-decision" role="status" aria-live="polite" data-allowed={decision.allowed}><h3>{c.outcome(c.roles[role], action.label, decision.allowed)}</h3><p className="label">{c.ruleTitle}</p><p>{rule.text}</p><pre tabIndex={0}><code>{rule.expression}</code></pre></div></div></section>
  </div>;
}
