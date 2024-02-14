import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

export type AppStoreType = {
  storeKeys: {
    loadAllPagesOnce: string
  },
  themeIsDark: boolean
  setThemeIsDark: (state: boolean) => void
  loadAllPagesOnce: boolean
  setLoadAllPagesOnce: (state: boolean) => void
  showSuggestion: boolean
  setShowSuggestion: (state: boolean) => void
  verticalOrientation: boolean
  setVerticalOrientation: (state: boolean) => void
}

export const getAsyncStorage = async (key: string) => {
  const state = await AsyncStorage.getItem(key) ?? 'false'
  return state === 'true'
}

export const setAsyncStorage = async (key: string, state: boolean) => {
  await AsyncStorage.setItem(key, String(state))
}

export const useAppStore = create<AppStoreType>((set, get) => ({
  storeKeys: {
    loadAllPagesOnce: '@manga_fruit_application_load_all_pages'
  },
  themeIsDark: false,
  showSuggestion: true,
  verticalOrientation: false,
  loadAllPagesOnce: false,
  setLoadAllPagesOnce: (state) => {
    setAsyncStorage(get().storeKeys.loadAllPagesOnce, state)
    set(() => ({ loadAllPagesOnce: state }))
  },
  setVerticalOrientation: (state) => set(() => ({ verticalOrientation: state })),
  setThemeIsDark: (state) => set(() => ({ themeIsDark: state })),
  setShowSuggestion: (state) => set(() => ({ showSuggestion: state })),
}))