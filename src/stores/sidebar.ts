import { create } from 'zustand';

interface SidebarStore {
  open: boolean;
}

interface UseSidebarStore extends SidebarStore {
  toggle: () => void;
}

export const useSidebarStore = create<UseSidebarStore>((set) => ({
  open: true,
  toggle: () =>
    set((state) => ({
      ...state,
      open: !state.open,
    })),
}));
