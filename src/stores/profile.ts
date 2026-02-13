import { create } from 'zustand';

interface ProfileStore {
  canEdit: boolean;
}

interface UseProfileStore extends ProfileStore {
  setCanEdit: (flag: boolean) => void;
}

export const useProfileStore = create<UseProfileStore>((set) => ({
  canEdit: false,
  setCanEdit: (flag) =>
    set((state) => ({
      ...state,
      canEdit: flag,
    })),
}));
