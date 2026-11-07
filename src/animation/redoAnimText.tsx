import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const WORDS = ["Efficiently", "Effectively", "Elegantly"];
const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 1400;

export default function RedoAnimText() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const word = WORDS[wordIndex];
    let delay: number;
    let next: () => void;

    if (!erasing && length < word.length) {
      delay = TYPE_MS;
      next = () => setLength((l) => l + 1);
    } else if (!erasing) {
      delay = HOLD_MS;
      next = () => setErasing(true);
    } else if (length > 0) {
      delay = ERASE_MS;
      next = () => setLength((l) => l - 1);
    } else {
      delay = 200;
      next = () => {
        setErasing(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      };
    }

    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [reduceMotion, wordIndex, length, erasing]);

  if (reduceMotion) return <span>{WORDS[0]}</span>;

  return (
    <>
      <span className="sr-only">{WORDS[0]}</span>
      <span aria-hidden className="inline-block min-w-[12ch]">
        {WORDS[wordIndex].slice(0, length)}
        <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 animate-pulse bg-white" />
      </span>
    </>
  );
}
