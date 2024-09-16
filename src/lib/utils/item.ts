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
    currentContainerId: UniqueIdentifier | undefined,
    addItem: (containerId: UniqueIdentifier, title: string) => void,
    setItemName: (name: string) => void,
    setShowAddItemModal: (show: boolean) => void,
  ) {
    if (!itemName) return;
    if(currentContainerId) addItem(currentContainerId, itemName);
    setItemName("");
    setShowAddItemModal(false);
  }

  export function onDeleteItem(
    editingItem: UniqueIdentifier | null,
    currentContainerId: UniqueIdentifier | undefined,
    deleteItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier) => void,
    setEditingItem: (id: UniqueIdentifier | null) => void,
    setShowEditItemModal: (show: boolean) => void,
  ) {
    if(currentContainerId && editingItem) deleteItem(currentContainerId, editingItem);
    setEditingItem(null);
    setShowEditItemModal(false);
  }

  export function onEditItem(
    editingItemName: string,
    editingItem: UniqueIdentifier | null,
    currentContainerId: UniqueIdentifier | undefined,
    editItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier, title: string) => void,
    setEditingItem: (id: UniqueIdentifier | null) => void,
    setShowEditItemModal: (show: boolean) => void
  ) {
    if (!editingItemName) return;
    if(currentContainerId && editingItem) editItem(currentContainerId, editingItem, editingItemName);
    setEditingItem(null);
    setShowEditItemModal(false);
  }
  