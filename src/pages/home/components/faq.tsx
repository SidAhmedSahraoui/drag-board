import { FC } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Section from "./section";

const faqs = [
  { q: "Is DragBoard free?", a: "Yes. There are no accounts, plans, or limits. Open the board and start working." },
  { q: "Where is my data stored?", a: "In your browser's local storage, on your device. Nothing is sent to a server, which keeps your board private and instant." },
  { q: "Will my board sync between devices?", a: "Not at the moment. Because data lives in your browser, each browser and device has its own board." },
  { q: "What happens if I delete something by mistake?", a: "You'll get an Undo button right after deleting a list or a card. It restores the item to its original position." },
  { q: "Does it work on my phone?", a: "Yes. Lists scroll sideways, and you can press and hold a card to drag it without losing normal scrolling." },
  { q: "Can I use it without a mouse?", a: "Yes. Focus a card or list handle, press Space to pick it up, move with the arrow keys, and press Space again to drop. Esc cancels." },
];

const Faq: FC = () => (
  <Section id="faq" eyebrow="FAQ" title="Questions, answered">
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {faqs.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors open:bg-white/[0.06] hover:border-white/20"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 [&::-webkit-details-marker]:hidden">
            {item.q}
            <PlusIcon className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
        </details>
      ))}
    </div>
  </Section>
);

export default Faq;
