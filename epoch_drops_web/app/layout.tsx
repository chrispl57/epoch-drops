// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "../styles/classic-era.css";

export const metadata: Metadata = {
  title: {
    default: "EpochHead",
    template: "%s — EpochHead",
  },
  description: "Community item/NPC database with a classic dark theme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="classic-era">
        <header className="topbar" role="banner">
          <div
            className="page-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            {/* Clickable brand → home (no logo) */}
            <a
              href="/"
              className="brand"
              aria-label="EpochHead — Home"
              style={{ textDecoration: "none" }}
            >
              EpochHead
            </a>

            {/* Quick link back to Search page */}
            <nav className="nav" aria-label="Primary navigation">
              <a href="/search" className="btn btn-ghost" style={{ padding: "6px 10px" }}>
                Search
              </a>
            </nav>
          </div>
        </header>

        <main className="page-wrap" role="main">
          {children}
        </main>

        <footer role="contentinfo">
          <div className="page-wrap">
            © {new Date().getFullYear()} EpochHead
          </div>
        </footer>
      </body>
    </html>
  );
}
