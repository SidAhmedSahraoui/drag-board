import { forwardRef, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Button, Composer, Input } from "../../components";
import { MAX_CARD_TITLE, MAX_LIST_TITLE } from "../../lib";
import { Menu } from "../menu";

type ContainerViewProps = HTMLAttributes<HTMLElement> & {
  title: string;
  count: number;
  actions?: ReactNode;
  titleSlot?: ReactNode;
  handleProps?: HTMLAttributes<HTMLButtonElement>;
  headerProps?: HTMLAttributes<HTMLDivElement>;
  footer?: ReactNode;
  isDragging?: boolean;
  isOverlay?: boolean;
  children: ReactNode;
};

const GripIcon = () => (
  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
    <circle cx="5" cy="3" r="1.3" /><circle cx="11" cy="3" r="1.3" />
    <circle cx="5" cy="8" r="1.3" /><circle cx="11" cy="8" r="1.3" />
    <circle cx="5" cy="13" r="1.3" /><circle cx="11" cy="13" r="1.3" />
  </svg>
);

export const ContainerView = forwardRef<HTMLElement, ContainerViewProps>(function ContainerView(
  { title, count, actions, titleSlot, handleProps, headerProps, footer, isDragging, isOverlay, children, className, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      aria-label={`List ${title}`}
      className={clsx(
        "flex max-h-full w-[min(20rem,85vw)] shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm",
        isDragging && "opacity-40",
        isOverlay && "rotate-1 border-red-400/50 bg-slate-900/90 shadow-2xl shadow-black/50",
        className
      )}
      {...rest}
    >
      <div {...headerProps} className="flex items-center gap-1 px-2 pb-1 pt-2.5">
        <button
          type="button"
          aria-label={`Drag list ${title}`}
          className="cursor-grab touch-manipulation rounded-md p-1.5 text-slate-500 hover:bg-white/10 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 active:cursor-grabbing"
          {...handleProps}
        >
          <GripIcon />
        </button>
        <div className="min-w-0 flex-1">
          {titleSlot ?? (
            <h2 className="flex cursor-grab items-baseline gap-2 py-1 text-sm font-bold text-slate-100">
              <span className="truncate">{title}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                {count}
              </span>
            </h2>
          )}
        </div>
        {actions}
      </div>
      {children}
      {footer && <div className="p-2 pt-1">{footer}</div>}
    </section>
  );
});

type ContainerProps = {
  id: string;
  title: string;
  cardCount: number;
  onAddItem: (title: string) => void;
  onRename: (title: string) => void;
  onDelete: () => void;
  children: ReactNode;
};

export function Container({ id, title, cardCount, onAddItem, onRename, onDelete, children }: ContainerProps) {
  const [isAdding, setAdding] = useState(false);
  const [isRenaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState(title);
  const cancelledRef = useRef(false);

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id, data: { type: "container" } });

  const commitRename = () => {
    if (cancelledRef.current) return;
    const next = draft.trim();
    cancelledRef.current = true;
    if (next && next !== title) onRename(next);
    setRenaming(false);
  };

  const { onKeyDown: handleKeyDown, ...pointerListeners } = (listeners ?? {}) as Record<string, never>;

  return (
    <ContainerView
      ref={setNodeRef}
      title={title}
      count={cardCount}
      isDragging={isDragging}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      handleProps={{ ref: setActivatorNodeRef, ...attributes, onKeyDown: handleKeyDown } as HTMLAttributes<HTMLButtonElement>}
      headerProps={isRenaming ? undefined : (pointerListeners as HTMLAttributes<HTMLDivElement>)}
      titleSlot={
        isRenaming ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              commitRename();
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                cancelledRef.current = true;
                setRenaming(false);
              }
            }}
          >
            <Input
              autoFocus
              label="List title"
              hideLabel
              value={draft}
              maxLength={MAX_LIST_TITLE}
              className="h-8 font-semibold"
              onFocus={(e) => e.currentTarget.select()}
              onBlur={commitRename}
              onChange={(e) => setDraft(e.target.value)}
            />
          </form>
        ) : undefined
      }
      actions={
        <Menu
          label={`Options for list ${title}`}
          items={[
            {
              label: "Rename",
              icon: <PencilIcon className="h-4 w-4" />,
              onSelect: () => {
                setDraft(title);
                cancelledRef.current = false;
                setRenaming(true);
              },
            },
            { label: "Delete list", icon: <TrashIcon className="h-4 w-4" />, danger: true, onSelect: onDelete },
          ]}
        />
      }
      footer={
        isAdding ? (
          <Composer
            label={`New card in ${title}`}
            placeholder="Enter a title for this card…"
            submitLabel="Add card"
            maxLength={MAX_CARD_TITLE}
            keepOpen
            onSubmit={onAddItem}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <Button variant="ghost" size="sm" fullWidth className="justify-start" icon={<PlusIcon className="h-4 w-4" />} onClick={() => setAdding(true)}>
            Add a card
          </Button>
        )
      }
    >
      <div className="min-h-[2.5rem] flex-1 overflow-y-auto overscroll-contain px-2 py-1">
        {cardCount === 0 && !isAdding && (
          <p className="select-none rounded-lg border border-dashed border-white/10 px-3 py-4 text-center text-xs text-slate-500">
            No cards yet — drop one here
          </p>
        )}
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </ContainerView>
  );
}
