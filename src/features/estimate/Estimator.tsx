"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useState } from "react";
import { estimateContent as c, estimateDefaults, estimateModel, serviceEstimatePresets } from "@/content/estimate";
import { estimateLimits, integrations, projectTypes, urgencyLevels, validEstimateCount } from "@/content/estimate-options";
import type { EstimateInput } from "@/content/schemas/estimate";
import { useInteractive } from "@/features/lab/useInteractive";
import { calculateRange } from "./calculate-range";
import { estimateSummary, estimateUrl } from "./summary";

function ReadServicePreset({ onChange }: { onChange: (service: string | undefined) => void }) {
  const values = useSearchParams().getAll("service");
  const service = values.length === 1 && Object.hasOwn(serviceEstimatePresets, values[0]) ? values[0] : undefined;
  useEffect(() => onChange(service), [onChange, service]);
  return null;
}

export function Estimator() {
  const [service, setService] = useState<string>();
  const initialScope = service ? { ...estimateDefaults, ...serviceEstimatePresets[service] } : estimateDefaults;
  return (
    <>
      <Suspense fallback={null}><ReadServicePreset onChange={setService} /></Suspense>
      <EstimateForm key={service} initialScope={initialScope} />
    </>
  );
}

function EstimateForm({ initialScope }: { initialScope: EstimateInput }) {
  const [scope, setScope] = useState(initialScope);
  const [branches, setBranches] = useState(String(estimateDefaults.branches));
  const [roles, setRoles] = useState(String(estimateDefaults.roles));
  const id = useId(), interactive = useInteractive();
  const options = estimateModel.types[scope.projectType];
  const invalidBranches = options.counts && !validEstimateCount(Number(branches), "branches");
  const invalidRoles = options.counts && !validEstimateCount(Number(roles), "roles");
  const input = invalidBranches || invalidRoles ? null : { ...scope, branches: options.counts ? Number(branches) : 1, roles: options.counts ? Number(roles) : estimateDefaults.roles };
  const result = input ? calculateRange(input) : null;
  function update<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) { setScope(current => ({ ...current, [key]: value })); }
  return <div className="estimate-workspace"><form className="estimate-form" aria-labelledby={`${id}-form-title`} noValidate onSubmit={event => event.preventDefault()}><h2 id={`${id}-form-title`}>{c.formTitle}</h2><fieldset disabled={!interactive}><legend className="sr-only">{c.formTitle}</legend>
    <fieldset className="estimate-types"><legend>{c.fields.projectType}</legend><div>{projectTypes.map(value => <label className="estimate-chip" key={value}><input type="radio" name={`${id}-type`} value={value} checked={scope.projectType === value} onChange={() => update("projectType", value)} />{c.projectTypes[value]}</label>)}</div></fieldset>
    {options.counts && <div className="estimate-counts"><div className="estimate-field"><label htmlFor={`${id}-branches`}>{c.fields.branches}</label><input id={`${id}-branches`} type="number" min="1" max={estimateLimits.branches} step="1" value={branches} onChange={event => setBranches(event.target.value)} aria-invalid={invalidBranches} aria-describedby={invalidBranches ? `${id}-branches-error` : undefined} />{invalidBranches && <p className="estimate-error" id={`${id}-branches-error`}>{c.branchesError}</p>}</div><div className="estimate-field"><label htmlFor={`${id}-roles`}>{c.fields.roles}</label><input id={`${id}-roles`} type="number" min="1" max={estimateLimits.roles} step="1" value={roles} onChange={event => setRoles(event.target.value)} aria-invalid={invalidRoles} aria-describedby={invalidRoles ? `${id}-roles-error` : undefined} />{invalidRoles && <p className="estimate-error" id={`${id}-roles-error`}>{c.rolesError}</p>}</div></div>}
    {options.offline && <div><label className="estimate-checkbox" htmlFor={`${id}-offline`}><input id={`${id}-offline`} type="checkbox" checked={scope.offline} onChange={event => update("offline", event.target.checked)} aria-describedby={`${id}-offline-hint`} />{c.fields.offline}</label><p className="estimate-hint" id={`${id}-offline-hint`}>{c.offlineHint}</p></div>}
    <fieldset className="estimate-integrations"><legend>{c.fields.integrations}</legend><div>{integrations.map(value => <label className="estimate-checkbox" key={value}><input type="checkbox" checked={scope.integrations.includes(value)} onChange={event => update("integrations", event.target.checked ? [...scope.integrations, value] : scope.integrations.filter(item => item !== value))} />{c.integrationLabels[value]}</label>)}</div></fieldset>
    {options.migration && <label className="estimate-checkbox" htmlFor={`${id}-migration`}><input id={`${id}-migration`} type="checkbox" checked={scope.migration} onChange={event => update("migration", event.target.checked)} />{c.fields.migration}</label>}
    <div className="estimate-field"><label htmlFor={`${id}-urgency`}>{c.fields.urgency}</label><select id={`${id}-urgency`} value={scope.urgency} onChange={event => update("urgency", urgencyLevels[event.currentTarget.selectedIndex])} aria-describedby={`${id}-urgency-hint`}>{urgencyLevels.map(value => <option value={value} key={value}>{c.urgencyLabels[value]}</option>)}</select><p className="estimate-hint" id={`${id}-urgency-hint`}>{c.urgencyHint}</p></div>
  </fieldset></form>
  {input && result ? <section className="estimate-result" aria-labelledby={`${id}-result-title`}><h2 id={`${id}-result-title`}>{c.resultTitle}</h2><div className="estimate-ranges" role="status" aria-live="polite" aria-atomic="true"><div><h3>{c.timelineLabel}</h3><p data-estimate-timeline>{result.timeline ? c.weeksRange(result.timeline) : c.customQuote}</p></div><div><h3>{c.priceLabel}</h3><p data-estimate-price>{result.price ? c.priceRange(result.price) : c.customQuote}</p></div></div><p className="estimate-range-notice">{c.rangeNotice}</p><p className="estimate-hint">{result.price ? c.rangeExplanation : c.customHint}</p>
    {result.phases.length > 0 && <figure className="estimate-phases"><figcaption>{c.phasesTitle}</figcaption><div className="estimate-phase-bar" role="img" aria-label={c.phaseChartLabel}>{result.phases.map(phase => <span key={phase.id} data-phase={phase.id} style={{ width: `${phase.share * 100}%` }} />)}</div><dl>{result.phases.map(phase => <div key={phase.id}><dt><span className="estimate-phase-dot" data-phase={phase.id} />{c.phaseLabels[phase.id]}</dt><dd>{c.phaseWeeks(phase.weeks)}</dd></div>)}</dl><p className="estimate-hint">{c.phaseNote}</p></figure>}
    <section className="estimate-summary" aria-labelledby={`${id}-send-title`}><h3 id={`${id}-send-title`}>{c.sendTitle}</h3><p>{c.sendIntro}</p><ul>{estimateSummary(input, result).map(line => <li key={line}>{line}</li>)}</ul><div className="button-row"><a className="button button--primary" href={estimateUrl(input, result, "email")}>{c.emailLink}</a><a className="button button--secondary" href={estimateUrl(input, result, "whatsapp")} target="_blank" rel="noopener noreferrer">{c.whatsappLink}</a></div></section>
  </section> : <p className="estimate-invalid" role="alert">{c.invalid}</p>}
  </div>;
}
