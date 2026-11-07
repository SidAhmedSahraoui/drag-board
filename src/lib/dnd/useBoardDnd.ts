import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  type Announcements,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { findContainer, useStore } from "../store/useStore";
import { boardKeyboardCoordinates } from "./keyboard";
import type { ContainerType, DragKind } from "../../types";

export type ActiveDrag = { id: string; kind: DragKind } | null;

const kindOf = (node: { data: { current?: { type?: unknown } } }): DragKind | undefined => {
  const type = node.data.current?.type;
  return type === "container" || type === "item" ? type : undefined;
};

const titleOf = (containers: ContainerType[], id: UniqueIdentifier) => {
  for (const c of containers) {
    if (c.id === id) return `list ${c.title}`;
    const item = c.items.find((i) => i.id === id);
    if (item) return `card ${item.title}`;
  }
  return "item";
};

export function useBoardDnd() {
  const setContainers = useStore((s) => s.setContainers);
  const containers = useStore((s) => s.containers);
  const [active, setActive] = useState<ActiveDrag>(null);

  const snapshot = useRef<ContainerType[] | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const justMovedList = useRef(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      justMovedList.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [containers]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 220, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: boardKeyboardCoordinates })
  );

  const collisionDetection = useCallback<CollisionDetection>((args) => {
    const { active: dragged, droppableContainers } = args;
    const lists = useStore.getState().containers;

    if (dragged.data.current?.type === "container") {
      return closestCenter({
        ...args,
        droppableContainers: droppableContainers.filter((d) => d.data.current?.type === "container"),
      });
    }

    const pointer = pointerWithin(args);
    const hits = pointer.length > 0 ? pointer : rectIntersection(args);
    let overId = getFirstCollision(hits, "id");

    if (overId != null) {
      const list = lists.find((c) => c.id === overId);
      if (list && list.items.length > 0) {
        const closest = closestCenter({
          ...args,
          droppableContainers: droppableContainers.filter(
            (d) => d.id !== overId && list.items.some((i) => i.id === d.id)
          ),
        });
        overId = closest[0]?.id ?? overId;
      }
      lastOverId.current = overId;
      return [{ id: overId }];
    }

    if (justMovedList.current) lastOverId.current = dragged.id;
    return lastOverId.current != null ? [{ id: lastOverId.current }] : [];
  }, []);

  const onDragStart = useCallback((event: DragStartEvent) => {
    const kind = kindOf(event.active);
    if (!kind) return;
    snapshot.current = useStore.getState().containers;
    lastOverId.current = null;
    setActive({ id: String(event.active.id), kind });
  }, []);

  const onDragOver = useCallback(
    ({ active: dragged, over }: DragOverEvent) => {
      if (!over || kindOf(dragged) !== "item") return;

      const lists = useStore.getState().containers;
      const from = findContainer(lists, dragged.id);
      const to = findContainer(lists, over.id);
      if (!from || !to || from.id === to.id) return;

      const card = from.items.find((i) => i.id === dragged.id);
      if (!card) return;

      let index: number;
      if (kindOf(over) === "container") {
        index = to.items.length;
      } else {
        const overIndex = to.items.findIndex((i) => i.id === over.id);
        const translated = dragged.rect.current.translated;
        const isBelow = !!translated && translated.top > over.rect.top + over.rect.height / 2;
        index = overIndex + (isBelow ? 1 : 0);
      }

      justMovedList.current = true;
      setContainers(
        lists.map((c) => {
          if (c.id === from.id) return { ...c, items: c.items.filter((i) => i.id !== card.id) };
          if (c.id === to.id) {
            return { ...c, items: [...c.items.slice(0, index), card, ...c.items.slice(index)] };
          }
          return c;
        })
      );
    },
    [setContainers]
  );

  const reset = useCallback(() => {
    snapshot.current = null;
    lastOverId.current = null;
    setActive(null);
  }, []);

  const onDragEnd = useCallback(
    ({ active: dragged, over }: DragEndEvent) => {
      const kind = kindOf(dragged);
      const lists = useStore.getState().containers;

      if (over && dragged.id !== over.id) {
        if (kind === "container") {
          const from = lists.findIndex((c) => c.id === dragged.id);
          const to = lists.findIndex((c) => c.id === over.id);
          if (from !== -1 && to !== -1) setContainers(arrayMove(lists, from, to));
        } else if (kind === "item") {
          const list = findContainer(lists, dragged.id);
          const overList = findContainer(lists, over.id);
          if (list && overList && list.id === overList.id) {
            const from = list.items.findIndex((i) => i.id === dragged.id);
            const to =
              kindOf(over) === "container"
                ? list.items.length - 1
                : list.items.findIndex((i) => i.id === over.id);
            if (from !== -1 && to !== -1 && from !== to) {
              setContainers(
                lists.map((c) => (c.id === list.id ? { ...c, items: arrayMove(c.items, from, to) } : c))
              );
            }
          }
        }
      }
      reset();
    },
    [reset, setContainers]
  );

  const onDragCancel = useCallback(() => {
    if (snapshot.current) setContainers(snapshot.current);
    reset();
  }, [reset, setContainers]);

  const announcements = useMemo<Announcements>(() => {
    const name = (id: UniqueIdentifier) => titleOf(useStore.getState().containers, id);
    const where = (id: UniqueIdentifier) => {
      const c = findContainer(useStore.getState().containers, id);
      return c ? `list ${c.title}` : "the board";
    };
    return {
      onDragStart: ({ active: a }) => `Picked up ${name(a.id)}.`,
      onDragOver: ({ active: a, over }) =>
        over ? `${name(a.id)} is over ${name(over.id)}.` : `${name(a.id)} is no longer over a drop area.`,
      onDragEnd: ({ active: a, over }) =>
        over ? `Dropped ${name(a.id)} in ${where(a.id)}.` : `Dropped ${name(a.id)}.`,
      onDragCancel: ({ active: a }) => `Cancelled. ${name(a.id)} returned to where it started.`,
    };
  }, []);

  return {
    sensors,
    collisionDetection,
    announcements,
    active,
    handlers: { onDragStart, onDragOver, onDragEnd, onDragCancel },
  };
}
