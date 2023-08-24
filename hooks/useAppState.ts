import { create } from "zustand";

type RootState = {
  productId?: string;
  vendorId?: string;
  searchPropertyContents?: SearchPropertyContent[];
  setProductId: (productId: string) => void;
  setvendorId: (vendorId: string) => void;
  setSearchPropertyContents: (properties: SearchPropertyContent[]) => void;
};

const useAppState = create<RootState>((set) => ({
  setProductId: (productId) => set({ productId }),
  setvendorId: (vendorId) => set({ vendorId }),
  setSearchPropertyContents: (properties) => set({ searchPropertyContents:properties }),
}));

export default useAppState;
