import { createWithEqualityFn } from 'zustand/traditional';

interface ProfileStore {
  canEdit: boolean;
}

interface UseProfileStore extends ProfileStore {
  setCanEdit: (flag: boolean) => void;
}

export const useProfileStore = createWithEqualityFn<UseProfileStore>((set) => ({
  canEdit: false,
  setCanEdit: (flag) =>
    set((state) => ({
      ...state,
      canEdit: flag,
    })),
}));
