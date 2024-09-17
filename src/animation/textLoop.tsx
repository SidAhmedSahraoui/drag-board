import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const texts = [
  "Plan and navigate from idea to launch.",
  "Build with focus. Ship with care.",
  "Instant analytics for any stream of work.",
];
const variants = {
  enter: () => {
    return {
      y: 20,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
};

const TextLoop: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === texts.length) {
        next = 0;
      }
      setIndex(next);
    }, 3000);
  }, [index, setIndex]);

  return (
    <div className="text-xl font-normal leading-2 text-center m-6 text-gray-50 flex justify-center items-center">
        <AnimatePresence>
            <motion.span
                style={{ position: "absolute" }}
                variants={variants}
                key={index}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    y: { type: "spring", stiffness: 500, damping: 20 },
                    opacity: { duration: 0.2 },
                }}
            >
                {texts[index]}
            </motion.span>
        </AnimatePresence>
    </div>
  );
};

export default TextLoop;