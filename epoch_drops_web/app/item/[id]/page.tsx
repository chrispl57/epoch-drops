import React from "react";
import Link from "next/link";
import { getRarityColor } from "@/lib/rarityUtils";

type MobDrop = {
  mobId: number;
  mobName: string;
  mobKillCount: number;
  dropCount: number;
  zone?: string;
  subZone?: string;
};

export type QuestReward = {
  questId: number;
  title: string;
  xp: number;
  money: number;
  sourceMob: string;
  zone: string | null;
  subZone: string | null;
};

type ItemDetails = {
  questRewards: any;
  id: number;
  internalId: number;
  name: string;
  icon: string;
  rarity: number;
  itemType: string | null;
  itemSubType: string | null;
  equipSlot: string | null;
  tooltip: string[];
  mobsThatDrop: MobDrop[];
};

function computeSwingSpeed(tooltip: string[] | undefined | null): number | null {
  if (!Array.isArray(tooltip)) return null;

  let min: number | null = null;
  let max: number | null = null;
  let dps: number | null = null;

  for (const line of tooltip) {
    // e.g. "23 - 32 Damage"
    const dmgMatch = line.match(/(\d+)\s*-\s*(\d+)\s*Damage/i);
    if (dmgMatch) {
      min = parseInt(dmgMatch[1], 10);
      max = parseInt(dmgMatch[2], 10);
    }

    // e.g. "(16.2 damage per second)"
    const dpsMatch = line.match(/([0-9]+(?:\.[0-9]+)?)\s*damage per second/i);
    if (dpsMatch) {
      dps = parseFloat(dpsMatch[1]);
    }
  }

  if (min != null && max != null && dps && dps > 0) {
    const avg = (min + max) / 2;
    const speed = avg / dps; // seconds per swing
    return Math.round(speed * 100) / 100; // 2 decimals (e.g. 1.70)
  }
  return null;
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://epoch-drops-production.up.railway.app/item/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="text-white p-6">❌ Item not found</div>;
  }

  const data: ItemDetails = await res.json();

  const mobsWithChance = data.mobsThatDrop.map((mob) => ({
    ...mob,
    dropChance:
      mob.mobKillCount > 0
        ? `${((mob.dropCount / mob.mobKillCount) * 100).toFixed(2)}%`
        : "0.00%",
  }));

  // Sanitize tooltip: remove empty/falsy lines and duplicate name
  const cleanedTooltip = (data.tooltip || [])
    .filter((line) => line?.trim())
    .filter((line, i) => i !== 0 || line !== data.name);

  // Calculate swing speed and inject it after the DPS line if present
  const swingSpeed = computeSwingSpeed(data.tooltip);
  const displayTooltip = (() => {
    if (!swingSpeed) return cleanedTooltip;

    const arr = [...cleanedTooltip];
    const dpsIndex = arr.findIndex((l) => /damage per second/i.test(l));
    const speedLine = `Speed ${swingSpeed.toFixed(2)}`;

    if (dpsIndex >= 0) {
      arr.splice(dpsIndex + 1, 0, speedLine);
    } else {
      arr.push(speedLine);
    }
    return arr;
  })();

  return (
    <div className="text-white p-6">
      <a href="/">
        <img src="/full-logo.png" className="w-1/4 p-0 mb-[5vh]" />
      </a>

      <div className="bg-black p-4 w-fit rounded-lg border border-white">
        <img
          src={`https://wow.zamimg.com/images/wow/icons/large/${data.icon
            ?.toLowerCase()
            .replace(/ /g, "_")}.jpg`}
          alt={data.name}
          className="w-16 h-16 mb-4 ml-4 border border-gray-600 rounded-md"
        />
        <h1
          className={`text-2xl font-bold ml-4 ${getRarityColor(data.rarity)}`}
        >
          {data.name}
        </h1>
        <h2 className="text-xl font-bold ml-4">{data.itemSubType}</h2>

        <div className="space-y-1 p-4">
          {displayTooltip.length > 0 && (
            <div>
              <ul className="list-none">
                {displayTooltip.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Quest Rewards:</h2>
        {data.questRewards?.length === 0 ? (
          <p>No quests found that reward this item.</p>
        ) : (
          <table className="table-auto border border-gray-700 w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-2 py-1 text-left">Quest</th>
                <th className="px-2 py-1 text-left">Giver</th>
                <th className="px-2 py-1 text-center">XP</th>
                <th className="px-2 py-1 text-center">Money</th>
                <th className="px-2 py-1 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {data.questRewards?.map((qr: any) => (
                <tr
                  key={qr.questId}
                  className="border-t border-gray-600 bg-black"
                >
                  <td className="px-2 py-1">
                    <Link href={`/quest/${qr.questId}`} className="hover:underline">
                      {qr.title}
                    </Link>
                  </td>
                  <td className="px-2 py-1">{qr.sourceMob}</td>
                  <td className="px-2 py-1 text-center">{qr.xp}</td>
                  <td className="px-2 py-1 text-center">{qr.money}</td>
                  <td className="px-2 py-1">
                    {qr.zone || qr.subZone
                      ? `${qr.zone || ""}${qr.subZone ? " – " + qr.subZone : ""}`
                      : "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Dropped By:</h2>
        {mobsWithChance.length === 0 ? (
          <p>No mobs found for this item.</p>
        ) : (
          <table className="table-auto border border-gray-700 w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-2 py-1 text-left">Mob</th>
                <th className="px-2 py-1 text-left">Location</th>
                <th className="px-2 py-1 text-center">Drop Count</th>
                <th className="px-2 py-1 text-center">Drop Rate</th>
              </tr>
            </thead>
            <tbody>
              {mobsWithChance.map((mob) => (
                <tr key={mob.mobId} className="border-t border-gray-600 bg-black">
                  <td className="px-2 py-1">
                    <Link href={`/mob/${mob.mobId}`} className="hover:underline">
                      {mob.mobName}
                    </Link>
                  </td>
                  <td className="px-2 py-1">
                    {mob.zone || mob.subZone
                      ? `${mob.zone || ""}${mob.subZone ? " – " + mob.subZone : ""}`
                      : "Unknown"}
                  </td>
                  <td className="px-2 py-1 text-center">{mob.dropCount}</td>
                  <td className="px-2 py-1 text-center">{mob.dropChance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
