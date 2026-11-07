import { FC } from "react";
import Section from "./section";

const steps = [
  { title: "Create your lists", text: "Start from scratch or load the sample board. Name lists after your workflow: To do, Doing, Done, or anything else." },
  { title: "Capture every task", text: "Add cards inline and keep typing. Press Enter to add the next one, Esc when you're finished." },
  { title: "Drag work forward", text: "Move cards across lists as they progress. Rename, edit, or undo a delete whenever plans change." },
];

const HowItWorks: FC = () => (
  <Section
    id="how-it-works"
    eyebrow="How it works"
    title="From blank board to done in three steps"
    subtitle="There's nothing to configure. Open the board and start organizing."
  >
    <ol className="relative grid gap-4 md:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-red-500 to-violet-600 text-sm font-extrabold text-white shadow-lg shadow-red-500/20">
            {i + 1}
          </span>
          <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
        </li>
      ))}
    </ol>
  </Section>
);

export default HowItWorks;
