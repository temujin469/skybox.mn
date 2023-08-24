import { create } from "zustand";

type RootState = {
  productId?: string;
  vendorId?:string;
  setProductId: (productId: string) => void;
  setvendorId: (vendorId: string) => void;
};

const useAppState = create<RootState>((set) => ({
  setProductId: (productId) => set({ productId }),
  setvendorId: (vendorId) => set({ vendorId }),
}));

export default useAppState;
