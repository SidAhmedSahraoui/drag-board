import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const Cta: FC = () => (
  <section className="mx-auto w-full max-w-6xl px-4 pt-28 sm:px-6" aria-labelledby="cta-title">
    <div className="rounded-[2rem] bg-gradient-to-r from-[#EF1B13] via-[#FFA800] to-[#5200FF] p-0.5">
      <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-[#0f0920] px-6 py-16 text-center sm:px-12">
        <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-500/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <h2 id="cta-title" className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Ready to get organized?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base text-slate-300">
          Your first board takes less than a minute. No sign-up, no setup, no credit card.
        </p>
        <Link
          to="/board"
          className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-gray-50 px-7 py-4 text-sm font-bold text-slate-900 transition-colors hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          Open the board
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  </section>
);

export default Cta;
