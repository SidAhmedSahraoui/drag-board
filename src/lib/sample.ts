import { v4 as uuidv4 } from "uuid";
import type { ContainerType } from "../types";

export function createSampleBoard(): ContainerType[] {
  const list = (title: string, cards: string[]): ContainerType => ({
    id: `container-${uuidv4()}`,
    title,
    items: cards.map((card) => ({ id: `item-${uuidv4()}`, title: card })),
  });

  return [
    list("To do", ["Drag me to another list", "Reorder lists by their handle", "Press Space on a card to drag with the keyboard"]),
    list("In progress", ["Rename a list from its ⋮ menu", "Edit a card with the pencil"]),
    list("Done", ["Create your first board"]),
  ];
}
