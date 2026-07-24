import { create } from 'zustand'

interface CartUIState {
  optimisticItemsCount: number | null
  setOptimisticItemsCount: (count: number) => void
  incrementOptimisticCount: (by?: number) => void
  optimisticDeletedItemIds: string[]
  addOptimisticDeletedItem: (id: string) => void
  removeOptimisticDeletedItem: (id: string) => void
  isAddedModalOpen: boolean
  lastAddedItem: any | null
  openAddedModal: (item: any) => void
  closeAddedModal: () => void
}

export const useCartUIStore = create<CartUIState>((set) => ({
  optimisticItemsCount: null,
  optimisticDeletedItemIds: [],
  isAddedModalOpen: false,
  lastAddedItem: null,
  setOptimisticItemsCount: (count) => set({ optimisticItemsCount: count }),
  incrementOptimisticCount: (by = 1) =>
    set((state) => ({
      optimisticItemsCount:
        state.optimisticItemsCount !== null
          ? state.optimisticItemsCount + by
          : by,
    })),
  addOptimisticDeletedItem: (id) =>
    set((state) => ({
      optimisticDeletedItemIds: [...state.optimisticDeletedItemIds, id],
    })),
  removeOptimisticDeletedItem: (id) =>
    set((state) => ({
      optimisticDeletedItemIds: state.optimisticDeletedItemIds.filter((item) => item !== id),
    })),
  openAddedModal: (item) =>
    set({
      isAddedModalOpen: true,
      lastAddedItem: item,
    }),
  closeAddedModal: () =>
    set({
      isAddedModalOpen: false,
    }),
}))
