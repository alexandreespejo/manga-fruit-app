import { create } from 'zustand'

export type ReaderStoreType = {
  scrollEnabled: boolean
  verticalOrientation: boolean
  changeOrientation: () => void
  setScrollEnabled: (state: boolean) => void
}

export const useReaderStore = create<ReaderStoreType>((set, get) => ({
  verticalOrientation: false,
  scrollEnabled: true,
  changeOrientation: () => set(() => ({ ...get(), verticalOrientation: !get().verticalOrientation })),
  setScrollEnabled: (state) => set(() => ({ ...get(), scrollEnabled: state })),
}))