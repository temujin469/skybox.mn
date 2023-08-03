import {create} from 'zustand';

type Filter = {
  filters?: Partial<ProductFilter>;
  setFilter: (filters: Partial<ProductFilter>) => void;
};

const useFilter = create<Filter>((set)=>({
  setFilter:(filters)=>set({filters})
}))

export default useFilter;