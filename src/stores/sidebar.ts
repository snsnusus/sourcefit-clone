import { createWithEqualityFn } from 'zustand/traditional';

interface SidebarStore {
  open: boolean;
}

interface UseSidebarStore extends SidebarStore {
  toggle: () => void;
  onClose: () => void;
}

export const useSidebarStore = createWithEqualityFn<UseSidebarStore>((set) => ({
  open: false,
  onClose: () =>
    set((state) => ({
      ...state,
      open: false,
    })),
  toggle: () =>
    set((state) => ({
      ...state,
      open: !state.open,
    })),
}));
