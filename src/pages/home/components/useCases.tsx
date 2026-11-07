import { FC } from "react";
import { BookOpenIcon, CodeBracketIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import Section from "./section";

const cases = [
  {
    icon: <CodeBracketIcon className="h-6 w-6" />,
    title: "Sprints & product work",
    text: "Run a backlog → in progress → review → done flow without the weight of a heavyweight tracker.",
    lists: ["Backlog", "In progress", "Review", "Done"],
  },
  {
    icon: <MegaphoneIcon className="h-6 w-6" />,
    title: "Content calendars",
    text: "Move ideas from rough draft to published and see what's coming up at a glance.",
    lists: ["Ideas", "Drafting", "Scheduled", "Published"],
  },
  {
    icon: <BookOpenIcon className="h-6 w-6" />,
    title: "Personal goals & study",
    text: "Break big goals into small cards, then drag them forward as you make progress.",
    lists: ["Someday", "This week", "Today", "Done"],
  },
];

const UseCases: FC = () => (
  <Section
    id="use-cases"
    eyebrow="Use cases"
    title="One board, many ways to work"
    subtitle="Lists are just names, so DragBoard bends to whatever process you already have."
  >
    <div className="grid gap-4 md:grid-cols-3">
      {cases.map((c) => (
        <article key={c.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/15 text-violet-300">{c.icon}</span>
          <h3 className="mt-5 text-lg font-bold text-white">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.text}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Example lists">
            {c.lists.map((l) => (
              <li key={l} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                {l}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </Section>
);

export default UseCases;
