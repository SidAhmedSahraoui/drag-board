import { FC, ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ArrowsRightLeftIcon, ArrowUturnLeftIcon, CommandLineIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Section from "./section";

type FeatureProps = {
  icon: ReactNode;
  title: string;
  text: string;
  className?: string;
  children?: ReactNode;
};

const Feature: FC<FeatureProps> = ({ icon, title, text, className, children }) => (
  <article
    className={clsx(
      "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.06]",
      className
    )}
  >
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-500/15 text-red-300">{icon}</span>
    <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{text}</p>
    {children && <div className="mt-6 flex-1">{children}</div>}
  </article>
);

const Key: FC<{ children: ReactNode }> = ({ children }) => (
  <kbd className="grid h-9 min-w-9 place-items-center rounded-lg border border-white/15 border-b-2 bg-white/10 px-2.5 font-sans text-xs font-semibold text-slate-100">
    {children}
  </kbd>
);

const Features: FC = () => (
  <Section
    id="features"
    eyebrow="Features"
    title="Everything you need. Nothing you don't."
    subtitle="A focused board that stays out of your way, so you can spend your time on the work instead of the tool."
  >
    <div className="grid gap-4 lg:grid-cols-3">
      <Feature
        className="lg:col-span-2"
        icon={<ArrowsRightLeftIcon className="h-6 w-6" />}
        title="Drag and drop that feels right"
        text="Move cards between lists, reorder them in place, or rearrange entire lists. Smooth previews show exactly where things will land, and Esc puts everything back."
      >
        <div aria-hidden className="relative flex h-32 items-center justify-center gap-4 sm:gap-6">
          {["Plan", "Build", "Ship"].map((t, i) => (
            <div
              key={t}
              className={clsx(
                "w-24 rounded-lg border bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-100 sm:w-32",
                i === 1
                  ? "-translate-y-3 rotate-3 border-red-400/60 shadow-2xl shadow-black/60"
                  : "border-white/10"
              )}
            >
              {t}
            </div>
          ))}
        </div>
      </Feature>

      <Feature
        icon={<CommandLineIcon className="h-6 w-6" />}
        title="Keyboard first"
        text="Every drag works without a mouse, and screen readers hear card and list names, not IDs."
      >
        <div aria-hidden className="flex flex-col gap-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-2"><Key>Space</Key> pick up / drop</div>
          <div className="flex items-center gap-2">
            <Key>←</Key><Key>→</Key><Key>↑</Key><Key>↓</Key> move
          </div>
          <div className="flex items-center gap-2"><Key>Esc</Key> cancel</div>
        </div>
      </Feature>

      <Feature
        icon={<ArrowUturnLeftIcon className="h-6 w-6" />}
        title="Undo any delete"
        text="Removed the wrong card or a whole list? One click restores it exactly where it was."
      >
        <div
          aria-hidden
          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/90 py-2.5 pl-4 pr-2 text-xs text-slate-200 shadow-xl"
        >
          Deleted card “Fix login redirect”
          <span className="rounded-md bg-white/10 px-2.5 py-1 font-semibold text-red-300">Undo</span>
        </div>
      </Feature>

      <Feature
        className="lg:col-span-2"
        icon={<LockClosedIcon className="h-6 w-6" />}
        title="Private, instant, and always saved"
        text="No account and no waiting on a server. Your board is saved in your browser as you work, so it's there the moment you come back."
      >
        <ul className="grid gap-2.5 text-sm text-slate-300 sm:grid-cols-2">
          {["No sign-up required", "Works offline once loaded", "Autosaves every change", "Your data never leaves your device"].map(
            (point) => (
              <li key={point} className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {point}
              </li>
            )
          )}
        </ul>
      </Feature>
    </div>
  </Section>
);

export default Features;
