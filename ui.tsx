import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { ICON_GRAD } from "./assets";

export const C = { violet: "#8b5cf6", cyan: "#22d3ee", pink: "#f472b6", lime: "#a3e635", amber: "#fbbf24" };
export const GRAD = `linear-gradient(120deg, ${C.violet}, ${C.cyan} 50%, ${C.pink})`;
export const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
} as const;

/* ---------------------------------- helpers ---------------------------------- */

export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [d, setD] = useState(value);
  const cur = useRef(value);
  useEffect(() => {
    let raf = 0;
    const from = cur.current;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 700);
      const e = 1 - Math.pow(1 - p, 3);
      const v = from + (value - from) * e;
      cur.current = v;
      setD(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{d.toFixed(decimals)}</>;
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: `linear-gradient(90deg, ${C.violet}, ${C.cyan}, ${C.pink}, ${C.violet})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text" }}
      animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

export function GlowButton({ children, onClick, disabled, variant = "primary" }: { children: ReactNode; onClick: () => void; disabled?: boolean; variant?: "primary" | "ghost" }) {
  if (variant === "ghost") {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-foreground"
        style={glass}
      >
        {children}
      </motion.button>
    );
  }
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.04, boxShadow: `0 0 50px ${C.violet}99` }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className="relative flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold text-white"
      style={{ background: GRAD, boxShadow: `0 0 30px ${C.violet}55`, opacity: disabled ? 0.35 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {!disabled && (
        <motion.span
          className="absolute inset-y-0 w-16"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)", skewX: -20 }}
          initial={{ left: "-30%" }}
          animate={{ left: "130%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/* --------------------------------- background --------------------------------- */

export function Aurora() {
  const blobs = [
    { c: C.violet, s: 560, x: "-12%", y: "-15%", d: 18 },
    { c: C.cyan, s: 460, x: "58%", y: "5%", d: 23 },
    { c: C.pink, s: 420, x: "15%", y: "55%", d: 27 },
    { c: C.violet, s: 360, x: "70%", y: "65%", d: 21 },
  ];
  const particles = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 1 + (i % 3),
    dur: 6 + (i % 7),
    delay: (i % 5) * 0.8,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: b.s, height: b.s, left: b.x, top: b.y, background: `radial-gradient(circle, ${b.c}50 0%, transparent 68%)`, filter: "blur(30px)" }}
          animate={{ x: [0, 90, -50, 0], y: [0, -70, 60, 0], scale: [1, 1.18, 0.9, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Typewriter({ text, start }: { text: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 22);
    return () => clearInterval(id);
  }, [start, text]);
  return (
    <span>
      {text.slice(0, n)}
      <motion.span className="ml-0.5 inline-block h-4 w-0.5 align-middle" style={{ background: C.cyan }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
    </span>
  );
}


/* -------------------------- 3D-иконки и собственные глифы -------------------------- */

export function Icon3D({ src, size = 40, float = false, delay = 0, grad }: { src: string; size?: number; float?: boolean; delay?: number; grad?: [string, string] }) {
  const [a, b] = grad ?? ICON_GRAD[src] ?? ["#c4b5fd", "#22d3ee"];
  const tile = size >= 56;
  const inner = tile ? Math.round(size * 0.56) : size;
  const glyph = (
    <span
      aria-hidden
      className="block"
      style={{
        width: inner,
        height: inner,
        background: `linear-gradient(140deg, ${a} 0%, ${b} 100%)`,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
  return (
    <motion.span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: tile ? size * 0.3 : 0,
        background: tile ? `linear-gradient(150deg, ${b}33, rgba(255,255,255,0.03) 60%)` : undefined,
        border: tile ? `1px solid ${b}55` : undefined,
        boxShadow: tile ? `0 0 ${size * 0.5}px ${b}33, inset 0 1px 0 rgba(255,255,255,0.15)` : undefined,
        backdropFilter: tile ? "blur(10px)" : undefined,
        filter: tile ? undefined : `drop-shadow(0 0 ${Math.max(4, size * 0.2)}px ${b}66)`,
      }}
      animate={float ? { y: [0, -6, 0] } : undefined}
      transition={float ? { duration: 3.2 + delay, repeat: Infinity, ease: "easeInOut", delay } : undefined}
    >
      {tile && <span className="absolute rounded-full" style={{ inset: "18%", background: `radial-gradient(circle, ${b}55, transparent 70%)`, filter: "blur(8px)" }} />}
      <span className="relative">{glyph}</span>
    </motion.span>
  );
}

type GP = { className?: string; style?: CSSProperties };
const glyph = (d: string) =>
  function Glyph({ className = "h-4 w-4", style }: GP) {
    return (
      <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    );
  };
export const ArrowR = glyph("M5 12h14M13 6l6 6-6 6");
export const ArrowL = glyph("M19 12H5M11 6l-6 6 6 6");
export const CheckG = glyph("M5 12.5l4.5 4.5L19 7.5");
export const PlusG = glyph("M12 5v14M5 12h14");
export const XG = glyph("M6 6l12 12M18 6L6 18");
