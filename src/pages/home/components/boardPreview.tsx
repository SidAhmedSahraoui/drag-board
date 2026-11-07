import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Tag = "Design" | "Dev" | "Bug" | "Docs";
type Card = { title: string; tag: Tag; who: string };

const tagStyle: Record<Tag, string> = {
  Design: "bg-violet-500/20 text-violet-300",
  Dev: "bg-sky-500/20 text-sky-300",
  Bug: "bg-red-500/20 text-red-300",
  Docs: "bg-amber-500/20 text-amber-300",
};

const columns: { title: string; cards: Card[] }[] = [
  {
    title: "To do",
    cards: [
      { title: "Design onboarding flow", tag: "Design", who: "from-pink-400 to-red-500" },
      { title: "Write API docs", tag: "Docs", who: "from-amber-300 to-orange-500" },
      { title: "Fix login redirect", tag: "Bug", who: "from-sky-400 to-indigo-500" },
    ],
  },
  {
    title: "In progress",
    cards: [
      { title: "Build drag & drop", tag: "Dev", who: "from-violet-400 to-fuchsia-500" },
      { title: "Accessibility pass", tag: "Dev", who: "from-emerald-300 to-teal-500" },
    ],
  },
  { title: "Review", cards: [{ title: "Landing page copy", tag: "Docs", who: "from-pink-400 to-red-500" }] },
  {
    title: "Done",
    cards: [
      { title: "Pick a name", tag: "Design", who: "from-amber-300 to-orange-500" },
      { title: "Set up the repo", tag: "Dev", who: "from-sky-400 to-indigo-500" },
    ],
  },
];

const MiniCard: FC<{ card: Card; lifted?: boolean }> = ({ card, lifted }) => (
  <div
    className={`rounded-lg border bg-slate-800/90 p-2 sm:p-3 ${
      lifted ? "border-red-400/60 shadow-2xl shadow-black/60" : "border-white/10"
    }`}
  >
    <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold sm:text-[10px] ${tagStyle[card.tag]}`}>{card.tag}</span>
    <p className="mt-1.5 text-[10px] font-medium leading-snug text-slate-100 sm:mt-2 sm:text-xs">{card.title}</p>
    <div className={`mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br sm:h-5 sm:w-5 ${card.who}`} />
  </div>
);

const BoardPreview: FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="relative mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6">
      <div className="absolute inset-x-10 -top-6 bottom-0 -z-10 rounded-full bg-gradient-to-r from-red-500/30 via-amber-400/15 to-violet-600/30 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0f0920]/90 shadow-2xl shadow-black/60 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[10px] font-medium text-slate-400 sm:text-xs">
            Sprint planning
          </span>
        </div>

        <div className="relative grid grid-cols-3 gap-2 p-3 sm:grid-cols-4 sm:gap-4 sm:p-5">
          {columns.map((col, i) => (
            <div
              key={col.title}
              className={`rounded-xl border border-white/10 bg-white/[0.04] p-2 sm:p-3 ${i === 3 ? "hidden sm:block" : ""}`}
            >
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold text-slate-200 sm:mb-3 sm:text-xs">
                {col.title}
                <span className="rounded-full bg-white/10 px-1.5 text-[9px] text-slate-300">{col.cards.length}</span>
              </p>
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {col.cards.map((card) => (
                  <MiniCard key={card.title} card={card} />
                ))}
              </div>
            </div>
          ))}

          <motion.div
            className="absolute left-[3%] top-[44%] w-[28%] rotate-3 sm:left-[2.5%] sm:w-[21%]"
            animate={reduceMotion ? undefined : { x: ["0%", "112%", "112%", "0%", "0%"], y: [0, -10, -10, 0, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.65, 0.9, 1] }
            }
          >
            <MiniCard card={{ title: "Ship v1.0 🚀", tag: "Dev", who: "from-red-400 to-amber-400" }} lifted />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BoardPreview;
