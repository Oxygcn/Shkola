import { C } from "./ui";
import { E } from "./assets";

export type DirKey = "it" | "eng" | "econ" | "med" | "art" | "law" | "sci" | "media";
export type TraitKey = "logic" | "creative" | "comm" | "practical" | "research" | "lead";
type W = Partial<Record<DirKey, number>>;
type T = Partial<Record<TraitKey, number>>;
type Opt = { label: string; icon: string; w: W; t?: T };

export type Question =
  | { kind: "scale"; block: string; text: string; icon: string; w: W; t?: T }
  | { kind: "choice"; block: string; text: string; icon: string; options: Opt[] }
  | { kind: "duel"; block: string; text: string; icon: string; options: Opt[] };

export type AcademicData = { grade: 9 | 11; scores: Record<string, number>; achievements: number };

export const DIR_KEYS: DirKey[] = ["it", "eng", "econ", "med", "art", "law", "sci", "media"];
export const TRAIT_KEYS: TraitKey[] = ["logic", "creative", "comm", "practical", "research", "lead"];

export const DIRS: { key: DirKey; name: string; short: string; icon: string; color: string; why: string }[] = [
  { key: "it", name: "IT и программирование", short: "IT", icon: E.laptop, color: C.cyan, why: "Тебя привлекают технологии, алгоритмы и создание цифровых продуктов." },
  { key: "eng", name: "Инженерия", short: "Инженерия", icon: E.gear, color: C.violet, why: "Тебе нравится понимать, как устроены механизмы, и создавать что-то осязаемое." },
  { key: "econ", name: "Экономика и бизнес", short: "Экономика", icon: E.money, color: C.amber, why: "Ты мыслишь цифрами и планами, тебе интересно, как работают деньги и компании." },
  { key: "med", name: "Медицина", short: "Медицина", icon: E.stethoscope, color: C.pink, why: "Тебе важно помогать людям, и ты готов(а) к серьёзной подготовке ради этого." },
  { key: "art", name: "Дизайн и творчество", short: "Дизайн", icon: E.palette, color: "#fb923c", why: "У тебя сильное визуальное мышление и желание создавать новое." },
  { key: "law", name: "Право и общество", short: "Право", icon: E.scale, color: "#60a5fa", why: "Тебя волнуют справедливость, правила и то, как устроено общество." },
  { key: "sci", name: "Естественные науки", short: "Науки", icon: E.dna, color: C.lime, why: "Тебе интересно исследовать природу и находить ответы через эксперимент." },
  { key: "media", name: "Медиа и коммуникации", short: "Медиа", icon: E.newspaper, color: "#c084fc", why: "Ты умеешь и любишь доносить мысли до людей: текстом, голосом, видео." },
];

export const TRAITS: { key: TraitKey; name: string; icon: string }[] = [
  { key: "logic", name: "Логическое мышление", icon: E.puzzle },
  { key: "creative", name: "Креативность", icon: E.bulb },
  { key: "comm", name: "Коммуникабельность", icon: E.speech },
  { key: "practical", name: "Практичность", icon: E.tools },
  { key: "research", name: "Исследовательский интерес", icon: E.microscope },
  { key: "lead", name: "Лидерские качества", icon: E.crown },
];

export const BLOCK_COLORS: Record<string, string> = { "Интересы": C.cyan, "Мышление и навыки": C.violet, "Ситуации": C.pink, "Выбор": C.lime };

export const QUESTIONS: Question[] = [
  { kind: "scale", block: "Интересы", icon: E.laptop, text: "Мне интересно разбираться, как устроены программы и приложения", w: { it: 3, eng: 1 }, t: { logic: 1 } },
  { kind: "scale", block: "Интересы", icon: E.tools, text: "Люблю собирать, чинить или конструировать что-то руками", w: { eng: 3, sci: 1 }, t: { practical: 2 } },
  { kind: "scale", block: "Интересы", icon: E.money, text: "Мне нравится планировать бюджет, считать деньги и следить за ценами", w: { econ: 3 }, t: { logic: 1, lead: 1 } },
  { kind: "scale", block: "Интересы", icon: E.stethoscope, text: "Хочу помогать людям сохранять здоровье", w: { med: 3, sci: 1 }, t: { comm: 1 } },
  { kind: "scale", block: "Интересы", icon: E.palette, text: "Я часто рисую, придумываю дизайн или монтирую видео", w: { art: 3, media: 1 }, t: { creative: 2 } },
  { kind: "scale", block: "Интересы", icon: E.scale, text: "Мне интересно, как работают законы и почему общество устроено именно так", w: { law: 3, econ: 1 }, t: { lead: 1, comm: 1 } },
  { kind: "scale", block: "Интересы", icon: E.testtube, text: "Люблю ставить опыты и узнавать, как устроена природа", w: { sci: 3, med: 1 }, t: { research: 2 } },
  { kind: "scale", block: "Интересы", icon: E.speech, text: "Мне нравится писать тексты, вести блог или выступать перед людьми", w: { media: 3, law: 1 }, t: { comm: 2, creative: 1 } },
  { kind: "scale", block: "Мышление и навыки", icon: E.puzzle, text: "Логические задачи и головоломки меня по-настоящему заводят", w: { it: 2, eng: 2, econ: 1 }, t: { logic: 2 } },
  { kind: "scale", block: "Мышление и навыки", icon: E.people, text: "Мне легко найти общий язык с новыми людьми", w: { media: 2, law: 1, med: 1, econ: 1 }, t: { comm: 2 } },
  { kind: "scale", block: "Мышление и навыки", icon: E.books, text: "Я готов(а) долго учиться ради сложной, но важной профессии", w: { med: 2, law: 1, sci: 1 }, t: { research: 1 } },
  { kind: "scale", block: "Мышление и навыки", icon: E.building, text: "Мне важно видеть практический результат своей работы", w: { eng: 2, it: 1, art: 1 }, t: { practical: 2 } },
  {
    kind: "choice", block: "Ситуации", icon: E.star, text: "Свободный вечер. Чем займёшься?",
    options: [
      { label: "Напишу бота или поиграю в стратегию", icon: E.game, w: { it: 3 }, t: { logic: 1 } },
      { label: "Соберу что-то на Arduino или починю велосипед", icon: E.tools, w: { eng: 3 }, t: { practical: 2 } },
      { label: "Посмотрю документалку о космосе или теле человека", icon: E.microscope, w: { sci: 2, med: 2 }, t: { research: 2 } },
      { label: "Сниму ролик или нарисую скетч", icon: E.palette, w: { art: 2, media: 2 }, t: { creative: 2 } },
    ],
  },
  {
    kind: "choice", block: "Ситуации", icon: E.clipboard, text: "Какой школьный проект ты бы выбрал(а)?",
    options: [
      { label: "Разработать мобильное приложение", icon: E.phone, w: { it: 3 }, t: { logic: 1, practical: 1 } },
      { label: "Составить бизнес-план для кафе", icon: E.chart, w: { econ: 3 }, t: { lead: 2 } },
      { label: "Исследовать воду в местной реке", icon: E.seedling, w: { sci: 3, med: 1 }, t: { research: 2 } },
      { label: "Запустить школьную газету или подкаст", icon: E.newspaper, w: { media: 3, art: 1 }, t: { creative: 1, comm: 1 } },
    ],
  },
  {
    kind: "choice", block: "Ситуации", icon: E.people, text: "Какая роль в команде тебе ближе?",
    options: [
      { label: "Генератор идей", icon: E.bulb, w: { art: 2, media: 1 }, t: { creative: 2 } },
      { label: "Организатор и лидер", icon: E.trophy, w: { econ: 2, law: 1 }, t: { lead: 2 } },
      { label: "Аналитик, который всё просчитает", icon: E.barchart, w: { it: 2, sci: 1 }, t: { logic: 2 } },
      { label: "Практик, который доводит до результата", icon: E.tools, w: { eng: 2, med: 1 }, t: { practical: 2 } },
    ],
  },
  {
    kind: "choice", block: "Ситуации", icon: E.globe, text: "Какую проблему мира ты бы хотел(а) решить?",
    options: [
      { label: "Победить тяжёлые болезни", icon: E.heart, w: { med: 3, sci: 1 }, t: { research: 1 } },
      { label: "Спасти экологию планеты", icon: E.seedling, w: { sci: 3, eng: 1 }, t: { research: 1, practical: 1 } },
      { label: "Сделать общество справедливее", icon: E.scale, w: { law: 3, media: 1 }, t: { lead: 1, comm: 1 } },
      { label: "Помочь людям жить богаче", icon: E.money, w: { econ: 3 }, t: { logic: 1, lead: 1 } },
    ],
  },
  {
    kind: "choice", block: "Ситуации", icon: E.rocket, text: "Где ты видишь себя через 10 лет?",
    options: [
      { label: "В крутой IT-компании", icon: E.laptop, w: { it: 3 }, t: { logic: 1 } },
      { label: "На производстве или в лаборатории", icon: E.building, w: { eng: 2, sci: 2 }, t: { research: 1, practical: 1 } },
      { label: "В своём бизнесе", icon: E.chart, w: { econ: 3 }, t: { lead: 2 } },
      { label: "В клинике или больнице", icon: E.stethoscope, w: { med: 3 }, t: { comm: 1 } },
    ],
  },
  {
    kind: "choice", block: "Ситуации", icon: E.books, text: "Какие предметы даются тебе легче всего?",
    options: [
      { label: "Математика и информатика", icon: E.abacus, w: { it: 2, eng: 2, econ: 1 }, t: { logic: 2 } },
      { label: "Биология и химия", icon: E.dna, w: { med: 2, sci: 2 }, t: { research: 2 } },
      { label: "Обществознание и история", icon: E.scale, w: { law: 2, econ: 1 }, t: { comm: 1, lead: 1 } },
      { label: "Литература и языки", icon: E.speech, w: { media: 2, art: 1 }, t: { creative: 2 } },
    ],
  },
  { kind: "duel", block: "Выбор", icon: E.target, text: "Что тебе ближе?", options: [
    { label: "Работать с данными", icon: E.barchart, w: { it: 2, econ: 1, sci: 1 }, t: { logic: 2 } },
    { label: "Работать с людьми", icon: E.people, w: { med: 1, media: 2, law: 1 }, t: { comm: 2 } },
  ] },
  { kind: "duel", block: "Выбор", icon: E.target, text: "Что тебя вдохновляет больше?", options: [
    { label: "Создавать новое", icon: E.bulb, w: { art: 2, it: 1, media: 1 }, t: { creative: 2 } },
    { label: "Улучшать существующее", icon: E.gear, w: { eng: 2, econ: 1, med: 1 }, t: { practical: 2 } },
  ] },
  { kind: "duel", block: "Выбор", icon: E.target, text: "Какие задачи тебе приятнее?", options: [
    { label: "С точным ответом", icon: E.abacus, w: { it: 1, eng: 1, sci: 1, econ: 1 }, t: { logic: 1, research: 1 } },
    { label: "Со свободой интерпретации", icon: E.palette, w: { art: 2, media: 1, law: 1 }, t: { creative: 2 } },
  ] },
  { kind: "duel", block: "Выбор", icon: E.target, text: "Где бы ты хотел(а) работать?", options: [
    { label: "В офисе за компьютером", icon: E.laptop, w: { it: 2, econ: 1, law: 1 }, t: { logic: 1 } },
    { label: "В движении и на выездах", icon: E.compass, w: { eng: 1, med: 1, media: 1, sci: 1 }, t: { practical: 1, comm: 1 } },
  ] },
  { kind: "duel", block: "Выбор", icon: E.target, text: "Что для тебя важнее в карьере?", options: [
    { label: "Стабильность и надёжность", icon: E.building, w: { law: 1, med: 1, eng: 1 }, t: {} },
    { label: "Риск и быстрый рост", icon: E.rocket, w: { econ: 2, it: 1, media: 1 }, t: { lead: 2 } },
  ] },
  { kind: "duel", block: "Выбор", icon: E.target, text: "Как ты предпочитаешь решать задачи?", options: [
    { label: "Обдумать и разобраться в теории", icon: E.brain, w: { sci: 1, law: 1, it: 1 }, t: { research: 1, logic: 1 } },
    { label: "Сразу попробовать руками", icon: E.tools, w: { eng: 2, med: 1, art: 1 }, t: { practical: 2 } },
  ] },
];

const DIR_SUBJ: Record<DirKey, string[]> = {
  it: ["Информатика", "Матем", "Алгебра"],
  eng: ["Физика", "Матем", "Геометрия"],
  econ: ["Матем", "Алгебра", "Обществознание", "Английский"],
  med: ["Биология", "Химия"],
  art: ["Литература"],
  law: ["Обществознание", "История", "Русский"],
  sci: ["Биология", "Химия", "География", "Физика"],
  media: ["Русский", "Литература", "Английский"],
};

export type DirScore = (typeof DIRS)[number] & { pct: number; test: number; acad: number };
export type TraitScore = (typeof TRAITS)[number] & { pct: number };
export type Result = { dirs: DirScore[]; traits: TraitScore[] };

const stretch = (v: number) => Math.max(3, Math.min(99, Math.round(100 * Math.pow(Math.max(0, v), 0.75))));

export function computeResult(answers: Record<number, number>, data: AcademicData | null, liveOnly: boolean): Result {
  const raw: Record<string, number> = {};
  const max: Record<string, number> = {};
  const add = (k: string, r: number, m: number) => {
    raw[k] = (raw[k] ?? 0) + r;
    max[k] = (max[k] ?? 0) + m;
  };
  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    if (liveOnly && a === undefined) return;
    if (q.kind === "scale") {
      const f = a === undefined ? 0 : a / 4;
      DIR_KEYS.forEach((d) => add(d, (q.w[d] ?? 0) * f, q.w[d] ?? 0));
      TRAIT_KEYS.forEach((t) => add(t, (q.t?.[t] ?? 0) * f, q.t?.[t] ?? 0));
    } else {
      const chosen = a === undefined ? undefined : q.options[a];
      DIR_KEYS.forEach((d) => add(d, chosen?.w[d] ?? 0, Math.max(...q.options.map((o) => o.w[d] ?? 0))));
      TRAIT_KEYS.forEach((t) => add(t, chosen?.t?.[t] ?? 0, Math.max(...q.options.map((o) => o.t?.[t] ?? 0))));
    }
  });
  const acadOf = (d: DirKey) => {
    if (!data) return 0.5;
    const vals = Object.entries(data.scores).filter(([k]) => DIR_SUBJ[d].some((p) => k.includes(p))).map(([, v]) => v);
    return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0.5;
  };
  const dirs = DIRS.map((d) => {
    const m = max[d.key] ?? 0;
    const test = m > 0 ? (raw[d.key] ?? 0) / m : 0;
    const acad = acadOf(d.key);
    const final = data ? 0.8 * test + 0.2 * acad : test;
    return { ...d, test, acad, pct: stretch(final) };
  }).sort((a, b) => b.pct - a.pct);
  const traits = TRAITS.map((t) => {
    const m = max[t.key] ?? 0;
    return { ...t, pct: stretch(m > 0 ? (raw[t.key] ?? 0) / m : 0) };
  }).sort((a, b) => b.pct - a.pct);
  return { dirs, traits };
}

export function buildExplanation(r: Result, data: AcademicData | null): string {
  const [top, second, third] = r.dirs;
  const [t1, t2] = r.traits;
  const parts: string[] = [];
  parts.push(`Судя по твоим ответам, тебе ближе всего направление «${top.name}» (${top.pct}%). ${top.why}`);
  parts.push(`У тебя заметно выделяются ${t1.name.toLowerCase()} и ${t2.name.toLowerCase()}.`);
  parts.push(`Также стоит присмотреться к направлениям «${second.name}» и «${third.name}»: они хорошо сочетаются с твоими сильными сторонами.`);
  if (data) {
    if (top.acad >= 0.7) parts.push("Твои оценки по профильным предметам подтверждают этот выбор.");
    else if (top.acad < 0.45) parts.push(`Профильные предметы стоит подтянуть: это заметно расширит выбор ${data.grade === 9 ? "колледжей" : "вузов"}.`);
    else parts.push("Оценки по профильным предметам на хорошем уровне, и есть куда расти.");
    if (data.achievements > 0) parts.push("Твои достижения могут дать дополнительное преимущество при поступлении.");
  }
  const practical = r.traits.find((t) => t.key === "practical")?.pct ?? 0;
  const research = r.traits.find((t) => t.key === "research")?.pct ?? 0;
  parts.push(practical >= research
    ? "При этом тебе лучше подходят прикладные программы, где результат работы можно увидеть на практике."
    : "При этом тебе подойдут программы с исследовательским уклоном и глубокой теоретической базой.");
  return parts.join(" ");
}
