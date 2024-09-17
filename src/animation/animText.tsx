import { useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import RedoAnimText from "./redoAnimText";


export default function AnimText() {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, 0, {
      type: "tween",
      delay: 99,
      duration: 1,
      ease: "easeInOut",
      repeatDelay: 99,
      onComplete: () => {
        setDone(true);
      },
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="">
      <span>
        Write. Plan. Organize.
      </span>
      {done}
      {" "}
      <RedoAnimText />
    </span>
  );
}
