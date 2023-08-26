import { create } from "zustand";

type RootState = {
  productId?: string;
  vendorId?: string;
  categoryId?: string;
  searchPropertyContents?: SearchPropertyContent[];
  setProductId: (productId: string) => void;
  setCategoryId: (categoryId: string) => void;
  setvendorId: (vendorId: string) => void;
  setSearchPropertyContents: (properties: SearchPropertyContent[]) => void;
};

const useAppState = create<RootState>((set) => ({
  setProductId: (productId) => set({ productId }),
  setvendorId: (vendorId) => set({ vendorId }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setSearchPropertyContents: (properties) => set({ searchPropertyContents:properties }),
}));

export default useAppState;
