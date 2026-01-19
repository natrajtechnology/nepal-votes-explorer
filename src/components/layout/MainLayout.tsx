import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 lg:py-8">
        {children}
      </main>
      <footer className="border-t border-border bg-muted/30 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>🗳️ Nepal Election Data Analysis & GIS Visualization System</p>
          <p className="mt-1">Data source: Election Commission of Nepal | Last updated: 2079 BS</p>
        </div>
      </footer>
    </div>
  );
}
