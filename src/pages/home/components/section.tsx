import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
};

const Section: FC<SectionProps> = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-28 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </motion.div>
  </section>
);

export default Section;
