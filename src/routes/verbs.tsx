import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { uniqueVerbs } from "@/data/verbs";

export const Route = createFileRoute("/verbs")({
  component: VerbsPage,
  head: () => ({
    meta: [
      { title: "Fe'llar ro'yxati — Irregular.uz" },
      {
        name: "description",
        content:
          "150+ ingliz tilidagi noto'g'ri fe'llarning 3 shakli va o'zbekcha tarjimasi. Qidiruv bilan oson topish.",
      },
    ],
  }),
});

function VerbsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return uniqueVerbs;
    return uniqueVerbs.filter(
      (v) =>
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.participle.toLowerCase().includes(q) ||
        v.uz.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
          To'liq ro'yxat
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
          Noto'g'ri fe'llar
        </h1>
        <p className="mt-3 sm:mt-4 text-muted-foreground text-base sm:text-lg">
          Jami {uniqueVerbs.length} ta fe'l. Inglizcha yoki o'zbekcha bo'yicha qidiring.
        </p>
      </div>

      <div className="sticky top-14 sm:top-16 z-30 bg-background/80 backdrop-blur-xl py-3 sm:py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-4 sm:mb-6 border-b border-border/60">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidiruv: go, ketmoq, took..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-secondary/60 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 overflow-hidden shadow-soft bg-card">
        <div className="overflow-x-auto">
          <div className="min-w-[480px]">
            <div className="grid grid-cols-12 px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/40 border-b border-border/60">
              <div className="col-span-3">V1 — Base</div>
              <div className="col-span-3">V2 — Past Simple</div>
              <div className="col-span-3">V3 — Past Participle</div>
              <div className="col-span-3">O'zbekcha</div>
            </div>
            {filtered.length === 0 ? (
              <div className="p-8 sm:p-12 text-center text-muted-foreground">
                Hech narsa topilmadi. Boshqa so'z bilan urinib ko'ring.
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {filtered.map((v) => (
                  <div
                    key={v.base}
                    className="grid grid-cols-12 px-4 sm:px-6 py-3 sm:py-4 hover:bg-secondary/40 transition-colors text-sm sm:text-base"
                  >
                    <div className="col-span-3 font-display font-semibold text-foreground">
                      {v.base}
                    </div>
                    <div className="col-span-3 text-foreground/80">{v.past}</div>
                    <div className="col-span-3 text-foreground/80">{v.participle}</div>
                    <div className="col-span-3 text-muted-foreground italic">{v.uz}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
