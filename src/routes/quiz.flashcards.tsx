import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { pickRandom } from "@/components/quiz/quizUtils";
import { uniqueVerbs } from "@/data/verbs";

export const Route = createFileRoute("/quiz/flashcards")({
  component: Flashcards,
  head: () => ({ meta: [{ title: "Flashcards — Irregular.uz" }] }),
});

function Flashcards() {
  const [round, setRound] = useState(0);
  const deck = useMemo(() => pickRandom(uniqueVerbs, 20), [round]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const verb = deck[index];

  const next = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, deck.length - 1));
  };
  const prev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">Flashcards</h1>
        <span className="text-sm text-muted-foreground">
          {index + 1} / {deck.length}
        </span>
      </div>

      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-60 sm:h-80 cursor-pointer mb-6 sm:mb-8"
        style={{ perspective: "1200px" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-hero text-white shadow-elegant flex flex-col items-center justify-center p-6 sm:p-8"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 sm:mb-4">
              V1 — Base
            </div>
            <div className="font-display text-4xl sm:text-6xl font-extrabold mb-3 text-balance text-center">
              {verb.base}
            </div>
            <div className="text-white/70 italic mt-4">Aylantiring →</div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-card border border-border shadow-elegant p-5 sm:p-8 flex flex-col justify-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="space-y-5">
              <Row label="V1 — Base" value={verb.base} />
              <Row label="V2 — Past" value={verb.past} />
              <Row label="V3 — Participle" value={verb.participle} />
              <div className="pt-3 border-t border-border/60">
                <Row label="O'zbekcha" value={verb.uz} italic />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-secondary border border-border text-xs sm:text-sm font-semibold disabled:opacity-40 hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Oldingi</span>
        </button>

        <button
          onClick={() => {
            setRound((r) => r + 1);
            setIndex(0);
            setFlipped(false);
          }}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-secondary border border-border text-xs sm:text-sm font-semibold hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> <span className="hidden sm:inline">Aralashtirish</span>
        </button>

        <button
          onClick={next}
          disabled={index === deck.length - 1}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold disabled:opacity-40 hover:bg-primary/90 transition-colors shadow-soft"
        >
          <span className="hidden sm:inline">Keyingi</span> <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, italic }: { label: string; value: string; italic?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className={`font-display text-xl font-semibold text-foreground text-right ${italic ? "italic font-medium text-base text-muted-foreground" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
