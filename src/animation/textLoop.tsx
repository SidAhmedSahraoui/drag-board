import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const texts = [
  "Plan and navigate from idea to launch.",
  "Build with focus. Ship with care.",
  "Instant clarity for any stream of work.",
];

const INTERVAL_MS = 3000;

const TextLoop: FC = () => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % texts.length), INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [index, reduceMotion]);

  return (
    <div className="relative mx-auto mt-4 h-14 w-full max-w-xl overflow-hidden text-center text-lg text-gray-300 sm:h-8 sm:text-xl" aria-live="off">
      <AnimatePresence initial={false}>
        <motion.p
          key={index}
          className="absolute inset-x-0"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ y: { type: "spring", stiffness: 400, damping: 30 }, opacity: { duration: 0.25 } }}
        >
          {texts[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default TextLoop;
