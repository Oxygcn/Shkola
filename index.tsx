import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FrameRoot } from "@dust/frame";
import { theme } from "./theme";
import { GRAD, Aurora, Icon3D } from "./ui";
import { E } from "./assets";
import { Landing } from "./landing";
import { Wizard } from "./wizard";
import { Analyzing, Profile, Quiz } from "./quiz";
import { computeResult } from "./quiz-data";
import type { AcademicData } from "./quiz-data";

type View = "home" | "wizard" | "quiz" | "analyzing" | "profile";
const LABELS: Record<View, string> = {
  home: "",
  wizard: "Этап 1 · Твои данные",
  quiz: "Этап 2 · Тест",
  analyzing: "Этап 2 · Анализ",
  profile: "Этап 2 · Профиль",
};

export default function App() {
  const [view, setView] = useState<View>("home");
  const [data, setData] = useState<AcademicData | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizKey, setQuizKey] = useState(0);
  const result = useMemo(() => computeResult(answers, data, false), [answers, data]);
  const go = useCallback((v: View) => {
    setView(v);
    window.scrollTo({ top: 0 });
  }, []);
  const toProfile = useCallback(() => go("profile"), [go]);

  return (
    <FrameRoot theme={theme} className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
        input::placeholder { color: #6f6a90; }`}</style>
      <Aurora />
      <div className="relative" style={{ zIndex: 1 }}>
        <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="sticky top-0 z-20" style={{ background: "rgba(7,6,13,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <button onClick={() => go("home")} className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 200, scale: 1.1 }} transition={{ duration: 0.6 }}>
                <Icon3D src={E.compass} size={34} />
              </motion.div>
              <span className="font-serif text-lg font-bold text-foreground">Траектория</span>
            </button>
            {view === "home" ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => go("wizard")} className="rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ background: GRAD }}>
                Начать
              </motion.button>
            ) : (
              <motion.span key={view} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-muted-foreground">{LABELS[view]}</motion.span>
            )}
          </div>
        </motion.header>
        <AnimatePresence mode="wait">
          <motion.main key={view === "quiz" ? `quiz-${quizKey}` : view} initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(8px)" }} transition={{ duration: 0.4 }}>
            {view === "home" && <Landing onStart={() => go("wizard")} />}
            {view === "wizard" && <Wizard onHome={() => go("home")} onDone={(d) => { setData(d); go("quiz"); }} />}
            {view === "quiz" && <Quiz data={data} onBack={() => go("wizard")} onFinish={(a) => { setAnswers(a); go("analyzing"); }} />}
            {view === "analyzing" && <Analyzing onDone={toProfile} />}
            {view === "profile" && <Profile result={result} data={data} onRetake={() => { setQuizKey((k) => k + 1); go("quiz"); }} onHome={() => go("home")} />}
          </motion.main>
        </AnimatePresence>
      </div>
    </FrameRoot>
  );
}
