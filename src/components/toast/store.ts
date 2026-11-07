import { create } from "zustand";

export type ToastData = { id: number; message: string; actionLabel?: string; onAction?: () => void };

type ToastStore = {
  current: ToastData | null;
  show: (toast: Omit<ToastData, "id">) => void;
  dismiss: () => void;
};

let nextId = 1;

export const useToastStore = create<ToastStore>((set) => ({
  current: null,
  show: (toast) => set({ current: { ...toast, id: nextId++ } }),
  dismiss: () => set({ current: null }),
}));

export const toast = {
  show: (data: Omit<ToastData, "id">) => useToastStore.getState().show(data),
  dismiss: () => useToastStore.getState().dismiss(),
};
