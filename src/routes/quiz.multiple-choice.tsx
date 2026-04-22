import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import {
  ProgressBar,
  ScoreCard,
  shuffle,
  useDistractors,
  useQuizDeck,
} from "@/components/quiz/quizUtils";

export const Route = createFileRoute("/quiz/multiple-choice")({
  component: MultipleChoice,
  head: () => ({
    meta: [{ title: "Multiple Choice — Quiz" }],
  }),
});

const FORMS = [
  { key: "past" as const, label: "Past Simple (V2)" },
  { key: "participle" as const, label: "Past Participle (V3)" },
];

function MultipleChoice() {
  const total = 10;
  const { deck, reset } = useQuizDeck(total);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const verb = deck[index];
  const formChoice = useMemo(() => FORMS[Math.floor(Math.random() * FORMS.length)], [verb]);
  const correct = verb[formChoice.key];
  const distractors = useDistractors(correct, formChoice.key, 3);
  const options = useMemo(() => shuffle([correct, ...distractors]), [correct, distractors]);

  const finished = index >= deck.length;

  const handlePick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === correct) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    reset();
    setIndex(0);
    setScore(0);
    setPicked(null);
  };

  if (finished) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <ScoreCard score={score} total={deck.length} onRestart={restart} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>
          Savol {index + 1} / {deck.length}
        </span>
        <span>
          To'g'ri: <span className="text-foreground font-semibold">{score}</span>
        </span>
      </div>
      <ProgressBar value={index} max={deck.length} />

      <div className="mt-6 sm:mt-10 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-card border border-border/60 shadow-elegant animate-fade-in-up">
        <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
          {formChoice.label}
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          {verb.base}
        </h2>
        <p className="text-muted-foreground italic mb-8">{verb.uz}</p>

        <div className="grid sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const isPicked = picked === opt;
            const isCorrect = opt === correct;
            const showState = picked !== null;

            let cls =
              "border-border/60 hover:border-accent hover:bg-accent/5";
            if (showState && isCorrect) cls = "border-success bg-success/10 text-success";
            else if (showState && isPicked && !isCorrect)
              cls = "border-destructive bg-destructive/10 text-destructive";
            else if (showState) cls = "border-border/40 opacity-60";

            return (
              <button
                key={opt}
                onClick={() => handlePick(opt)}
                disabled={picked !== null}
                className={`flex items-center justify-between p-4 rounded-xl border-2 text-left font-medium transition-all ${cls}`}
              >
                <span>{opt}</span>
                {showState && isCorrect && <Check className="w-5 h-5" />}
                {showState && isPicked && !isCorrect && <X className="w-5 h-5" />}
              </button>
            );
          })}
        </div>

        {picked && (
          <button
            onClick={next}
            className="mt-8 w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-soft"
          >
            {index + 1 === deck.length ? "Yakun" : "Keyingi savol →"}
          </button>
        )}
      </div>
    </div>
  );
}
