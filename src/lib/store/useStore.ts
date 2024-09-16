import { create } from "zustand";
import { persist } from "zustand/middleware";
//import {  devtools, createJSONStorage } from "zustand/middleware";
//import { v4 as uuidv4 } from "uuid";
import { DNDType } from "../../types";

// type ContainerState = {
//   containers: DNDType[];
//   addContainer: (title: string) => void;
//   addItem: (containerId: string, title: string) => void;
//   deleteItem: (containerId: string, itemId: string) => void;
//   deleteContainer: (containerId: string) => void;
//   setContainers: (containers: DNDType[]) => void;
// };

// export const useStore = create<ContainerState>()(
//    devtools(
//     persist(
//       (set) => ({
//         containers: [],
//         setContainers: (containers: DNDType[]) => set({ containers }),
//         addContainer: (title) =>
//           set((state) => ({
//             containers: [
//               ...state.containers,
//               {
//                 id: uuidv4(),
//                 title,
//                 items: [],
//               },
//             ],
//           })),
//         addItem: (containerId, title) =>
//             set((state) => ({
//                 containers: state.containers.map((container) =>
//                 container.id === containerId
//                     ? {
//                         ...container,
//                         items: [
//                         ...container.items,
//                         {
//                             id: uuidv4(),
//                             title,
//                         },
//                         ],
//                     }
//                     : container
//                 ),
//             })),
//         deleteItem: (containerId, itemId) =>
//             set((state) => ({
//                 containers: state.containers.map((container) =>
//                 container.id === containerId
//                     ? {
//                         ...container,
//                         items: container.items.filter(
//                         (item) => item.id !== itemId
//                         ),
//                     }
//                     : container
//                 ),
//             })),
//         deleteContainer: (containerId) =>
//             set((state) => ({
//                 containers: state.containers.filter(
//                 (container) => container.id !== containerId
//                 ),
//             })),
//         }),
//         {
//             name: "containers-storage",
//             storage: createJSONStorage(() => localStorage), 
//         }
//     )));
  


type ContainerState = {
    containers: DNDType[];
    setContainers: (containers: DNDType[]) => void;
    addContainer: (title: string) => void;
  };
  
  export const useStore = create<ContainerState>()(
    persist(
      (set) => ({
        containers: [],
        setContainers: (containers) => set({ containers }),
        addContainer: (title: string) =>
          set((state) => ({
            containers: [
              ...state.containers,
              {
                id: `container-${Math.random() * 1000}`,
                title,
                items: [],
              },
            ],
          })),
      }),
      {
        name: "container-storage",
      }
    )
  );