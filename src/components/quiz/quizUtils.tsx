import { useEffect, useMemo, useState } from "react";
import type { IrregularVerb } from "@/data/verbs";
import { uniqueVerbs } from "@/data/verbs";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export function useQuizDeck(size = 10) {
  const [deck, setDeck] = useState<IrregularVerb[]>(() => pickRandom(uniqueVerbs, size));
  const reset = () => setDeck(pickRandom(uniqueVerbs, size));
  return { deck, reset };
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-2 w-full bg-secondary/60 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-accent transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ScoreCard({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const message =
    pct === 100
      ? "Mukammal! 🎉"
      : pct >= 80
        ? "Ajoyib natija!"
        : pct >= 60
          ? "Yaxshi, davom eting!"
          : "Yana mashq qiling 💪";

  return (
    <div className="max-w-lg mx-auto text-center p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-card border border-border/60 shadow-elegant animate-fade-in-up">
      <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Yakun</div>
      <h2 className="font-display text-3xl sm:text-5xl font-bold mb-2">
        {score} / {total}
      </h2>
      <p className="text-xl sm:text-2xl font-display font-semibold mb-1">{pct}%</p>
      <p className="text-muted-foreground mb-8">{message}</p>
      <button
        onClick={onRestart}
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-soft"
      >
        Qayta boshlash
      </button>
    </div>
  );
}

export function useKeydown(key: string, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === key) handler();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [key, handler, enabled]);
}

export function useDistractors(correct: string, field: keyof IrregularVerb, count = 3) {
  return useMemo(() => {
    const pool = uniqueVerbs
      .map((v) => v[field])
      .filter((v) => v !== correct);
    return pickRandom(Array.from(new Set(pool)), count);
  }, [correct, field, count]);
}
