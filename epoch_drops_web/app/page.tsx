// app/page.tsx
import CategoryFilter from "@/components/CategoryFilter";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 pt-[20vh]">
      <img src="/full-logo.png" className="w-1/4" alt="Epoch Drops logo" />
      <h1 className="font-bold text-xl">Unoffical Community Item Database</h1>

      {/* Working search form: hitting Enter goes to /search?q=... */}
      <form
        action="/search"
        method="GET"
        role="search"
        aria-label="Site search"
        className="mt-4 w-full max-w-xl flex gap-2"
      >
        <input
          type="search"
          name="q"
          placeholder="Search items, NPCs…"
          autoFocus
          className="flex-1 rounded-md border border-gray-700 bg-[#12161b] px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#56b1ff]"
        />
        <button type="submit" className="btn btn-primary px-4 py-2">
          Search
        </button>
      </form>

      <CategoryFilter />

      <h2 className="font-bold mt-2">
        Want to help gather data? Download the addon{" "}
        <a
          href="https://github.com/sebastianpiresmolin/epoch-drops/blob/main/README.md"
          className="text-blue-400"
        >
          here
        </a>
      </h2>
<h1 className="pt-6 text-xl text-green-500 font-bold">
  <a
    href="https://epochhead.com/blog/aug-21-2025-update"
    className="text-blue-400"
  >
    Project Epoch — August 21, 2025 Update: Smoother Starts, Smarter UI, Stronger World
  </a>
</h1>
    </div>
  );
}
