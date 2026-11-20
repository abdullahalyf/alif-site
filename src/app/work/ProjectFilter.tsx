"use client";

import { useState, type ReactNode } from "react";

export function ProjectFilter({ label, allLabel, emptyLabel, entries }: {
  label: string;
  allLabel: string;
  emptyLabel: string;
  entries: { slug: string; category: string; featured: boolean; row: ReactNode }[];
}) {
  const [category, setCategory] = useState("");
  const categories = [...new Set(entries.map((entry) => entry.category))].sort();

  const visible = entries.filter((entry) => !category || entry.category === category);

  return <>
    <label className="work-filter">
      <span className="label">{label}</span>
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">{allLabel}</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
    <ul className="work-list">
      {visible.map(({ slug, featured, row }) => <li key={slug} data-featured={featured || undefined}>{row}</li>)}
    </ul>
    {!visible.length && <p role="status">{emptyLabel}</p>}
  </>;
}
