
// app/blog/page.tsx
import Link from "next/link";
import { sortedPosts as posts } from "../../lib/blogPosts";
export const metadata = {
  title: "Blog | EpochHead",
  description: "Patch notes, updates, and dev logs for Project Epoch.",
};
export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-neutral-700 pb-6">
            <article>
              <header className="mb-2">
                <h2 className="text-xl font-semibold">
                  <Link className="hover:underline" href={`/blog/${p.slug}`}>
                    {p.title}
                  </Link>
                </h2>
                <time className="text-sm opacity-75" dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </header>
              <p className="opacity-90">{p.excerpt}</p>
              <div className="mt-3">
                <Link className="text-sm underline" href={`/blog/${p.slug}`}>
                  Read more →
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
