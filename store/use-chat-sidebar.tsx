import { create } from "zustand";

export enum CHAT_VARIANT {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface UseChatSidebarStore {
  collapsed: boolean;
  variant: CHAT_VARIANT;
  onCollapsed: () => void;
  onExpand: () => void;
  onVariantChange: (variant: CHAT_VARIANT) => void;
}

export const useChatSidebarStore = create<UseChatSidebarStore>((set) => ({
  collapsed: false,
  variant: CHAT_VARIANT.CHAT,
  onCollapsed: () => set(() => ({ collapsed: false })),
  onExpand: () => set(() => ({ collapsed: true })),
  onVariantChange: (variant: CHAT_VARIANT) => set(() => ({ variant })),
}));
