import { create } from 'zustand'

export type AppStoreType = {
  themeIsDark: boolean
  setThemeIsDark: (state: boolean) => void
  showSuggestion: boolean
  setShowSuggestion: (state: boolean) => void
  verticalOrientation: boolean
  setVerticalOrientation: (state: boolean) => void
}

export const useAppStore = create<AppStoreType>((set, get) => ({
  themeIsDark: false,
  showSuggestion: true,
  verticalOrientation: false,
  setVerticalOrientation: (state) => set(() => ({ verticalOrientation: state })),
  setThemeIsDark: (state) => set(() => ({ themeIsDark: state })),
  setShowSuggestion: (state) => set(() => ({ showSuggestion: state })),
}))