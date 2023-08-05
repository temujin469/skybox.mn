import { create } from "zustand";

type RootState = {
  productId?: string;
  setProductId: (productId: string) => void;
};

const useAppState = create<RootState>((set) => ({
  setProductId: (productId) => set({ productId }),
}));

export default useAppState;
