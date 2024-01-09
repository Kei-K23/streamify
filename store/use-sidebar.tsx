import { create } from "zustand";

interface UseSidebarStore {
  collapsed: boolean;
  onCollapsed: () => void;
  onExpand: () => void;
}

export const useSidebarStore = create<UseSidebarStore>((set) => ({
  collapsed: false,
  onCollapsed: () => set(() => ({ collapsed: false })),
  onExpand: () => set(() => ({ collapsed: true })),
}));
