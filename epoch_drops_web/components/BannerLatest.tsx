
// components/BannerLatest.tsx
import LatestBlogLink from "./LatestBlogLink";
export default function BannerLatest() {
  return (
    <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm">
      Latest update: <LatestBlogLink className="underline font-medium" />
    </div>
  );
}
