import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Brain, Layers, Shuffle, Sparkles, Zap } from "lucide-react";
import { uniqueVerbs } from "@/data/verbs";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Irregular.uz — Noto'g'ri fe'llarni oson o'rganing" },
      {
        name: "description",
        content:
          "Ingliz tilidagi 150+ noto'g'ri fe'llarni o'zbekcha tarjimasi va 4 xil quiz bilan mukammal o'zlashtiring.",
      },
    ],
  }),
});

const features = [
  {
    icon: BookOpen,
    title: "150+ fe'l",
    desc: "Eng ko'p ishlatiladigan noto'g'ri fe'llar to'plami, har biri 3 shakli va o'zbekcha tarjimasi bilan.",
  },
  {
    icon: Brain,
    title: "Multiple Choice",
    desc: "4 ta variantdan to'g'risini tanlang. Tezkor va qiziqarli tekshirish.",
  },
  {
    icon: Zap,
    title: "Yozish testi",
    desc: "Fe'l shakllarini o'zingiz yozib mustahkamlang. Eng samarali usul.",
  },
  {
    icon: Shuffle,
    title: "Matching",
    desc: "Fe'llarni o'zbekcha tarjimasi bilan moslashtiring.",
  },
  {
    icon: Layers,
    title: "Flashcards",
    desc: "Klassik kartochkalar — bir tomonida fe'l, ikkinchisida javob.",
  },
  {
    icon: Sparkles,
    title: "Toza dizayn",
    desc: "Diqqatni jamlashga yordam beradigan, ko'zga yoqimli interfeys.",
  },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.80 0.07 195 / 0.4), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.62 0.10 215 / 0.5), transparent 50%)",
          }}
        />

        <div className="relative container mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white/90 mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span>Yangi: 4 xil quiz rejimi qo'shildi</span>
            </div>

            <h1
              className="font-display text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight text-balance animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Noto'g'ri fe'llarni{" "}
              <span className="bg-gradient-to-r from-[oklch(0.85_0.10_195)] to-white bg-clip-text text-transparent">
                bir umrga
              </span>{" "}
              yodlang
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {uniqueVerbs.length}+ ingliz tilidagi noto'g'ri fe'l, har biri uch shakli va o'zbekcha
              tarjimasi bilan. Quizlar va flashcardlar yordamida mashq qiling.
            </p>

            <div
              className="mt-10 flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/quiz"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-all shadow-elegant hover:shadow-glow"
              >
                Mashqni boshlash
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/verbs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                Fe'llar ro'yxati
              </Link>
            </div>

            <div
              className="mt-14 grid grid-cols-3 gap-6 max-w-lg animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white">
                  {uniqueVerbs.length}+
                </div>
                <div className="text-sm text-white/70 mt-1">Fe'llar</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white">4</div>
                <div className="text-sm text-white/70 mt-1">Quiz turi</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-white/70 mt-1">Bepul</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Imkoniyatlar
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Yodlashni qiziqarli qiladigan to'liq to'plam
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative p-7 rounded-2xl bg-gradient-card border border-border/60 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sample verbs preview */}
      <section className="container mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-card border border-border/60 shadow-elegant overflow-hidden">
          <div className="p-8 md:p-12 flex flex-wrap items-end justify-between gap-6 border-b border-border/60">
            <div>
              <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                Misol uchun
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Eng asosiy fe'llar
              </h2>
            </div>
            <Link
              to="/verbs"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Hammasini ko'rish <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 px-8 md:px-12 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/40">
            <div>V1 (Base)</div>
            <div>V2 (Past)</div>
            <div>V3 (Participle)</div>
            <div>O'zbekcha</div>
          </div>
          <div className="divide-y divide-border/60">
            {uniqueVerbs.slice(0, 7).map((v) => (
              <div
                key={v.base}
                className="grid grid-cols-4 px-8 md:px-12 py-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="font-display font-semibold">{v.base}</div>
                <div className="text-foreground/80">{v.past}</div>
                <div className="text-foreground/80">{v.participle}</div>
                <div className="text-muted-foreground italic">{v.uz}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 md:p-16 text-center shadow-elegant">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, oklch(0.80 0.07 195 / 0.5), transparent 50%)",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white text-balance">
              Tayyormisiz? Birinchi quizni boshlang
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              5 daqiqada 10 ta fe'lni mustahkam yodlab oling.
            </p>
            <Link
              to="/quiz"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-all shadow-elegant"
            >
              Quizga o'tish <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
