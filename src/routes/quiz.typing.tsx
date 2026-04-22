import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { ProgressBar, ScoreCard, useQuizDeck } from "@/components/quiz/quizUtils";

export const Route = createFileRoute("/quiz/typing")({
  component: TypingQuiz,
  head: () => ({ meta: [{ title: "Yozish quiz — Irregular.uz" }] }),
});

const FORMS = [
  { key: "past" as const, label: "Past Simple (V2)" },
  { key: "participle" as const, label: "Past Participle (V3)" },
];

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function isAnswerCorrect(answer: string, correct: string) {
  // accept either side of "was/were" or "got/gotten"
  const a = normalize(answer);
  const variants = correct.split("/").map(normalize);
  return variants.includes(a);
}

function TypingQuiz() {
  const total = 10;
  const { deck, reset } = useQuizDeck(total);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const verb = deck[index];
  const formChoice = useMemo(
    () => FORMS[Math.floor(Math.random() * FORMS.length)],
    [verb]
  );
  const correct = verb?.[formChoice.key] ?? "";
  const finished = index >= deck.length;
  const isCorrect = submitted && isAnswerCorrect(answer, correct);

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const submit = () => {
    if (submitted || !answer.trim()) return;
    setSubmitted(true);
    if (isAnswerCorrect(answer, correct)) setScore((s) => s + 1);
  };

  const next = () => {
    setSubmitted(false);
    setAnswer("");
    setIndex((i) => i + 1);
  };

  const restart = () => {
    reset();
    setIndex(0);
    setScore(0);
    setAnswer("");
    setSubmitted(false);
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
          {formChoice.label} ni yozing
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">{verb.base}</h2>
        <p className="text-muted-foreground italic mb-8">{verb.uz}</p>

        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (submitted) next();
              else submit();
            }
          }}
          disabled={submitted}
          placeholder="Javobingizni yozing..."
          className={`w-full px-5 py-4 rounded-xl border-2 text-lg font-display font-semibold focus:outline-none transition-all ${
            submitted
              ? isCorrect
                ? "border-success bg-success/10 text-success"
                : "border-destructive bg-destructive/10 text-destructive"
              : "border-border focus:border-accent focus:ring-2 focus:ring-accent/30 bg-background"
          }`}
          autoComplete="off"
        />

        {submitted && (
          <div className="mt-5 p-4 rounded-xl bg-secondary/60 border border-border/60 flex items-center gap-3">
            {isCorrect ? (
              <>
                <Check className="w-5 h-5 text-success" />
                <span className="font-medium">To'g'ri javob!</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-destructive" />
                <span>
                  To'g'ri javob:{" "}
                  <span className="font-display font-bold text-foreground">{correct}</span>
                </span>
              </>
            )}
          </div>
        )}

        <button
          onClick={submitted ? next : submit}
          disabled={!submitted && !answer.trim()}
          className="mt-8 w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-soft"
        >
          {submitted
            ? index + 1 === deck.length
              ? "Yakun"
              : "Keyingi →"
            : "Javobni tekshirish (Enter)"}
        </button>
      </div>
    </div>
  );
}
