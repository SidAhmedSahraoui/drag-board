import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";
import { findValueOfItems } from "../helpers";

export function findItemTitle(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined
) {
  const container = findValueOfItems(containers, id, "item");
  if (!container) return "";
  const item = container.items.find((item) => item.id === id);
  if (!item) return "";
  return item.title;
}

export function onAddItem(
    itemName: string,
    setItemName: (name: string) => void,
    setShowAddItemModal: (show: boolean) => void,
    containers: ContainerType[],
    setContainers: (containers: ContainerType[]) => void,
    currentContainerId: UniqueIdentifier | undefined
  ) {
    if (!itemName) return;
    const id = `item-${Math.random() * 1000}`;
    const container = containers.find((item) => item.id === currentContainerId);
    if (!container) return;
    container.items.push({
      id,
      title: itemName,
    });
    setContainers([...containers]);
    setItemName("");
    setShowAddItemModal(false);
  }

  export function onDeleteItem(
    editingItem: UniqueIdentifier | null,
    containers: ContainerType[],
    setContainers: (containers: ContainerType[]) => void,
    setEditingItem: (id: UniqueIdentifier | null) => void,
    setShowEditItemModal: (show: boolean) => void
  ) {
    if (!editingItem) return;
    const container = containers.find((container) =>
      container.items.find((item) => item.id === editingItem)
    );
    if (!container) return;
    container.items = container.items.filter((item) => item.id !== editingItem);
    setContainers([...containers]);
    setEditingItem(null);
    setShowEditItemModal(false);
  }

  export function onEditItem(
    editingItemName: string,
    editingItem: UniqueIdentifier | null,
    containers: ContainerType[],
    setContainers: (containers: ContainerType[]) => void,
    setEditingItem: (id: UniqueIdentifier | null) => void,
    setShowEditItemModal: (show: boolean) => void
  ) {
    if (!editingItemName || !editingItem) return;
    const container = containers.find((container) =>
      container.items.find((item) => item.id === editingItem)
    );
    if (!container) return;
    const item = container.items.find((item) => item.id === editingItem);
    if (!item) return;
    item.title = editingItemName;
    setContainers([...containers]);
    setEditingItem(null);
    setShowEditItemModal(false);
  }
  