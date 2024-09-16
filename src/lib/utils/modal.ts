import { UniqueIdentifier } from "@dnd-kit/core";

export function openEditItemModal(
  setEditingItem: (id: UniqueIdentifier | null) => void,
  setEditingItemName: (name: string) => void,
  setShowEditItemModal: (show: boolean) => void,
  id: UniqueIdentifier,
  title: string
) {
  setEditingItem(id);
  setEditingItemName(title);
  setShowEditItemModal(true);
}

export function openEditModal(
    setEditingContainer: (id: UniqueIdentifier | null) => void,
    setEditingContainerName: (name: string) => void,
    setShowEditContainerModal: (show: boolean) => void,
    id: UniqueIdentifier,
    title: string
  ) {
    setEditingContainer(id);
    setEditingContainerName(title);
    setShowEditContainerModal(true);
  }