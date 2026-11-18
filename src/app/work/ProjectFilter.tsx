"use client";

import { useState, type ReactNode } from "react";

export function ProjectFilter({ label, allLabel, entries }: {
  label: string;
  allLabel: string;
  entries: { slug: string; category: string; row: ReactNode }[];
}) {
  const [category, setCategory] = useState("");
  const categories = [...new Set(entries.map((entry) => entry.category))].sort();

  return <>
    <label className="work-filter">
      <span className="label">{label}</span>
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">{allLabel}</option>
        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
    <ul className="work-list">
      {entries.filter((entry) => !category || entry.category === category).map(({ slug, row }) => <li key={slug}>{row}</li>)}
    </ul>
  </>;
}
