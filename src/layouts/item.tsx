import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  onEdit?: () => void;
};

export function Items({ id, title, onEdit }: ItemsType) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "bg-white shadow rounded-md w-full border border-slate-200 hover:border-gray-200 flex relative items-center cursor-grab",
        isDragging && "opacity-50"
      )}
    >
      <div        
      {...listeners}
      className="flex flex-1 items-center justify-between text-[15px] p-3 pr-5 truncate">
        <p className="max-w-full truncate">
          {title}
        </p>
      </div>
      <button
        className="text-gray-400 hover:text-indigo-500 transition-colors p-3 cursor-pointer"
        onClick={onEdit}
      >
        <PencilSquareIcon className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}
