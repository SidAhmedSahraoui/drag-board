import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";
import { findValueOfItems } from "../helpers";

export function findContainerItems(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined
) {
  const container = findValueOfItems(containers, id, "container");
  if (!container) return [];
  return container.items;
}

export function findContainerTitle(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined
) {
  const container = findValueOfItems(containers, id, "container");
  if (!container) return "";
  return container.title;
}


  export function onAddContainer(
    containerName: string,
    setContainerName: (name: string) => void,
    setShowAddContainerModal: (show: boolean) => void,
    addContainer: (name: string) => void
  ) {
    if (!containerName) return;
    addContainer(containerName);
    setContainerName("");
    setShowAddContainerModal(false);
  }
  

export function onDeleteContainer(
    id: UniqueIdentifier | null,
    deleteContainer: (containerId: UniqueIdentifier) => void,
  ) {
    if(id) deleteContainer(id);
  }

  export function onEditContainer(
    editingContainerName: string,
    editingContainer: UniqueIdentifier | null,
    editContainer: (containerId: UniqueIdentifier, title: string) => void,
    setEditingContainer: (id: UniqueIdentifier | null) => void,
    setEditingContainerName: (name: string) => void,
    setShowEditContainerModal: (show: boolean) => void
  ) {
    if (!editingContainerName) return;
    if(editingContainer) editContainer(editingContainer, editingContainerName);
    setEditingContainer(null);
    setEditingContainerName("");
    setShowEditContainerModal(false);
  }
  