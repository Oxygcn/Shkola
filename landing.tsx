import { useState } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { C, GRAD, glass, AnimatedNumber, GradientText, GlowButton, Typewriter, Icon3D, ArrowR } from "./ui";
import { E } from "./assets";

/* ----------------------------------- landing ----------------------------------- */

const ORBIT_ICONS: { src: string; c: string }[] = [
  { src: E.laptop, c: C.cyan }, { src: E.gear, c: C.violet }, { src: E.abacus, c: C.lime },
  { src: E.palette, c: C.pink }, { src: E.stethoscope, c: C.cyan }, { src: E.scale, c: C.amber },
];

function Orbit() {
  const size = 340, R = 145, r2 = 92;
  return (
    <motion.div className="relative mx-auto" style={{ width: size, height: size }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }}>
      <motion.div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(139,92,246,0.28)" }} animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
        {ORBIT_ICONS.map(({ src, c }, i) => {
          const a = (i / ORBIT_ICONS.length) * Math.PI * 2;
          return (
            <motion.div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ ...glass, left: size / 2 + R * Math.cos(a) - 24, top: size / 2 + R * Math.sin(a) - 24, boxShadow: `0 0 24px ${c}40` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            >
              <Icon3D src={src} size={30} />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="absolute rounded-full"
        style={{ inset: size / 2 - r2, border: "1px dashed rgba(34,211,238,0.35)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute h-2.5 w-2.5 rounded-full" style={{ background: C.cyan, top: -5, left: "50%", boxShadow: `0 0 14px ${C.cyan}` }} />
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{ inset: size / 2 - 52, background: `radial-gradient(circle at 30% 30%, ${C.pink}, ${C.violet} 55%, #2a1660)`, boxShadow: `0 0 80px ${C.violet}aa, inset 0 0 30px rgba(255,255,255,0.25)` }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon3D src={E.brain} size={52} float grad={["#ffffff", "#e9d5ff"]} />
      </motion.div>
    </motion.div>
  );
}

const DIRECTIONS = ["IT и программирование", "Инженерия", "Экономика", "Медицина", "Дизайн", "Право", "Биотех", "Робототехника", "Журналистика", "Архитектура", "Психология", "Гейм-дев"];

function Marquee() {
  const items = [...DIRECTIONS, ...DIRECTIONS];
  return (
    <div className="relative overflow-hidden py-6" style={{ maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}>
      <motion.div className="flex w-max gap-3" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        {items.map((d, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-foreground" style={glass}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: [C.violet, C.cyan, C.pink][i % 3] }} />
            {d}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const STEPS: { src: string; t: string; d: string; c: string }[] = [
  { src: E.school, t: "Выбери класс", d: "После 9-го — колледжи и техникумы, после 11-го — университеты.", c: C.violet },
  { src: E.clipboard, t: "Введи результаты", d: "Аттестат и ОГЭ или баллы ЕГЭ, плюс олимпиады и достижения.", c: C.cyan },
  { src: E.brain, t: "Пройди тест", d: "20–30 вопросов о твоих интересах, мышлении и стиле работы.", c: C.pink },
  { src: E.target, t: "Получи профиль", d: "Процент совпадения с каждым направлением: IT, инженерия, экономика…", c: C.lime },
  { src: E.pin, t: "Подбор заведений", d: "Город, баллы, бюджет или платное, проходные, предметы, форма обучения.", c: C.amber },
  { src: E.wand, t: "AI объясняет", d: "Не чат сбоку, а часть системы: понятный разбор, почему тебе подходит именно это.", c: C.violet },
];

function StepsSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }} className="mb-12 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: C.cyan }}>Как это работает</p>
        <h2 className="font-serif text-3xl font-bold text-foreground">6 шагов до <GradientText>своего пути</GradientText></h2>
      </motion.div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        {STEPS.map(({ src, t, d, c }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8, boxShadow: `0 20px 60px ${c}30`, borderColor: `${c}80` }}
            className="group relative overflow-hidden rounded-3xl p-6"
            style={glass}
          >
            <motion.div className="absolute -right-10 -top-10 h-32 w-32 rounded-full" style={{ background: `radial-gradient(circle, ${c}40, transparent 70%)` }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 4 + i, repeat: Infinity }} />
            <div className="relative mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${c}22`, border: `1px solid ${c}55` }}>
                <Icon3D src={src} size={30} />
              </div>
              <span className="font-serif text-4xl font-bold" style={{ color: "rgba(255,255,255,0.07)" }}>0{i + 1}</span>
            </div>
            <h3 className="relative mb-2 font-serif text-lg font-semibold text-foreground">{t}</h3>
            <p className="relative text-sm leading-relaxed text-muted-foreground">{d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const AI_TEXT = "Судя по твоим результатам, тебе подходят программы, связанные с программированием. У тебя высокий результат по логическому мышлению и интересу к технологиям. При этом тебе лучше подходят прикладные направления, где результат работы можно увидеть на практике.";

const DEMO_PROFILE = [
  { n: "IT", v: 87, c: C.cyan },
  { n: "Инженерия", v: 72, c: C.violet },
  { n: "Экономика", v: 61, c: C.pink },
];

function AISection() {
  const [seen, setSeen] = useState(false);
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <motion.div onViewportEnter={() => setSeen(true)} viewport={{ once: true, amount: 0.4 }} className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl p-7" style={glass}>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: C.pink }}>Пример профиля</p>
          <h3 className="mb-6 font-serif text-2xl font-bold text-foreground">Тебе подходят</h3>
          <div className="space-y-5">
            {DEMO_PROFILE.map((p, i) => (
              <div key={p.n}>
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span className="text-foreground">{p.n}</span>
                  <span style={{ color: p.c }}>{seen ? <AnimatedNumber value={p.v} /> : 0}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${p.c}66, ${p.c})`, boxShadow: `0 0 16px ${p.c}` }} initial={{ width: 0 }} animate={{ width: seen ? `${p.v}%` : 0 }} transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeOut" }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative overflow-hidden rounded-3xl p-7" style={{ ...glass, border: `1px solid ${C.violet}55` }}>
          <motion.div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full" style={{ background: `radial-gradient(circle, ${C.violet}50, transparent 70%)` }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} />
          <div className="relative mb-5 flex items-center gap-3">
            <motion.div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: GRAD }} animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Icon3D src={E.robot} size={28} />
            </motion.div>
            <div>
              <p className="font-semibold text-foreground">AI-навигатор</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                анализирует профиль
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="h-1 w-1 rounded-full" style={{ background: C.cyan }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, delay: d * 0.2, repeat: Infinity }} />
                ))}
              </div>
            </div>
          </div>
          <p className="relative text-base leading-relaxed text-foreground">
            «<Typewriter text={AI_TEXT} start={seen} />»
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function Landing({ onStart }: { onStart: () => void }) {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spot = useMotionTemplate`radial-gradient(500px circle at ${mx}px ${my}px, rgba(139,92,246,0.16), transparent 45%)`;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const title = ["Найди", "направление,", "которое"];
  return (
    <div>
      <section className="relative" onMouseMove={onMove}>
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 pb-10 pt-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-foreground" style={glass}>
              <Icon3D src={E.sparkles} size={18} />
              Профориентация нового поколения с AI
            </motion.div>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-foreground">
              {title.map((w, i) => (
                <motion.span key={w} className="mr-3 inline-block" initial={{ opacity: 0, y: 50, rotateX: -60 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  {w}
                </motion.span>
              ))}
              <motion.span className="inline-block" initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <GradientText>твоё</GradientText>
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="mb-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              Ответь на вопросы, введи баллы и пройди тест. Мы подберём колледжи и вузы под тебя, а AI объяснит, почему именно они.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.5 }} className="flex flex-wrap items-center gap-3">
              <GlowButton onClick={onStart}>
                Начать путь <ArrowR />
              </GlowButton>
              <span className="text-sm text-muted-foreground">≈ 10 минут · бесплатно</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="mt-10 flex flex-wrap gap-8">
              {[
                { v: "20–30", l: "вопросов теста" },
                { v: "7", l: "параметров подбора" },
                { v: "AI", l: "разбор результата" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-2xl font-bold" style={{ color: C.cyan }}>{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <Orbit />
        </div>
        <Marquee />
      </section>
      <StepsSection />
      <AISection />
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-3xl p-10 text-center" style={{ background: `linear-gradient(135deg, ${C.violet}33, ${C.cyan}22, ${C.pink}33)`, border: "1px solid rgba(255,255,255,0.12)" }}>
          <motion.div className="absolute inset-0" style={{ background: `conic-gradient(from 0deg, transparent, ${C.violet}30, transparent 30%)` }} animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
          <div className="relative">
            <div className="mb-4 flex justify-center"><Icon3D src={E.rocket} size={76} float /></div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">Готов узнать, куда поступать?</h2>
            <p className="mb-7 text-muted-foreground">Начни с пары простых вопросов.</p>
            <div className="flex justify-center">
              <GlowButton onClick={onStart}>Поехали <ArrowR /></GlowButton>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

