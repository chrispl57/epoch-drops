// components/SearchResultsTabs.tsx
'use client';

import { useMemo, useState } from "react";

export type SearchEntry = {
  name: string;
  kind?: string;
  id?: string | number;
  href?: string;
  qualityClass?: string;
};

type Props = {
  groups: Record<string, SearchEntry[]>;
  order?: string[];
};

const LABELS: Record<string, string> = {
  item: "Items",
  npc: "NPCs",
  quest: "Quests",
  spell: "Spells",
  zone: "Zones",
  object: "Objects",
  other: "Other",
};

export default function SearchResultsTabs({ groups, order = ["item","npc","quest","spell","zone","object","other"] }: Props) {
  const tabs = useMemo(() => order.filter(k => (groups[k]?.length ?? 0) > 0), [groups, order]);
  const [active, setActive] = useState<string>(tabs[0] ?? "item");

  if (tabs.length === 0) return <div>No results.</div>;

  const rows = groups[active] ?? [];

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label="Search result types" className="mb-3 flex flex-wrap gap-2">
        {tabs.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={active === k}
            onClick={() => setActive(k)}
            className={`px-3 py-1 rounded border ${active === k ? "border-yellow-500" : "border-gray-700"}`}
          >
            {LABELS[k] ?? k} <span className="ml-1 text-xs text-gray-400">({groups[k].length})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th className="right">ID</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>
                {r.href ? (
                  <a href={r.href} className={r.qualityClass || ""}>{r.name}</a>
                ) : (
                  <span className={r.qualityClass || ""}>{r.name}</span>
                )}
              </td>
              <td className="muted">{r.kind ?? ""}</td>
              <td className="right">{r.id ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
