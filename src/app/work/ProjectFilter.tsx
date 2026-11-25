"use client";

import { useState, type ReactNode } from "react";

export function ProjectFilter({ label, allLabel, emptyLabel, categories, entries }: {
  label: string;
  allLabel: string;
  emptyLabel: string;
  categories: string[];
  entries: { slug: string; category: string; featured: boolean; card: ReactNode }[];
}) {
  const [category, setCategory] = useState("");
  const shown = categories.filter((item) => entries.some((entry) => entry.category === item));
  const visible = entries.filter((entry) => !category || entry.category === category);

  return <>
    <div className="work-filter" role="group" aria-label={label}>
      {["", ...shown].map((item) => <button key={item || "all"} type="button" className="chip" aria-pressed={category === item} onClick={() => setCategory(item)}>{item || allLabel}</button>)}
    </div>
    <ul className="work-list">
      {visible.map(({ slug, featured, card }) => <li key={slug} data-featured={featured || undefined}>{card}</li>)}
    </ul>
    {!visible.length && <p role="status">{emptyLabel}</p>}
  </>;
}
