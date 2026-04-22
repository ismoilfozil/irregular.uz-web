import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, GraduationCap, MessageCircle, Sparkles } from "lucide-react";

const navItems = [
  { to: "/", label: "Asosiy" },
  { to: "/verbs", label: "Fe'llar" },
  { to: "/quiz", label: "Quizlar" },
];

export function SiteLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Irregular<span className="text-accent">.uz</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-secondary/60 rounded-full p-1">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-background text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/quiz"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-soft"
          >
            <GraduationCap className="w-4 h-4" />
            Mashq qilish
          </Link>

          <nav className="md:hidden flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Ingliz tilidagi noto'g'ri fe'llarni yodlash uchun platforma</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/ismoilfozil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Fikr bildirish
            </a>
            <span>© {new Date().getFullYear()} Irregular.uz</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
