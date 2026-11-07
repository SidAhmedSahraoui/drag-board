import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "./store";

const DURATION_MS = 6000;

export function ToastHost() {
  const current = useToastStore((s) => s.current);
  const dismiss = useToastStore((s) => s.dismiss);

  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(dismiss, DURATION_MS);
    return () => clearTimeout(timer);
  }, [current, dismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4"
    >
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-xl border border-white/10 bg-slate-900/95 py-2.5 pl-4 pr-2 text-sm text-slate-100 shadow-2xl backdrop-blur"
          >
            <span className="min-w-0 truncate">{current.message}</span>
            {current.actionLabel && (
              <button
                type="button"
                onClick={() => {
                  current.onAction?.();
                  dismiss();
                }}
                className="shrink-0 rounded-md px-2.5 py-1 text-sm font-semibold text-red-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                {current.actionLabel}
              </button>
            )}
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={dismiss}
              className="shrink-0 rounded-md px-2 py-1 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
