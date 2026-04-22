import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { pickRandom, shuffle, ScoreCard } from "@/components/quiz/quizUtils";
import { uniqueVerbs, type IrregularVerb } from "@/data/verbs";

export const Route = createFileRoute("/quiz/matching")({
  component: MatchingQuiz,
  head: () => ({ meta: [{ title: "Matching quiz — Irregular.uz" }] }),
});

const PAIR_COUNT = 6;

function MatchingQuiz() {
  const [round, setRound] = useState(0);
  const pairs = useMemo<IrregularVerb[]>(
    () => pickRandom(uniqueVerbs, PAIR_COUNT),
    [round]
  );
  const englishCol = useMemo(() => shuffle(pairs), [pairs]);
  const uzbekCol = useMemo(() => shuffle(pairs), [pairs]);

  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedUz, setSelectedUz] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<{ en: string; uz: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);

  const tryMatch = (en: string, uz: string) => {
    setAttempts((a) => a + 1);
    const verb = pairs.find((v) => v.base === en);
    if (verb && verb.uz === uz) {
      setCorrect((c) => c + 1);
      setMatched((prev) => new Set(prev).add(en));
      setSelectedEn(null);
      setSelectedUz(null);
    } else {
      setWrongFlash({ en, uz });
      setTimeout(() => {
        setWrongFlash(null);
        setSelectedEn(null);
        setSelectedUz(null);
      }, 700);
    }
  };

  const onPickEn = (en: string) => {
    if (matched.has(en)) return;
    if (selectedUz) tryMatch(en, selectedUz);
    else setSelectedEn(en);
  };

  const onPickUz = (uz: string) => {
    const verb = pairs.find((v) => v.uz === uz);
    if (verb && matched.has(verb.base)) return;
    if (selectedEn) tryMatch(selectedEn, uz);
    else setSelectedUz(uz);
  };

  const finished = matched.size === pairs.length;

  const restart = () => {
    setRound((r) => r + 1);
    setSelectedEn(null);
    setSelectedUz(null);
    setMatched(new Set());
    setAttempts(0);
    setCorrect(0);
  };

  if (finished) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <ScoreCard score={correct} total={attempts} onRestart={restart} />
      </div>
    );
  }

  const cellState = (
    isMatched: boolean,
    isSelected: boolean,
    isWrong: boolean
  ) => {
    if (isMatched)
      return "border-success bg-success/10 text-success cursor-default";
    if (isWrong)
      return "border-destructive bg-destructive/15 text-destructive";
    if (isSelected)
      return "border-accent bg-accent/15 text-accent-foreground scale-[1.02]";
    return "border-border hover:border-accent hover:bg-accent/5 cursor-pointer";
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">Moslashtiring</h1>
        <span className="text-sm text-muted-foreground">
          {matched.size} / {pairs.length} topildi
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
            Inglizcha
          </div>
          {englishCol.map((v) => {
            const isMatched = matched.has(v.base);
            const isSelected = selectedEn === v.base;
            const isWrong = wrongFlash?.en === v.base;
            return (
              <button
                key={v.base}
                onClick={() => onPickEn(v.base)}
                disabled={isMatched}
                className={`w-full p-3 sm:p-4 rounded-xl border-2 font-display font-semibold text-left text-sm sm:text-base transition-all flex items-center justify-between ${cellState(isMatched, isSelected, isWrong)}`}
              >
                <span>{v.base}</span>
                {isMatched && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
            O'zbekcha
          </div>
          {uzbekCol.map((v) => {
            const isMatched = matched.has(v.base);
            const isSelected = selectedUz === v.uz;
            const isWrong = wrongFlash?.uz === v.uz;
            return (
              <button
                key={v.uz}
                onClick={() => onPickUz(v.uz)}
                disabled={isMatched}
                className={`w-full p-3 sm:p-4 rounded-xl border-2 font-medium text-left text-sm sm:text-base transition-all flex items-center justify-between ${cellState(isMatched, isSelected, isWrong)}`}
              >
                <span>{v.uz}</span>
                {isMatched && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
