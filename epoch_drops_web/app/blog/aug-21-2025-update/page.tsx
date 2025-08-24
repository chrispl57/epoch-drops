// app/blog/aug-21-2025-update/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Project Epoch — August 21, 2025 Update | EpochHead Blog",
  description:
    "Smoother starts, smarter UI, and a blitz of world fixes: minimap zoom, timestamped combat logs, cameraMode 2, nameplate upgrades, PvP XP sharing, and more.",
};

export default function Post_Aug212025() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-invert max-w-none">
        <p className="mb-6">
          <Link href="/blog" className="no-underline hover:underline text-sm">← Back to Blog</Link>
        </p>
        <header className="mb-6">
          <h1 className="text-3xl font-bold leading-tight">Project Epoch — August 21, 2025 Update: Smoother Starts, Smarter UI, Stronger World</h1>
          <time className="block text-sm opacity-75 mt-2" dateTime="2025-08-21">August 21, 2025</time>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">TL;DR Highlights</h2>
          <ul className="list-disc pl-6">
            <li>No more trade pop-ups while you talk to NPCs, use Mail, or the AH.</li>
            <li>Two extra minimap zoom levels for better readability.</li>
            <li><code>/combatlog</code> now starts a session with a timestamped file prefix.</li>
            <li>
              Nameplate upgrades: <code>nameplateZ</code>, <code>nameplateDistance</code>, <code>nameplateIntersectOpacity</code>, <code>nameplateIntersectUseCamera</code>, <code>nameplateIntersectM2</code>, <code>nameplateFadeIn</code>, <code>nameplateShowPersonal</code>, <code>nameplateShowPersonalPosition</code>, <code>nameplateInCombatOnly</code>.
            </li>
            <li>New camera option: <code>/console cameraMode 2</code> makes small objects turn transparent instead of the camera colliding.</li>
            <li>Class & combat fixes including Seal of Justice + CoR, Pyroclasm, Omen of Clarity, and poison proc rates (pending restart).</li>
            <li>Leveling smoother: dynamic spawns, shorter timers, better starter-zone directions and text fixes.</li>
            <li>PvP sanity: shared XP for BG kills and proper WSG Mark cap at 100.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Quality of Life & UI</h2>
          <h3 className="text-lg font-semibold mt-4 mb-1">Fewer Interruptions</h3>
          <p>
            You’ll no longer receive trade requests while interacting with NPCs, the Mailbox, or the Auction House.
            Enjoy fewer accidental clicks and a smoother flow between questing and banking.
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-1">Better Map & Nameplates</h3>
          <ul className="list-disc pl-6">
            <li>Two new minimap zoom levels help with resource hunting and pathing.</li>
            <li>
              Nameplate controls provide cleaner stacking, saner line-of-sight, and customizable personal resource bars.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-1">Camera That Gets Out of the Way</h3>
          <p>
            Use <code>/console cameraMode 2</code> to stop the camera from colliding with small props—objects become
            transparent instead of snapping the view.
          </p>

          <h3 className="text-lg font-semibold mt-4 mb-1">Cleaner Logs for Parsers</h3>
          <p>
            Starting <code>/combatlog</code> now prefixes your file with a timestamp, making combat sessions easier to
            sort and share.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Combat, Classes & Items</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Seal of Justice + Curse of Recklessness no longer locks enemies in CC; both are re-enabled.</li>
            <li>Crippling Poison & Mind-Numbing Poison proc rates corrected (pending restart).</li>
            <li>Pyroclasm (Warlock) and Omen of Clarity (Druid) behave as intended.</li>
            <li>Attuned Wand now deals magical damage with correct values.</li>
            <li>Elder Mottled Boars won’t spam Charge.</li>
            <li>Low-level itemization pass (balance & disenchanting fixes), including crafted items that previously couldn’t be disenchanted.</li>
            <li>Vendor and category cleanups (two-handed PvP weapons category, Rookie’s Shoulders, reputation-vendor items can’t be disenchanted).</li>
            <li>Emergency Rations: consumed on use, not BoP, no cooldown, with a proper vendor price.</li>
            <li>Icon and naming fixes (e.g., Heavy Girdle icon; Spider Tank Parts no longer labeled “Relic of the Past”).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Leveling Flow, Quests & World Fixes</h2>
          <h3 className="text-lg font-semibold mt-4 mb-1">Starter Zones: Troll & Gnome</h3>
          <ul className="list-disc pl-6">
            <li>Graveyards added (hackfix) to Gnome start to prevent softlocks (temporary; may cause oddities outside).</li>
            <li>Removed cross-zone prerequisites (e.g., Dark Storms, Frostmane Hold) for cleaner Troll/Gnome starts.</li>
            <li>Asset and doodad improvements in Gnome start & Dun Morogh; Anvilmar building bugs addressed.</li>
            <li>Darkspear Isle map aligned (it was 3 pixels off).</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-1">Dynamic Spawns & Timers</h3>
          <ul className="list-disc pl-6">
            <li>Shorter default respawns for many low-level targets and chests.</li>
            <li>Dynamic respawns corrected/added: Baron Longshore, Harvest Golems, Bloodtail Nests, Minor Manifestation of Fire (30s), many Blizzard-named mobs (60s).</li>
            <li>Additional spawns for Moonkin Oracle; terrain fix for a stuck Spitelash Screamer.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-1">Questing Polish</h3>
          <ul className="list-disc pl-6">
            <li>Clearer text/directions for The Loa of Death, Barroom Blitz, A Proper Sendoff, Commission for Wullian Oaksmelter.</li>
            <li>Gnoll Rustlers cage spawns refined.</li>
            <li>Blood Petal Bushes trackable with Find Herbs while on their quest.</li>
            <li>Smart Drinks: Wailing Essence now drops for every party member.</li>
            <li>A Refugee’s Quandary: objects no longer appear as herbs or multi-lootable.</li>
            <li>Kor’gar’s Orb & Jo’gon’s Rod “miss” behavior corrected.</li>
            <li>Garrick Padfoot gets reduced default spawn plus dynamics.</li>
            <li>Call to Skirmish: daily cap per quest; suicides (e.g., drowning) no longer grant credit.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-1">Zone & World Cleanups</h3>
          <ul className="list-disc pl-6">
            <li>Rendering/performance passes in Orgrimmar and Durnholde Keep; Valley of Winds now has a distinct area name.</li>
            <li>Out-of-date NPCs removed (e.g., Ironforge Airfield); Frax Bucketdrop properly removed.</li>
            <li>Old Durotar Zeppelin tower closed—use Orgrimmar instead.</li>
            <li>Pickpocketing removed from starter mobs.</li>
            <li>Loot table cleanups: Elder Ice Claw Bears 100% BoE removed; Amethyst Crab gains custom loot; excess spawns removed from Mrrgll Cave.</li>
            <li>Vendor/service fixes: Gilna Goldbolt repairs + sells low-level consumables; Samor Festivus no longer sells infinite Healing Potions.</li>
            <li>Placeholder gossip cleaned up (e.g., Bolrannach); movement speed normalized for Gnome/Troll starting mobs.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">PvP & Battlegrounds</h2>
          <ul className="list-disc pl-6">
            <li>Shared XP for battleground kills—no more KB-only benefit.</li>
            <li>Warsong Gulch Marks of Honor properly cap at 100 (up from 20).</li>
            <li>Razor Hill Grunts correctly flagged for PvP.</li>
            <li>Exploits closed: no PvP reward farming via alts; no rare-elite loot leaking to regular creatures.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Systems & Stability</h2>
          <ul className="list-disc pl-6">
            <li>Soul of Iron re-enabled.</li>
            <li>Enchanting profession quest items no longer have a sell price.</li>
            <li>Transmog-related server freeze and a Scarlet Bane crash fixed.</li>
            <li>Graveyard/spawn logic tuned to reduce low-level friction.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Known Notes & Restarts</h2>
          <ul className="list-disc pl-6">
            <li>Crippling/Mind-Numbing Poison proc fix requires a server restart.</li>
            <li>Gnome graveyard hackfix prevents softlocks now; a proper solution is planned.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Pro Tips</h2>
          <p>Prefer a cleaner view in cluttered areas? Run:</p>
          <pre className="mt-2 mb-4"><code>/console cameraMode 2</code></pre>
          <p>Start a clean parse before raids or BGs:</p>
          <pre className="mt-2"><code>/combatlog</code></pre>
        </section>
      </article>
    </main>
  );
}
