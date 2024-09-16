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
    id: UniqueIdentifier,
    containers: ContainerType[],
    setContainers: (containers: ContainerType[]) => void
  ) {
    setContainers(containers.filter((container) => container.id !== id));
  }

  export function onEditContainer(
    editingContainerName: string,
    editingContainer: UniqueIdentifier | null,
    containers: ContainerType[],
    setContainers: (containers: ContainerType[]) => void,
    setEditingContainer: (id: UniqueIdentifier | null) => void,
    setEditingContainerName: (name: string) => void,
    setShowEditContainerModal: (show: boolean) => void
  ) {
    if (!editingContainerName || !editingContainer) return;
    const container = containers.find((item) => item.id === editingContainer);
    if (!container) return;
    container.title = editingContainerName;
    setContainers([...containers]);
    setEditingContainer(null);
    setEditingContainerName("");
    setShowEditContainerModal(false);
  }
  