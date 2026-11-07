import type { KeyboardCoordinateGetter } from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";
import { findContainer, useStore } from "../store/useStore";

const ARROWS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);

export const boardKeyboardCoordinates: KeyboardCoordinateGetter = (event, { context }) => {
  const { active, over, droppableRects, collisionRect } = context;
  if (!active || !collisionRect || !ARROWS.has(event.code)) return undefined;
  event.preventDefault();

  const lists = useStore.getState().containers;
  const topLeft = (id: string | number): Coordinates | undefined => {
    const rect = droppableRects.get(id);
    return rect ? { x: rect.left, y: rect.top } : undefined;
  };

  const horizontal = event.code === "ArrowLeft" || event.code === "ArrowRight";
  const step = event.code === "ArrowLeft" || event.code === "ArrowUp" ? -1 : 1;
  const kind = active.data.current?.type;

  if (kind === "container") {
    if (!horizontal) return undefined;
    const baseId = over && lists.some((c) => c.id === over.id) ? over.id : active.id;
    const target = lists[lists.findIndex((c) => c.id === baseId) + step];
    return target ? topLeft(target.id) : undefined;
  }

  if (kind !== "item") return undefined;
  const current = findContainer(lists, active.id);
  if (!current) return undefined;

  if (horizontal) {
    const target = lists[lists.findIndex((c) => c.id === current.id) + step];
    if (!target) return undefined;

    let best: Coordinates | undefined;
    let bestDistance = Infinity;
    for (const item of target.items) {
      const rect = droppableRects.get(item.id);
      if (!rect) continue;
      const distance = Math.abs(rect.top - collisionRect.top);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = { x: rect.left, y: rect.top };
      }
    }
    if (best) return best;

    const list = topLeft(target.id);
    return list && { x: list.x + 8, y: list.y + 56 };
  }

  const baseId = over && current.items.some((i) => i.id === over.id) ? over.id : active.id;
  const target = current.items[current.items.findIndex((i) => i.id === baseId) + step];
  return target ? topLeft(target.id) : undefined;
};
