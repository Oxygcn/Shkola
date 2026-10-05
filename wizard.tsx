import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, GRAD, glass, AnimatedNumber, GradientText, GlowButton, Icon3D, ArrowL, ArrowR, CheckG, PlusG, XG } from "./ui";
import { E } from "./assets";
import type { AcademicData } from "./quiz-data";

/* ----------------------------------- wizard ----------------------------------- */

type Grade = 9 | 11;
const ATT_SUBJECTS = ["Русский язык", "Литература", "Алгебра", "Геометрия", "Физика", "Химия", "Биология", "История", "Обществознание", "География", "Информатика", "Английский язык"];
const OGE_REQ = ["Русский язык", "Математика"];
const OGE_OPT = ["Информатика", "Физика", "Обществознание", "Биология", "Химия", "География", "Английский язык", "История", "Литература"];
const EGE_OPT = ["Информатика", "Физика", "Обществознание", "Химия", "Биология", "История", "Английский язык", "Литература", "География"];
const ACH_9 = ["Аттестат с отличием", "Победитель/призёр олимпиады", "Значок ГТО", "Волонтёрство", "Спортивный разряд", "Творческие конкурсы"];
const ACH_11 = ["Золотая/серебряная медаль", "Победитель/призёр олимпиады", "Значок ГТО", "Итоговое сочинение", "Волонтёрство", "Индивидуальный проект"];
const JOURNEY = ["Класс", "Результаты", "Тест", "Профиль", "Подбор", "AI-разбор"];

const gradeColor = (v: number) => (v >= 5 ? C.lime : v === 4 ? C.cyan : v === 3 ? C.amber : C.pink);
const scoreColor = (v: number) => (v >= 80 ? C.lime : v >= 60 ? C.cyan : v >= 40 ? C.amber : C.pink);

export function Journey({ active }: { active: number }) {
  return (
    <div className="mb-10">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-4 right-4 top-4 h-0.5" style={{ background: "rgba(255,255,255,0.08)" }} />
        <motion.div className="absolute left-4 top-4 h-0.5" style={{ background: GRAD, boxShadow: `0 0 12px ${C.violet}` }} animate={{ width: `calc(${(active / (JOURNEY.length - 1)) * 100}% - ${(active / (JOURNEY.length - 1)) * 2}rem)` }} transition={{ duration: 0.6, ease: "easeInOut" }} />
        {JOURNEY.map((j, i) => {
          const done = i < active, cur = i === active;
          return (
            <div key={j} className="relative flex flex-col items-center gap-2" style={{ width: 64 }}>
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                animate={{ scale: cur ? 1.15 : 1, background: done || cur ? GRAD : "#16142a", boxShadow: cur ? `0 0 24px ${C.violet}` : "0 0 0 transparent" }}
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: done || cur ? "#fff" : "#6f6a90" }}
              >
                {done ? <CheckG className="h-4 w-4" /> : i >= 4 && !cur ? <Icon3D src={E.lock} size={16} /> : i + 1}
              </motion.div>
              <span className="text-center text-xs font-medium" style={{ color: cur ? "#f4f2ff" : "#7d78a0" }}>{j}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GradePicker({ id, values, value, onChange }: { id: string; values: number[]; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
      {values.map((v) => (
        <button key={v} onClick={() => onChange(v)} className="relative h-8 w-9 rounded-lg text-sm font-bold">
          {value === v && <motion.span layoutId={`gp-${id}`} className="absolute inset-0 rounded-lg" style={{ background: gradeColor(v), boxShadow: `0 0 14px ${gradeColor(v)}88` }} transition={{ type: "spring", stiffness: 500, damping: 34 }} />}
          <span className="relative" style={{ color: value === v ? "#0b0a14" : "#8d88ad" }}>{v}</span>
        </button>
      ))}
    </div>
  );
}

function ScoreSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const c = scoreColor(value);
  return (
    <div className="relative h-6 w-full">
      <div className="absolute left-0 right-0 top-2.5 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div className="h-full rounded-full" animate={{ width: `${value}%`, background: c }} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ boxShadow: `0 0 12px ${c}` }} />
      </div>
      <motion.div className="pointer-events-none absolute top-0.5 h-5 w-5 rounded-full bg-white" animate={{ left: `calc(${value}% - 10px)`, boxShadow: `0 0 0 4px ${c}55, 0 0 18px ${c}` }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 w-full cursor-pointer opacity-0" aria-label="Баллы" />
    </div>
  );
}

export function Ring({ value, max, label, display }: { value: number; max: number; label: string; display: ReactNode }) {
  const r = 46, circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 110 110" className="absolute inset-0 h-full w-full -rotate-90">
        <defs>
          <linearGradient id="ringg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={C.violet} />
            <stop offset="50%" stopColor={C.cyan} />
            <stop offset="100%" stopColor={C.pink} />
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <motion.circle cx="55" cy="55" r={r} fill="none" stroke="url(#ringg)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} animate={{ strokeDashoffset: circ * (1 - pct) }} transition={{ duration: 0.8, ease: "easeOut" }} />
      </svg>
      <div className="text-center">
        <p className="font-serif text-2xl font-bold text-foreground">{display}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Chip({ active, onClick, children, disabled }: { active: boolean; onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      animate={{ background: active ? `${C.violet}33` : "rgba(255,255,255,0.04)", borderColor: active ? C.violet : "rgba(255,255,255,0.1)" }}
      className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium"
      style={{ color: active ? "#fff" : disabled ? "#5a5675" : "#c4c0de", cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: 14, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="overflow-hidden">
            <CheckG className="h-3.5 w-3.5" style={{ color: C.cyan }} />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}

export function Panel({ title, icon, color, right, children, delay = 0 }: { title: string; icon: string; color: string; right?: ReactNode; children: ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay }} className="rounded-3xl p-6" style={glass}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}22`, border: `1px solid ${color}55` }}>
            <Icon3D src={icon} size={26} />
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
        </div>
        {right}
      </div>
      {children}
    </motion.div>
  );
}

function ClassCard({ g, selected, onSelect }: { g: Grade; selected: boolean; onSelect: () => void }) {
  const is9 = g === 9;
  const c = is9 ? C.cyan : C.pink;
  const src = is9 ? E.school : E.cap;
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, borderColor: selected ? c : "rgba(255,255,255,0.09)", boxShadow: selected ? `0 0 60px ${c}40` : "0 0 0 transparent" }}
      transition={{ duration: 0.45, delay: is9 ? 0.1 : 0.2 }}
      whileHover={{ y: -10, rotateX: 4, rotateY: is9 ? 4 : -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-3xl border p-8 text-left"
      style={{ ...glass, perspective: 800 }}
    >
      <motion.div className="absolute -right-16 -top-16 h-48 w-48 rounded-full" style={{ background: `radial-gradient(circle, ${c}50, transparent 70%)` }} animate={{ scale: selected ? [1, 1.4, 1.2] : 1 }} transition={{ duration: 0.8 }} />
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full" style={{ background: c }}>
            <CheckG className="h-4 w-4 text-black" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: `${c}22`, border: `1px solid ${c}66` }}>
          <Icon3D src={src} size={44} float />
        </div>
        <p className="mb-1 font-serif text-5xl font-bold" style={{ color: c }}>{g}</p>
        <p className="mb-4 font-serif text-lg font-semibold text-foreground">класс</p>
        <p className="mb-5 text-sm text-muted-foreground">{is9 ? "Колледжи и техникумы. Поступление по аттестату и ОГЭ." : "Университеты и институты. Поступление по баллам ЕГЭ."}</p>
        <div className="flex flex-wrap gap-2">
          {(is9 ? ["Аттестат", "ОГЭ", "СПО"] : ["ЕГЭ", "Бакалавриат", "Специалитет"]).map((t) => (
            <span key={t} className="rounded-full px-3 py-1 text-xs font-medium text-foreground" style={{ background: "rgba(255,255,255,0.06)" }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function Wizard({ onHome, onDone }: { onHome: () => void; onDone: (d: AcademicData) => void }) {
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [att, setAtt] = useState<Record<string, number>>(() => Object.fromEntries(ATT_SUBJECTS.map((s) => [s, 4])));
  const [ogeOpt, setOgeOpt] = useState<string[]>([]);
  const [oge, setOge] = useState<Record<string, number>>({});
  const [mathType, setMathType] = useState<"profile" | "base">("profile");
  const [egeOpt, setEgeOpt] = useState<string[]>([]);
  const [ege, setEge] = useState<Record<string, number>>({});
  const [ach, setAch] = useState<string[]>([]);
  const [olymp, setOlymp] = useState<string[]>([]);
  const [olympInput, setOlympInput] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string, max?: number) => {
    if (arr.includes(v)) set(arr.filter((x) => x !== v));
    else if (max === undefined || arr.length < max) set([...arr, v]);
  };

  const attAvg = ATT_SUBJECTS.reduce((s, k) => s + (att[k] ?? 4), 0) / ATT_SUBJECTS.length;
  const egeSubjects = ["Русский язык", ...(mathType === "profile" ? ["Математика (профиль)"] : []), ...egeOpt];
  const egeSum = egeSubjects.reduce((s, k) => s + (ege[k] ?? 60), 0);
  const ogeAll = [...OGE_REQ, ...ogeOpt];
  const ogeAvg = ogeAll.reduce((s, k) => s + (oge[k] ?? 4), 0) / ogeAll.length;
  const achList = grade === 9 ? ACH_9 : ACH_11;

  const canNext = step === 0 ? grade !== null : step === 1 ? (grade === 9 ? ogeOpt.length === 2 : egeOpt.length >= 1) : true;
  const hint = grade === 9 ? `Выбери 2 предмета ОГЭ по выбору (${ogeOpt.length}/2)` : "Выбери хотя бы 1 предмет ЕГЭ по выбору";

  const buildData = (): AcademicData => {
    const sc: Record<string, number> = {};
    if (grade === 9) {
      ATT_SUBJECTS.forEach((k) => { sc[k] = ((att[k] ?? 4) - 3) / 2; });
      ogeAll.forEach((k) => {
        const v = ((oge[k] ?? 4) - 2) / 3;
        const prev = sc[k];
        sc[k] = prev === undefined ? v : (prev + v) / 2;
      });
    } else {
      egeSubjects.forEach((k) => { sc[k] = (ege[k] ?? 60) / 100; });
      if (mathType === "base") sc["Математика (база)"] = ((ege["Математика (база)"] ?? 4) - 2) / 3;
    }
    return { grade: grade ?? 11, scores: sc, achievements: ach.length + olymp.length };
  };

  const addOlymp = () => {
    const v = olympInput.trim();
    if (v && !olymp.includes(v)) setOlymp([...olymp, v]);
    setOlympInput("");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Journey active={step === 2 ? 2 : step} />
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }}>
            <div className="mb-8 text-center">
              <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">После какого класса <GradientText>уходишь?</GradientText></h2>
              <p className="text-muted-foreground">От этого зависит, какие учебные заведения мы будем подбирать.</p>
            </div>
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              <ClassCard g={9} selected={grade === 9} onSelect={() => setGrade(9)} />
              <ClassCard g={11} selected={grade === 11} onSelect={() => setGrade(11)} />
            </div>
          </motion.div>
        )}

        {step === 1 && grade === 9 && (
          <motion.div key="s1-9" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }} className="space-y-5">
            <div className="mb-2 text-center">
              <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">Твои <GradientText>результаты</GradientText></h2>
              <p className="text-muted-foreground">Оценки аттестата и экзамены ОГЭ.</p>
            </div>
            <Panel title="Аттестат" icon={E.books} color={C.cyan} right={<Ring value={attAvg - 2} max={3} label="средний балл" display={<AnimatedNumber value={attAvg} decimals={2} />} />}>
              <div className="grid gap-x-6 gap-y-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                {ATT_SUBJECTS.map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.03 }} className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2" style={{ background: "rgba(255,255,255,0.025)" }}>
                    <span className="text-sm text-foreground">{s}</span>
                    <GradePicker id={`att-${s}`} values={[3, 4, 5]} value={att[s] ?? 4} onChange={(v) => setAtt({ ...att, [s]: v })} />
                  </motion.div>
                ))}
              </div>
            </Panel>
            <Panel title="ОГЭ" icon={E.clipboard} color={C.violet} delay={0.1} right={<Ring value={ogeAvg - 2} max={3} label="средняя оценка" display={<AnimatedNumber value={ogeAvg} decimals={1} />} />}>
              <p className="mb-3 text-sm text-muted-foreground">Предметы по выбору (2):</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {OGE_OPT.map((s) => (
                  <Chip key={s} active={ogeOpt.includes(s)} disabled={!ogeOpt.includes(s) && ogeOpt.length >= 2} onClick={() => toggle(ogeOpt, setOgeOpt, s, 2)}>{s}</Chip>
                ))}
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                <AnimatePresence>
                  {ogeAll.map((s) => (
                    <motion.div key={s} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2" style={{ background: "rgba(255,255,255,0.025)" }}>
                      <span className="text-sm text-foreground">{s}{OGE_REQ.includes(s) && <span className="ml-2 text-xs" style={{ color: C.pink }}>обяз.</span>}</span>
                      <GradePicker id={`oge-${s}`} values={[2, 3, 4, 5]} value={oge[s] ?? 4} onChange={(v) => setOge({ ...oge, [s]: v })} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Panel>
          </motion.div>
        )}

        {step === 1 && grade === 11 && (
          <motion.div key="s1-11" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }} className="space-y-5">
            <div className="mb-2 text-center">
              <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">Твои баллы <GradientText>ЕГЭ</GradientText></h2>
              <p className="text-muted-foreground">Двигай ползунки. Если экзамен ещё впереди, укажи ожидаемый балл.</p>
            </div>
            <Panel title="ЕГЭ" icon={E.clipboard} color={C.pink} right={<Ring value={egeSum} max={egeSubjects.length * 100} label={`сумма из ${egeSubjects.length * 100}`} display={<AnimatedNumber value={egeSum} />} />}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground">Математика:</span>
                <div className="flex gap-1 rounded-full p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                  {(["profile", "base"] as const).map((m) => (
                    <button key={m} onClick={() => setMathType(m)} className="relative rounded-full px-4 py-1.5 text-sm font-semibold">
                      {mathType === m && <motion.span layoutId="mathtype" className="absolute inset-0 rounded-full" style={{ background: GRAD }} transition={{ type: "spring", stiffness: 500, damping: 34 }} />}
                      <span className="relative" style={{ color: mathType === m ? "#fff" : "#8d88ad" }}>{m === "profile" ? "Профильная" : "Базовая"}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {mathType === "base" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">оценка</span>
                      <GradePicker id="mathbase" values={[2, 3, 4, 5]} value={ege["Математика (база)"] ?? 4} onChange={(v) => setEge({ ...ege, "Математика (база)": v })} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">Предметы по выбору:</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {EGE_OPT.map((s) => (
                  <Chip key={s} active={egeOpt.includes(s)} disabled={!egeOpt.includes(s) && egeOpt.length >= 4} onClick={() => toggle(egeOpt, setEgeOpt, s, 4)}>{s}</Chip>
                ))}
              </div>
              <div className="space-y-3">
                <AnimatePresence>
                  {egeSubjects.map((s) => {
                    const v = ege[s] ?? 60;
                    return (
                      <motion.div key={s} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.025)" }}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{s}</span>
                            <motion.span className="font-serif text-lg font-bold" animate={{ color: scoreColor(v) }}>{v}</motion.span>
                          </div>
                          <ScoreSlider value={v} onChange={(nv) => setEge({ ...ege, [s]: nv })} />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </Panel>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-center">
            <motion.div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full" style={{ background: GRAD, boxShadow: `0 0 70px ${C.violet}` }} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
              <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.35 }} />
              </svg>
            </motion.div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">Данные <GradientText>собраны</GradientText></h2>
            <p className="mb-8 text-muted-foreground">Это основа для подбора. Следующий шаг: профориентационный тест.</p>
            <div className="mb-8 grid gap-4 text-left" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {[
                { l: "Класс", v: `${grade} класс`, c: C.cyan },
                grade === 9
                  ? { l: "Средний балл аттестата", v: attAvg.toFixed(2), c: C.lime }
                  : { l: "Сумма ЕГЭ", v: `${egeSum}`, c: C.lime },
                { l: grade === 9 ? "ОГЭ" : "Предметы ЕГЭ", v: grade === 9 ? ogeAll.join(", ") : egeSubjects.join(", "), c: C.violet },
                { l: "Достижения", v: ach.length + olymp.length > 0 ? `${ach.length + olymp.length} шт.` : "не указаны", c: C.pink },
              ].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }} className="rounded-2xl p-5" style={glass}>
                  <p className="mb-1 text-xs text-muted-foreground">{s.l}</p>
                  <p className="font-semibold" style={{ color: s.c }}>{s.v}</p>
                </motion.div>
              ))}
            </div>
            <motion.button onClick={() => onDone(buildData())} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative mb-8 block w-full overflow-hidden rounded-3xl p-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div className="absolute" style={{ inset: "-150%", background: `conic-gradient(from 0deg, transparent 0deg, ${C.violet} 60deg, ${C.cyan} 120deg, transparent 180deg)` }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
              <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-background px-6 py-5 text-left">
                <div className="flex items-center gap-4">
                  <Icon3D src={E.brain} size={52} float />
                  <div>
                    <p className="font-serif font-semibold text-foreground">Профориентационный тест · 24 вопроса</p>
                    <p className="text-sm text-muted-foreground">Около 5 минут. Профиль строится прямо во время ответов</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ background: GRAD, boxShadow: `0 0 24px ${C.violet}88` }}>
                  Начать тест <ArrowR />
                </span>
              </div>
            </motion.button>
            <div className="flex flex-wrap justify-center gap-3">
              <GlowButton variant="ghost" onClick={() => setStep(1)}><ArrowL /> Изменить данные</GlowButton>
              <GlowButton variant="ghost" onClick={onHome}>На главную</GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && grade !== null && (
        <div className="mt-5">
          <Panel title="Достижения и олимпиады" icon={E.trophy} color={C.amber} delay={0.2}>
            <p className="mb-3 text-sm text-muted-foreground">Отметь, что у тебя есть. Это может дать дополнительные баллы.</p>
            <div className="mb-5 flex flex-wrap gap-2">
              {achList.map((a) => (
                <Chip key={a} active={ach.includes(a)} onClick={() => toggle(ach, setAch, a)}>{a}</Chip>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={olympInput}
                onChange={(e) => setOlympInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addOlymp(); }}
                placeholder="Название олимпиады, например «Высшая проба»"
                className="flex-1 rounded-full px-5 py-3 text-sm text-foreground outline-none"
                style={{ ...glass, minWidth: 0 }}
              />
              <motion.button whileHover={{ scale: 1.08, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={addOlymp} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: GRAD }} aria-label="Добавить">
                <PlusG className="h-5 w-5 text-white" />
              </motion.button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <AnimatePresence>
                {olymp.map((o) => (
                  <motion.span key={o} layout initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-foreground" style={{ background: `${C.amber}22`, border: `1px solid ${C.amber}55` }}>
                    <Icon3D src={E.medal} size={16} />
                    {o}
                    <button onClick={() => setOlymp(olymp.filter((x) => x !== o))} aria-label="Удалить"><XG className="h-3.5 w-3.5 text-muted-foreground" /></button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </Panel>
        </div>
      )}

      {step < 2 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <GlowButton variant="ghost" onClick={() => (step === 0 ? onHome() : setStep(step - 1))}>
            <ArrowL /> Назад
          </GlowButton>
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {!canNext && step === 1 && (
                <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-muted-foreground">{hint}</motion.span>
              )}
            </AnimatePresence>
            <GlowButton disabled={!canNext} onClick={() => setStep(step + 1)}>
              Дальше <ArrowR />
            </GlowButton>
          </div>
        </div>
      )}
    </div>
  );
}

