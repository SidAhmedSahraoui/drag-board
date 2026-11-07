import { FC } from "react";
import { Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/20/solid";
import Backdrop from "../../images/short.png";
import AnimText from "../../animation/animText";
import TextLoop from "../../animation/textLoop";
import Navbar from "./components/navbar";
import BoardPreview from "./components/boardPreview";
import Features from "./components/features";
import HowItWorks from "./components/howItWorks";
import UseCases from "./components/useCases";
import Faq from "./components/faq";
import Cta from "./components/cta";
import Footer from "./components/footer";
import { usePageTitle } from "../../lib";

const Home: FC = () => {
  usePageTitle("DragBoard — a drag & drop task board");

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh overflow-x-clip pb-16">
        <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${Backdrop})` }} />

        <Navbar />

        <main>
          <div className="flex flex-col items-center px-4 pt-16 sm:pt-24">
            <div className="pill-gradient">
              <span>
                <AnimText />
              </span>
            </div>

            <h1 className="mt-8 max-w-4xl text-center text-4xl font-extrabold leading-tight tracking-tight text-gray-50 sm:text-6xl lg:text-7xl">
              Your tasks,
              <br />
              <span className="bg-gradient-to-r from-red-400 via-amber-300 to-violet-400 bg-clip-text text-transparent">
                one drag away.
              </span>
            </h1>

            <TextLoop />

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                to="/board"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-50 px-6 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-red-500/10 transition-colors hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0619]"
              >
                Open the board
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#how-it-works"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                See how it works
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
              {["Free to use", "No sign-up", "Saved in your browser"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <BoardPreview />
          <Features />
          <HowItWorks />
          <UseCases />
          <Faq />
          <Cta />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Home;
