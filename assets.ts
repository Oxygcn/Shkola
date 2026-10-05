// Иконки Solar (Bold Duotone, лицензия CC BY 4.0) через Iconify API.
// Рендерятся как CSS-маска с градиентной заливкой (см. Icon3D в ui.tsx).
const V: [string, string] = ["#c4b5fd", "#8b5cf6"];
const CY: [string, string] = ["#a5f3fc", "#22d3ee"];
const PK: [string, string] = ["#fbcfe8", "#f472b6"];
const LM: [string, string] = ["#ecfccb", "#a3e635"];
const AM: [string, string] = ["#fde68a", "#f59e0b"];
const OR: [string, string] = ["#fed7aa", "#fb923c"];
const BL: [string, string] = ["#bfdbfe", "#60a5fa"];
const PU: [string, string] = ["#f5d0fe", "#c084fc"];

export const ICON_GRAD: Record<string, [string, string]> = {};
const i = (name: string, g: [string, string]) => {
  const url = `https://api.iconify.design/solar/${name}.svg`;
  ICON_GRAD[url] = g;
  return url;
};

export const E = {
  laptop: i("laptop-bold-duotone", CY), gear: i("settings-bold-duotone", V), abacus: i("calculator-bold-duotone", LM),
  palette: i("palette-bold-duotone", OR), stethoscope: i("stethoscope-bold-duotone", PK), scale: i("shield-star-bold-duotone", BL),
  brain: i("brain-bold-duotone", PK), school: i("buildings-2-bold-duotone", CY), cap: i("square-academic-cap-bold-duotone", PK),
  clipboard: i("clipboard-list-bold-duotone", CY), target: i("target-bold-duotone", LM), pin: i("map-point-bold-duotone", AM),
  wand: i("cpu-bolt-bold-duotone", V), robot: i("cpu-bolt-bold-duotone", CY), rocket: i("rocket-2-bold-duotone", PK),
  trophy: i("cup-star-bold-duotone", AM), books: i("book-2-bold-duotone", CY), sparkles: i("stars-bold-duotone", CY),
  bulb: i("lightbulb-bolt-bold-duotone", AM), money: i("wallet-money-bold-duotone", AM), microscope: i("test-tube-bold-duotone", LM),
  puzzle: i("widget-5-bold-duotone", V), tools: i("sledgehammer-bold-duotone", OR), speech: i("chat-round-line-bold-duotone", PU),
  barchart: i("chart-2-bold-duotone", CY), people: i("users-group-rounded-bold-duotone", PU), crystal: i("atom-bold-duotone", V),
  lock: i("lock-keyhole-bold-duotone", V), party: i("confetti-bold-duotone", PK), star: i("star-bold-duotone", AM),
  stopwatch: i("stopwatch-bold-duotone", CY), heart: i("heart-pulse-bold-duotone", PK), testtube: i("test-tube-bold-duotone", LM),
  game: i("gamepad-bold-duotone", V), building: i("buildings-bold-duotone", BL), newspaper: i("document-text-bold-duotone", PU),
  seedling: i("leaf-bold-duotone", LM), chart: i("graph-up-bold-duotone", LM), fire: i("fire-bold-duotone", OR),
  compass: i("compass-bold-duotone", CY), gem: i("crown-star-bold-duotone", AM), check: i("check-circle-bold-duotone", LM),
  medal: i("medal-ribbons-star-bold-duotone", AM), phone: i("smartphone-bold-duotone", CY), globe: i("global-bold-duotone", CY),
  dna: i("dna-bold-duotone", LM), crown: i("crown-bold-duotone", AM),
};
