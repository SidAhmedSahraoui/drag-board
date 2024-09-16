import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export const findContainerNameByItemId = (
  containers: ContainerType[],
  itemId: UniqueIdentifier | null
): string | undefined => {
  for (const container of containers) {
    if (container.items.some((item) => item.id === itemId)) {
      return container.title;
    }
  }
  return undefined;
};



export function findValueOfItems(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined,
  type: string
) {
  if (type === "container") {
    return containers.find((item) => item.id === id);
  }
  if (type === "item") {
    return containers.find((container) =>
      container.items.find((item) => item.id === id)
    );
  }
}
