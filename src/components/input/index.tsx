import { forwardRef, useId, type InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hideLabel?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hideLabel, className, id, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={clsx(hideLabel ? "sr-only" : "mb-1.5 block text-xs font-semibold text-slate-300")}
      >
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-slate-100",
          "placeholder:text-slate-500 transition-colors",
          "hover:border-white/20 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30",
          className
        )}
        {...rest}
      />
    </div>
  );
});
