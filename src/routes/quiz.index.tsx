import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Keyboard, Layers, Shuffle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/quiz/")({
  component: QuizHub,
  head: () => ({
    meta: [
      { title: "Quizlar — Irregular.uz" },
      {
        name: "description",
        content: "4 xil quiz rejimi: multiple choice, yozish, matching va flashcards.",
      },
    ],
  }),
});

const modes = [
  {
    to: "/quiz/multiple-choice" as const,
    icon: Brain,
    title: "Multiple Choice",
    desc: "4 ta variantdan to'g'risini tanlang. Boshlash uchun eng oson rejim.",
    accent: "from-[oklch(0.62_0.10_215)] to-[oklch(0.80_0.07_195)]",
  },
  {
    to: "/quiz/typing" as const,
    icon: Keyboard,
    title: "Yozish",
    desc: "Fe'l shaklini o'zingiz yozing. Mustahkam yodlash uchun eng samarali.",
    accent: "from-[oklch(0.38_0.08_230)] to-[oklch(0.62_0.10_215)]",
  },
  {
    to: "/quiz/matching" as const,
    icon: Shuffle,
    title: "Matching",
    desc: "Inglizcha fe'llarni o'zbekcha tarjimasi bilan moslashtiring.",
    accent: "from-[oklch(0.22_0.06_240)] to-[oklch(0.38_0.08_230)]",
  },
  {
    to: "/quiz/flashcards" as const,
    icon: Layers,
    title: "Flashcards",
    desc: "Kartochkalar orqali o'z tezligingizda mashq qiling.",
    accent: "from-[oklch(0.80_0.07_195)] to-[oklch(0.62_0.10_215)]",
  },
];

function QuizHub() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="max-w-3xl mb-12">
        <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
          Mashqlar
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
          Quiz rejimi tanlang
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Har bir rejim turli ko'nikmani mustahkamlaydi. Avval Multiple Choice bilan boshlang,
          keyin Yozishga o'ting.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.to}
              to={m.to}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 p-8 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${m.accent} opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500`}
              />
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.accent} flex items-center justify-center mb-6 shadow-glow`}
                >
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Boshlash <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
