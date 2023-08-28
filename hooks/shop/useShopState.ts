import { create } from "zustand";

type RootState = {
  isfilterDrawer: boolean;
  isSortDrawer: boolean;
  resultCount?: number;
  setResultCount: (count?: number) => void;
  toggleFilterDrawer: () => void;
  toggleSortDrawer: () => void;
};

const useShopState = create<RootState>((set) => ({
  isfilterDrawer: false,
  isSortDrawer: false,
  setResultCount: (resultCount) => set({ resultCount }),
  toggleFilterDrawer: () =>
    set((state) => ({ isfilterDrawer: !state.isfilterDrawer })),
  toggleSortDrawer: () =>
    set((state) => ({ isSortDrawer: !state.isSortDrawer })),
}));

export default useShopState;
