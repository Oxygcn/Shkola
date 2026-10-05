import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, GRAD, glass, AnimatedNumber, GradientText, GlowButton, Typewriter, Icon3D, ArrowL, ArrowR, CheckG } from "./ui";
import { E } from "./assets";
import { BLOCK_COLORS, DIRS, QUESTIONS, buildExplanation, computeResult } from "./quiz-data";
import type { AcademicData, Result } from "./quiz-data";
import { Journey } from "./wizard";

const SCALE = [
  { l: "Совсем нет", c: C.pink, s: 34 },
  { l: "Скорее нет", c: "#fb923c", s: 40 },
  { l: "Не знаю", c: C.amber, s: 46 },
  { l: "Скорее да", c: C.cyan, s: 52 },
  { l: "Точно да", c: C.lime, s: 58 },
];

const MILESTONES: Record<number, { icon: string; text: string }> = {
  6: { icon: E.fire, text: "Отличный старт! Четверть позади" },
  12: { icon: E.star, text: "Половина пути пройдена!" },
  18: { icon: E.rocket, text: "Финишная прямая!" },
};

const slide = {
  enter: (d: number) => ({ x: d * 90, opacity: 0, rotateY: d * 14, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, rotateY: 0, filter: "blur(0px)" },
  exit: (d: number) => ({ x: -d * 90, opacity: 0, rotateY: -d * 14, filter: "blur(6px)" }),
};

const plural = (n: number) => (n === 1 ? "вопрос" : "вопроса");

/* ------------------------------------ тест ------------------------------------ */

export function Quiz({ data, onFinish, onBack }: { data: AcademicData | null; onFinish: (answers: Record<number, number>) => void; onBack: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [toast, setToast] = useState<{ icon: string; text: string } | null>(null);
  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const live = useMemo(() => computeResult(answers, data, true), [answers, data]);
  const stored = answers[idx];
  const current = picked !== null ? picked : stored !== undefined ? stored : null;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const choose = (v: number) => {
    if (picked !== null) return;
    setPicked(v);
    const next = { ...answers, [idx]: v };
    setAnswers(next);
    setTimeout(() => {
      setPicked(null);
      if (idx + 1 >= total) {
        onFinish(next);
        return;
      }
      const ni = idx + 1;
      const m = MILESTONES[ni];
      if (m && answers[ni] === undefined) setToast(m);
      setDir(1);
      setIdx(ni);
    }, 480);
  };
  const back = () => {
    if (idx === 0) onBack();
    else {
      setDir(-1);
      setIdx(idx - 1);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Journey active={2} />
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-foreground">Вопрос <AnimatedNumber value={idx + 1} /> из {total}</span>
          <span className="font-bold" style={{ color: C.cyan }}><AnimatedNumber value={Math.round((answered / total) * 100)} />%</span>
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((qq, i) => (
            <motion.div
              key={i}
              className="h-1.5 flex-1 rounded-full"
              animate={{
                background: answers[i] !== undefined ? BLOCK_COLORS[qq.block] : i === idx ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
                scaleY: i === idx ? 1.8 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <div style={{ flex: "1 1 520px", minWidth: 0, perspective: 1200 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={idx} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative mt-10 rounded-3xl p-7 pt-14" style={glass}>
              <div className="absolute left-7" style={{ top: -44 }}>
                <Icon3D src={q.icon} size={84} float />
              </div>
              <motion.div className="absolute -right-12 -top-12 h-40 w-40 rounded-full" style={{ background: `radial-gradient(circle, ${BLOCK_COLORS[q.block]}40, transparent 70%)` }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 4, repeat: Infinity }} />
              <p className="relative mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: BLOCK_COLORS[q.block] }}>{q.block}</p>
              <h2 className="relative mb-8 font-serif text-2xl font-bold leading-snug text-foreground">{q.text}</h2>

              {q.kind === "scale" && (
                <div className="relative flex items-end justify-between gap-2">
                  {SCALE.map((s, i) => {
                    const on = current === i;
                    return (
                      <motion.button key={i} onClick={() => choose(i)} whileHover={{ y: -6 }} whileTap={{ scale: 0.9 }} className="flex flex-1 flex-col items-center gap-3">
                        <motion.span
                          className="relative flex items-center justify-center rounded-full"
                          style={{ width: s.s, height: s.s, border: `2px solid ${s.c}` }}
                          animate={{ background: on ? s.c : `${s.c}14`, scale: on ? 1.15 : 1, boxShadow: on ? `0 0 30px ${s.c}` : "0 0 0 rgba(0,0,0,0)" }}
                        >
                          {on && <motion.span className="absolute inset-0 rounded-full" style={{ border: `2px solid ${s.c}` }} initial={{ scale: 1, opacity: 0.9 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 0.6 }} />}
                          {on && <CheckG className="h-5 w-5 text-black" />}
                        </motion.span>
                        <span className="text-center text-xs font-medium" style={{ color: on ? "#fff" : "#8d88ad" }}>{s.l}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {q.kind === "choice" && (
                <div className="relative grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
                  {q.options.map((o, i) => {
                    const on = current === i;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => choose(i)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, borderColor: on ? C.violet : "rgba(255,255,255,0.09)", background: on ? `${C.violet}2e` : "rgba(255,255,255,0.03)", boxShadow: on ? `0 0 34px ${C.violet}55` : "0 0 0 rgba(0,0,0,0)" }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-4 rounded-2xl border p-4 text-left"
                      >
                        <motion.div animate={on ? { rotate: [0, -14, 14, 0], scale: [1, 1.3, 1] } : { rotate: 0, scale: 1 }} transition={{ duration: 0.5 }}>
                          <Icon3D src={o.icon} size={46} />
                        </motion.div>
                        <span className="text-sm font-medium text-foreground">{o.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {q.kind === "duel" && (
                <div className="relative grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                  {q.options.map((o, i) => {
                    const on = current === i;
                    const c = i === 0 ? C.cyan : C.pink;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => choose(i)}
                        initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0, borderColor: on ? c : "rgba(255,255,255,0.09)", background: on ? `${c}26` : "rgba(255,255,255,0.03)", boxShadow: on ? `0 0 44px ${c}55` : "0 0 0 rgba(0,0,0,0)" }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center gap-4 rounded-3xl border px-5 py-8 text-center"
                      >
                        <Icon3D src={o.icon} size={72} float delay={i * 0.6} />
                        <span className="font-serif text-lg font-semibold text-foreground">{o.label}</span>
                      </motion.button>
                    );
                  })}
                  <motion.div
                    className="pointer-events-none absolute flex h-12 w-12 items-center justify-center rounded-full font-serif text-xs font-bold text-white"
                    style={{ left: "50%", top: "50%", x: "-50%", y: "-50%", background: GRAD, boxShadow: `0 0 30px ${C.violet}` }}
                    animate={{ scale: [1, 1.14, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    или
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between">
            <GlowButton variant="ghost" onClick={back}><ArrowL /> Назад</GlowButton>
            {stored !== undefined && idx + 1 < total && (
              <GlowButton variant="ghost" onClick={() => { setDir(1); setIdx(idx + 1); }}>Дальше <ArrowR /></GlowButton>
            )}
          </div>
        </div>

        <div className="space-y-4" style={{ flex: "1 1 260px", minWidth: 0 }}>
          <div className="rounded-3xl p-5" style={glass}>
            <div className="mb-4 flex items-center gap-2">
              <Icon3D src={E.barchart} size={28} />
              <p className="font-serif text-sm font-semibold text-foreground">Живой профиль</p>
              <motion.span className="ml-auto h-2 w-2 rounded-full" style={{ background: C.lime }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            </div>
            {answered < 3 ? (
              <p className="text-sm text-muted-foreground">Ответь ещё на {3 - answered} {plural(3 - answered)}, и профиль начнёт формироваться.</p>
            ) : (
              <div className="space-y-3">
                {live.dirs.slice(0, 4).map((d) => (
                  <motion.div key={d.key} layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                    <div className="mb-1.5 flex items-center gap-2 text-sm">
                      <Icon3D src={d.icon} size={22} />
                      <span className="flex-1 text-foreground">{d.short}</span>
                      <span className="font-bold" style={{ color: d.color }}><AnimatedNumber value={d.pct} />%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <motion.div className="h-full rounded-full" style={{ background: d.color, boxShadow: `0 0 10px ${d.color}` }} animate={{ width: `${d.pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {answered >= 3 && (
              <motion.div key={live.dirs[0].key} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="rounded-3xl p-5" style={{ ...glass, border: `1px solid ${C.violet}55` }}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon3D src={E.robot} size={26} float />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.violet }}>AI замечает</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  Похоже, тебя тянет к направлению «{live.dirs[0].name}». Продолжай отвечать, картина уточняется.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed bottom-6 z-30 flex items-center gap-3 rounded-full px-6 py-3"
            style={{ left: "50%", x: "-50%", background: "rgba(20,17,38,0.9)", border: `1px solid ${C.violet}66`, boxShadow: `0 10px 40px ${C.violet}55`, backdropFilter: "blur(14px)" }}
          >
            <Icon3D src={toast.icon} size={30} />
            <span className="whitespace-nowrap text-sm font-semibold text-foreground">{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- анализ ---------------------------------- */

const ANALYZE_STEPS = ["Анализируем интересы", "Оцениваем стиль мышления", "Сопоставляем с оценками", "Строим профиль направлений"];

export function Analyzing({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 750);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (n >= ANALYZE_STEPS.length + 1) onDone();
  }, [n, onDone]);
  const orbit = [E.brain, E.bulb, E.chart, E.puzzle];
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="relative mb-10" style={{ width: 240, height: 240 }}>
        {[0, 1, 2].map((r) => (
          <motion.div
            key={r}
            className="absolute rounded-full"
            style={{ inset: r * 26, border: `1.5px dashed ${[C.violet, C.cyan, C.pink][r]}66` }}
            animate={{ rotate: r % 2 ? -360 : 360 }}
            transition={{ duration: 8 + r * 4, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
          {orbit.map((src, i) => {
            const a = (i / orbit.length) * Math.PI * 2;
            return (
              <motion.div key={i} className="absolute" style={{ left: 120 + 108 * Math.cos(a) - 18, top: 120 + 108 * Math.sin(a) - 18 }} animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                <Icon3D src={src} size={36} />
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div className="absolute flex items-center justify-center rounded-full" style={{ inset: 70, background: `radial-gradient(circle, ${C.violet}66, transparent 70%)` }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <Icon3D src={E.crystal} size={90} float />
        </motion.div>
      </div>
      <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">AI <GradientText>анализирует</GradientText> ответы</h2>
      <p className="mb-8 text-sm text-muted-foreground">Собираем твой профиль из теста и оценок</p>
      <div className="w-full space-y-3 text-left">
        {ANALYZE_STEPS.map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0, x: -20 }} animate={{ opacity: n >= i ? 1 : 0.25, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 rounded-2xl px-4 py-3" style={glass}>
            <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: n > i ? C.lime : "rgba(255,255,255,0.08)" }}>
              {n > i ? (
                <CheckG className="h-3.5 w-3.5 text-black" />
              ) : n === i ? (
                <motion.span className="h-3 w-3 rounded-full border-2 border-t-transparent" style={{ borderColor: C.cyan, borderTopColor: "transparent" }} animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
              ) : null}
            </div>
            <span className="text-sm text-foreground">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- профиль ---------------------------------- */

function Confetti() {
  const cols = [C.violet, C.cyan, C.pink, C.lime, C.amber];
  const pieces = Array.from({ length: 46 }, (_, i) => {
    const a = (i / 46) * Math.PI * 2;
    const r = 150 + (i % 6) * 38;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.7 - 90, c: cols[i % 5], rot: (i * 47) % 360, w: 6 + (i % 3) * 3 };
  });
  return (
    <div className="pointer-events-none absolute left-1/2 top-40" style={{ zIndex: 5 }}>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-sm"
          style={{ width: p.w, height: p.w * 0.5 + 3, background: p.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 300], opacity: [1, 1, 0], rotate: p.rot * 3, scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut", delay: 0.2 }}
        />
      ))}
    </div>
  );
}

function Radar({ result }: { result: Result }) {
  const cx = 140, cy = 140, R = 100;
  const ordered = DIRS.map((d) => result.dirs.find((x) => x.key === d.key)).filter((x) => x !== undefined);
  const n = ordered.length;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const poly = ordered.map((d, i) => pt(i, d.pct / 100).join(",")).join(" ");
  return (
    <svg viewBox="-45 -5 370 290" className="mx-auto w-full" style={{ maxWidth: 360 }} role="img" aria-label="Радар направлений">
      <defs>
        <linearGradient id="radarg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} />
          <stop offset="100%" stopColor={C.cyan} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((l) => (
        <polygon key={l} points={ordered.map((_, i) => pt(i, l).join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,0.08)" />
      ))}
      {ordered.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" />;
      })}
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ originX: "140px", originY: "140px" }}>
        <polygon points={poly} fill="url(#radarg)" fillOpacity={0.35} stroke={C.cyan} strokeWidth={2} strokeLinejoin="round" />
        {ordered.map((d, i) => {
          const [x, y] = pt(i, d.pct / 100);
          return <circle key={d.key} cx={x} cy={y} r={4.5} fill={d.color} stroke="#07060d" strokeWidth={1.5} />;
        })}
      </motion.g>
      {ordered.map((d, i) => {
        const [x, y] = pt(i, 1.2);
        return (
          <text key={d.key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600" fill="#c4c0de">
            {d.short}
          </text>
        );
      })}
    </svg>
  );
}

export function Profile({ result, data, onRetake, onHome }: { result: Result; data: AcademicData | null; onRetake: () => void; onHome: () => void }) {
  const [top, second, third] = result.dirs;
  const text = useMemo(() => buildExplanation(result, data), [result, data]);
  const basis = [
    `${QUESTIONS.length} ответов теста`,
    data ? (data.grade === 9 ? "Аттестат и ОГЭ" : "Баллы ЕГЭ") : "Без учёта оценок",
    data && data.achievements > 0 ? `Достижения: ${data.achievements}` : null,
  ].filter((x): x is string => x !== null);

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10">
      <Confetti />
      <Journey active={3} />
      <div className="mb-8 text-center">
        <motion.div className="mb-3 flex justify-center" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
          <Icon3D src={E.party} size={72} float />
        </motion.div>
        <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">Твой профиль <GradientText>готов</GradientText></h2>
        <p className="text-muted-foreground">Вот направления, которые подходят тебе больше всего</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative mb-5 overflow-hidden rounded-3xl p-8" style={{ ...glass, border: `1px solid ${top.color}66`, boxShadow: `0 0 80px ${top.color}22` }}>
        <motion.div className="absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: `radial-gradient(circle, ${top.color}45, transparent 70%)` }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} />
        <div className="relative flex flex-wrap items-center gap-8">
          <Icon3D src={top.icon} size={112} float />
          <div style={{ flex: "1 1 240px" }}>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${top.color}22`, color: top.color }}>
              <Icon3D src={E.star} size={14} /> Лучшее совпадение
            </span>
            <h3 className="mb-2 font-serif text-3xl font-bold text-foreground">{top.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{top.why}</p>
          </div>
          <p className="font-serif text-6xl font-bold" style={{ color: top.color, textShadow: `0 0 40px ${top.color}88` }}>
            <AnimatedNumber value={top.pct} />%
          </p>
        </div>
      </motion.div>

      <div className="mb-5 grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {[second, third].map((d, i) => (
          <motion.div key={d.key} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.1 }} whileHover={{ y: -6 }} className="flex items-center gap-5 rounded-3xl p-6" style={glass}>
            <Icon3D src={d.icon} size={60} float delay={i} />
            <div className="flex-1">
              <p className="mb-2 font-serif font-semibold text-foreground">{d.name}</p>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                <motion.div className="h-full rounded-full" style={{ background: d.color, boxShadow: `0 0 12px ${d.color}` }} initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ duration: 1.1, delay: 0.5 + i * 0.1 }} />
              </div>
            </div>
            <p className="font-serif text-3xl font-bold" style={{ color: d.color }}><AnimatedNumber value={d.pct} />%</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-3xl p-6" style={{ ...glass, flex: "1 1 300px", minWidth: 0 }}>
          <p className="mb-2 font-serif font-semibold text-foreground">Карта направлений</p>
          <Radar result={result} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-3xl p-6" style={{ ...glass, flex: "1 1 320px", minWidth: 0 }}>
          <p className="mb-5 font-serif font-semibold text-foreground">Все направления</p>
          <div className="space-y-4">
            {result.dirs.map((d, i) => (
              <motion.div key={d.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.06 }}>
                <div className="mb-1.5 flex items-center gap-2 text-sm">
                  <Icon3D src={d.icon} size={22} />
                  <span className="flex-1 text-foreground">{d.name}</span>
                  <span className="font-bold" style={{ color: d.color }}>{d.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: d.color }} initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ duration: 1, delay: 0.8 + i * 0.06 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-5 rounded-3xl p-6" style={glass}>
        <p className="mb-5 font-serif font-semibold text-foreground">Твои сильные стороны</p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
          {result.traits.map((t, i) => (
            <motion.div key={t.key} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.07 }} whileHover={{ y: -5, background: "rgba(255,255,255,0.06)" }} className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.025)" }}>
              <Icon3D src={t.icon} size={42} float delay={i * 0.4} />
              <p className="text-xs font-medium text-muted-foreground">{t.name}</p>
              <p className="font-serif text-xl font-bold" style={{ color: i < 2 ? C.lime : C.cyan }}><AnimatedNumber value={t.pct} /></p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="relative mb-5 overflow-hidden rounded-3xl p-7" style={{ ...glass, border: `1px solid ${C.violet}66` }}>
        <motion.div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${C.violet}50, transparent 70%)` }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} />
        <div className="relative mb-4 flex flex-wrap items-center gap-3">
          <Icon3D src={E.robot} size={44} float />
          <div>
            <p className="font-serif font-semibold text-foreground">AI-навигатор объясняет</p>
            <p className="text-xs text-muted-foreground">Почему тебе подходят именно эти направления</p>
          </div>
        </div>
        <p className="relative mb-5 text-base leading-relaxed text-foreground">«<Typewriter text={text} start />»</p>
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Учтено:</span>
          {basis.map((b) => (
            <span key={b} className="rounded-full px-3 py-1 text-xs font-medium text-foreground" style={{ background: "rgba(255,255,255,0.06)" }}>{b}</span>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5" style={{ ...glass, borderStyle: "dashed" }}>
        <div className="flex items-center gap-4">
          <Icon3D src={data?.grade === 9 ? E.school : E.cap} size={48} />
          <div>
            <p className="font-serif font-semibold text-foreground">Подбор {data?.grade === 9 ? "колледжей и техникумов" : "вузов"} под твой профиль</p>
            <p className="text-sm text-muted-foreground">Появится на этапе 3: город, баллы, бюджет, проходные, форма обучения</p>
          </div>
        </div>
        <span className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${C.cyan}22`, color: C.cyan }}>
          <Icon3D src={E.lock} size={14} /> Этап 3
        </span>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3">
        <GlowButton variant="ghost" onClick={onRetake}><ArrowL /> Пройти тест заново</GlowButton>
        <GlowButton variant="ghost" onClick={onHome}>На главную</GlowButton>
      </div>
    </div>
  );
}
