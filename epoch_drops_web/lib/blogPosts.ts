
// lib/blogPosts.ts
export type BlogPost = { slug: string; title: string; date: string; excerpt: string };
export const posts: BlogPost[] = [
  {
    slug: "aug-21-2025-update",
    title: "Project Epoch — August 21, 2025 Update: Smoother Starts, Smarter UI, Stronger World",
    date: "2025-08-21",
    excerpt:
      "Two new minimap zoom levels, timestamped /combatlog sessions, nameplate controls, cameraMode 2, and a sweep of starter-zone, quest, PvP, and performance fixes.",
  },
];
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const latestPost = sortedPosts[0] || null;
