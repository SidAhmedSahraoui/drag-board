import { create } from "zustand";
import { persist } from "zustand/middleware";
import {  devtools, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { DNDType } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";

type ContainerState = {
  containers: DNDType[];
  setContainers: (containers: DNDType[]) => void;  

  // add 
  addContainer: (title: string) => void;
  addItem: (containerId: UniqueIdentifier, title: string) => void;

  // delete
  deleteContainer: (containerId: UniqueIdentifier) => void;
  deleteItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier) => void;

  // edit
  editContainer: (containerId: UniqueIdentifier, title: string) => void;
  editItem: (containerId: UniqueIdentifier, itemId: UniqueIdentifier, title: string) => void;
};

export const useStore = create<ContainerState>()(
   devtools(
    persist(
      (set) => ({
        containers: [],
        setContainers: (containers) => set({ containers }),
        addContainer: (title) =>
          set((state) => ({
            containers: [
              ...state.containers,
              {
                id: `container-${uuidv4()}`,
                title,
                items: [],
              },
            ],
          })),
        addItem: (containerId, title) =>
            set((state) => ({
                containers: state.containers.map((container) =>
                container.id === containerId
                    ? {
                        ...container,
                        items: [
                        ...container.items,
                        {
                            id: `item-${uuidv4()}`,
                            title,
                        },
                        ],
                    }
                    : container
                ),
            })),
            deleteContainer: (containerId) =>
              set((state) => ({
                  containers: state.containers.filter(
                  (container) => container.id !== containerId
                  ),
              })),
          deleteItem: (containerId, itemId) =>
            set((state) => ({
                containers: state.containers.map((container) =>
                container.id === containerId
                    ? {
                        ...container,
                        items: container.items.filter(
                        (item) => item.id !== itemId
                        ),
                    }
                    : container
                ),
          })),
          editContainer: (containerId, title) =>
            set((state) => ({
                containers: state.containers.map((container) =>
                container.id === containerId
                    ? {
                        ...container,
                        title,
                    }
                    : container
                ),
            })),
            editItem: (containerId, itemId, title) =>
            set((state) => ({
                containers: state.containers.map((container) =>
                container.id === containerId
                    ? {
                        ...container,
                        items: container.items.map((item) =>
                        item.id === itemId
                            ? {
                                ...item,
                                title,
                            }
                            : item
                        ),
                    }
                    : container
                ),
            })),
        }),
        {
            name: "containers-storage",
            storage: createJSONStorage(() => localStorage), 
        }
    )));
  