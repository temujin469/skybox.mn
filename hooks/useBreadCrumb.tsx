import { create } from 'zustand';

interface BreadCrumbState  {
  links?:BreadCrumb[]
  setLinks: (links?:BreadCrumb[])=> void
}

const useBreadCrumb = create<BreadCrumbState>((set) => ({
  setLinks: (links) => set({ links})
}))

export default useBreadCrumb;