import { motion } from "framer-motion";

const container = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const dot = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: -14,
    opacity: 1,
    transition: { duration: 0.45, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const },
  },
};

export default function Spinner() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-dvh items-center justify-center">
      <motion.div className="flex gap-3" variants={container} initial="initial" animate="animate">
        {[0, 1, 2].map((i) => (
          <motion.span key={i} variants={dot} className="block h-4 w-4 rounded-full bg-red-500" />
        ))}
      </motion.div>
    </div>
  );
}
