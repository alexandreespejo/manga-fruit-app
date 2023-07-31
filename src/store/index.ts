import { create } from 'zustand'

export type AppStoreType = {
  themeIsDark: boolean
  setThemeIsDark: (state: boolean) => void
  showSuggestion: boolean
  setShowSuggestion: (state: boolean) => void
}

export const useAppStore = create((set) => ({
  themeIsDark: false,
  showSuggestion: false,
  setThemeIsDark: (state: boolean) => set(() => ({ themeIsDark: state })),
  setShowSuggestion: (state: boolean) => set(() => ({ showSuggestion: state })),
}))