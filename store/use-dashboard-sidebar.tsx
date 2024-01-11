import { create } from "zustand";

interface UseDashboardSidebarStore {
  collapsed: boolean;
  onCollapsed: () => void;
  onExpand: () => void;
}

export const useDashboardSidebarStore = create<UseDashboardSidebarStore>(
  (set) => ({
    collapsed: false,
    onCollapsed: () => set(() => ({ collapsed: false })),
    onExpand: () => set(() => ({ collapsed: true })),
  })
);
