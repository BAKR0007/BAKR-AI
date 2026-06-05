import { create } from 'zustand'

export interface FilterState {
  q: string
  category: string[]
  pricing: string[]
  sort: string
  page: number
  setFilter: {
    (key: 'q' | 'sort', value: string): void
    (key: 'category' | 'pricing', value: string[]): void
    (key: 'page', value: number): void
  }
  reset: () => void
}

const defaultState = {
  q: '',
  category: [] as string[],
  pricing: [] as string[],
  sort: 'newest',
  page: 1,
}

export const useFilterStore = create<FilterState>((set) => ({
  ...defaultState,

  setFilter: (key: string, value: string | string[] | number) =>
    set((state) => ({ ...state, [key]: value })),

  reset: () => set({ ...defaultState }),
}))