
/* app/layout.tsx example with body class */
import './globals.css';
import '../styles/classic-era.css';

export const metadata = {
  title: 'Epoch Drops',
  description: 'Classic dark theme applied'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="classic-era">
        <header className="topbar">
          <div className="page-wrap">
            <div className="brand">Epoch DB</div>
            <nav className="nav">{/* keep your existing links only */}</nav>
          </div>
        </header>
        <main className="page-wrap">
          {children}
        </main>
        <footer>
          <div className="page-wrap">&copy; {new Date().getFullYear()} Epoch</div>
        </footer>
      </body>
    </html>
  );
}
