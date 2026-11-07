import { forwardRef, type HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type CardViewProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  onEdit?: () => void;
  isDragging?: boolean;
  isOverlay?: boolean;
};

export const CardView = forwardRef<HTMLDivElement, CardViewProps>(function CardView(
  { title, onEdit, isDragging, isOverlay, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        "group relative w-full cursor-grab rounded-lg border bg-slate-800/90 text-sm text-slate-100 shadow-sm",
        "border-white/10 transition-[border-color,background-color,box-shadow] hover:border-white/25 hover:bg-slate-800",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
        isDragging && "border-dashed border-white/20 opacity-40",
        isOverlay && "rotate-2 cursor-grabbing border-red-400/60 shadow-2xl shadow-black/50",
        className
      )}
      {...rest}
    >
      <p className="whitespace-pre-wrap break-words px-3 py-2.5 pr-10 leading-snug">{title}</p>
      {onEdit && (
        <button
          type="button"
          aria-label={`Edit card ${title}`}
          onClick={onEdit}
          onKeyDown={(e) => e.stopPropagation()}
          className={clsx(
            "absolute right-1.5 top-1.5 rounded-md p-1.5 text-slate-400 transition-opacity hover:bg-white/10 hover:text-white",
            "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
            "[@media(hover:none)]:opacity-100"
          )}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});

type ItemsProps = { id: string; title: string; onEdit: () => void };

export function Items({ id, title, onEdit }: ItemsProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: "item" },
  });

  return (
    <CardView
      ref={setNodeRef}
      title={title}
      onEdit={onEdit}
      isDragging={isDragging}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      {...attributes}
      {...listeners}
    />
  );
}
