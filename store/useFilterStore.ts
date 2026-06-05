import { create } from 'zustand'

interface FilterState {
  q: string
  category: string[]
  pricing: string[]
  sort: string
  page: number
  setFilter: (key: keyof Omit<FilterState, 'setFilter' | 'reset'>, value: any) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  q: '',
  category: [],
  pricing: [],
  sort: 'newest',
  page: 1,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value, page: key !== 'page' ? 1 : value })),
  reset: () => set({ q: '', category: [], pricing: [], sort: 'newest', page: 1 }),
}))