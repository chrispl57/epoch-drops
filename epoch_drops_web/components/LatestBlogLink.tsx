
// components/LatestBlogLink.tsx
import Link from "next/link";
import { latestPost } from "../lib/blogPosts";
export default function LatestBlogLink({ className = "" }: { className?: string }) {
  if (!latestPost) return null;
  return (
    <Link
      href={`/blog/${latestPost.slug}`}
      className={className || "underline"}
      title={latestPost.title}
    >
      {latestPost.title}
    </Link>
  );
}
