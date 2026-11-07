import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { ContainerType, ItemType } from "../../types";

export const STORAGE_KEY = "containers-storage";
export const MAX_LIST_TITLE = 60;
export const MAX_CARD_TITLE = 200;

type BoardState = {
  containers: ContainerType[];
  setContainers: (containers: ContainerType[]) => void;

  addContainer: (title: string) => string | undefined;
  renameContainer: (containerId: string, title: string) => void;
  deleteContainer: (containerId: string) => void;
  restoreContainer: (container: ContainerType, index: number) => void;

  addItem: (containerId: string, title: string) => void;
  editItem: (itemId: string, title: string) => void;
  deleteItem: (itemId: string) => void;
  restoreItem: (containerId: string, item: ItemType, index: number) => void;
};

const clean = (title: string, max: number) => title.trim().slice(0, max);

const insertAt = <T,>(list: T[], index: number, value: T): T[] => {
  const at = Math.max(0, Math.min(index, list.length));
  return [...list.slice(0, at), value, ...list.slice(at)];
};

export function sanitizeContainers(value: unknown): ContainerType[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const unique = (id: unknown, prefix: string) => {
    let next = typeof id === "string" && id && !seen.has(id) ? id : `${prefix}-${uuidv4()}`;
    while (seen.has(next)) next = `${prefix}-${uuidv4()}`;
    seen.add(next);
    return next;
  };

  return value.flatMap((raw): ContainerType[] => {
    if (!raw || typeof raw !== "object") return [];
    const c = raw as Record<string, unknown>;
    const items = Array.isArray(c.items) ? c.items : [];
    return [
      {
        id: unique(c.id, "container"),
        title: typeof c.title === "string" ? c.title : "Untitled",
        items: items.flatMap((rawItem): ItemType[] => {
          if (!rawItem || typeof rawItem !== "object") return [];
          const i = rawItem as Record<string, unknown>;
          return [
            {
              id: unique(i.id, "item"),
              title: typeof i.title === "string" ? i.title : "Untitled",
            },
          ];
        }),
      },
    ];
  });
}

export const useStore = create<BoardState>()(
  devtools(
    persist(
      (set) => ({
        containers: [],
        setContainers: (containers) => set({ containers }),

        addContainer: (title) => {
          const trimmed = clean(title, MAX_LIST_TITLE);
          if (!trimmed) return undefined;
          const id = `container-${uuidv4()}`;
          set((state) => ({
            containers: [...state.containers, { id, title: trimmed, items: [] }],
          }));
          return id;
        },

        renameContainer: (containerId, title) => {
          const trimmed = clean(title, MAX_LIST_TITLE);
          if (!trimmed) return;
          set((state) => ({
            containers: state.containers.map((c) =>
              c.id === containerId ? { ...c, title: trimmed } : c
            ),
          }));
        },

        deleteContainer: (containerId) =>
          set((state) => ({
            containers: state.containers.filter((c) => c.id !== containerId),
          })),

        restoreContainer: (container, index) =>
          set((state) =>
            state.containers.some((c) => c.id === container.id)
              ? state
              : { containers: insertAt(state.containers, index, container) }
          ),

        addItem: (containerId, title) => {
          const trimmed = clean(title, MAX_CARD_TITLE);
          if (!trimmed) return;
          set((state) => ({
            containers: state.containers.map((c) =>
              c.id === containerId
                ? { ...c, items: [...c.items, { id: `item-${uuidv4()}`, title: trimmed }] }
                : c
            ),
          }));
        },

        editItem: (itemId, title) => {
          const trimmed = clean(title, MAX_CARD_TITLE);
          if (!trimmed) return;
          set((state) => ({
            containers: state.containers.map((c) =>
              c.items.some((i) => i.id === itemId)
                ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, title: trimmed } : i)) }
                : c
            ),
          }));
        },

        deleteItem: (itemId) =>
          set((state) => ({
            containers: state.containers.map((c) =>
              c.items.some((i) => i.id === itemId)
                ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
                : c
            ),
          })),

        restoreItem: (containerId, item, index) =>
          set((state) => {
            if (state.containers.some((c) => c.items.some((i) => i.id === item.id))) return state;
            return {
              containers: state.containers.map((c) =>
                c.id === containerId ? { ...c, items: insertAt(c.items, index, item) } : c
              ),
            };
          }),
      }),
      {
        name: STORAGE_KEY,
        version: 1,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ containers: state.containers }),
        migrate: (persisted) => ({
          containers: sanitizeContainers((persisted as { containers?: unknown } | null)?.containers),
        }),
        merge: (persisted, current) => ({
          ...current,
          containers: sanitizeContainers((persisted as { containers?: unknown } | null)?.containers),
        }),
      }
    ),
    { enabled: import.meta.env.DEV, name: "drag-board" }
  )
);

export function findContainer(
  containers: ContainerType[],
  id: string | number | null | undefined
): ContainerType | undefined {
  if (id == null) return undefined;
  return (
    containers.find((c) => c.id === id) ??
    containers.find((c) => c.items.some((i) => i.id === id))
  );
}
