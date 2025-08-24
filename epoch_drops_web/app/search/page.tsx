// app/search/page.tsx
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

type SearchParamsPromise = Promise<{ q?: string }>;

type SearchRow = {
  name: string;
  kind?: string;
  id?: string | number;
  href?: string;
  qualityClass?: string;
};

 async function absoluteBaseFromHeaders() {
   const h = await headers();
   const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
   const proto = h.get("x-forwarded-proto") ?? "http";
   return `${proto}://${host}`;
 }

function normalizeKind(kind?: string): string {
  const k = (kind || "").toLowerCase();
  if (["item", "items"].includes(k)) return "item";
  if (["npc", "mob", "creature", "enemy", "unit"].includes(k)) return "npc";
  if (["quest", "quests"].includes(k)) return "quest";
  if (["spell", "spells", "ability"].includes(k)) return "spell";
  if (["zone", "area", "map"].includes(k)) return "zone";
  if (["object", "go", "gameobject"].includes(k)) return "object";
  return "other";
}

// NOTE: NPCs map to /mob/{id} per your app’s routing
function routeFromKind(kind: string | undefined, id: string | number | undefined) {
  const k = normalizeKind(kind);
  if (!id) return undefined;
  if (k === "item") return `/item/${id}`;
  if (k === "npc") return `/mob/${id}`;      // <-- changed from /npc/{id}
  if (k === "quest") return `/quest/${id}`;
  if (k === "spell") return `/spell/${id}`;
  if (k === "zone") return `/zone/${id}`;
  if (k === "object") return `/object/${id}`;
  return undefined;
}

function normalizeResults(json: any): SearchRow[] {
  const arr = Array.isArray(json)
    ? json
    : Array.isArray(json?.results)
    ? json.results
    : Array.isArray(json?.data)
    ? json.data
    : [];

  return arr.map((r: any) => {
    const name = r?.name ?? r?.title ?? r?.label ?? "Unknown";
    const rawKind = r?.type ?? r?.kind ?? r?.category ?? "";
    const kind = normalizeKind(rawKind);
    const id =
      r?.id ??
      r?.itemId ??
      r?.npcId ??
      r?.questId ??
      r?.spellId ??
      r?.zoneId ??
      r?.objectId ??
      r?.slug ??
      undefined;

    const href = r?.href ?? r?.url ?? routeFromKind(kind, id);

    const q = r?.quality ?? r?.rarity ?? r?.q;
    const qualityClass =
      q === 5 || q === "legendary" ? "q-legendary" :
      q === 4 || q === "epic"      ? "q-epic" :
      q === 3 || q === "rare"      ? "q-rare" :
      q === 2 || q === "uncommon"  ? "q-uncommon" :
      q === 1 || q === "common"    ? "q-common" :
      q === 0 || q === "poor"      ? "q-poor" : "";

    return { name, kind, id, href, qualityClass };
  });
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParamsPromise }) {
  const { q = "" } = await searchParams;
  let results: SearchRow[] = [];
  let error: string | null = null;

  if (q) {
    try {
      const base = await absoluteBaseFromHeaders();
      const res = await fetch(`${base}/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
      const json = await res.json();
      results = normalizeResults(json);
    } catch (e: any) {
      error = e?.message ?? "Search failed";
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">Search</div>
      <div className="panel-body">
        <form action="/search" method="GET" style={{ marginBottom: 12 }}>
          <input type="search" name="q" defaultValue={q} placeholder="Search items, NPCs…" />
        </form>

        {error && <div className="badge gold">Error: {error}</div>}
        {!q && <div className="muted">Type a query above.</div>}
        {q && !error && results.length === 0 && <div>No results.</div>}

        {results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th className="right">ID</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
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
        )}
      </div>
    </div>
  );
}
