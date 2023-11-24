import { create } from "zustand";

type SettingsStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))