import { useEffect, useState } from "react"
import { Ionicons, Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import mobileAds from 'react-native-google-mobile-ads'
import { getAppIsReaderVertical, getIsDarkMode, getShowSuggestions } from "../services/storage"
import { AppStoreType, useAppStore } from "../store"

export function useLoadedAssets() {
  const setThemeIsDark = useAppStore((state: AppStoreType) => state.setThemeIsDark)
  const setShowSuggestion = useAppStore((state: AppStoreType) => state.setShowSuggestion)
  const setVerticalOrientation = useAppStore((state: AppStoreType) => state.setVerticalOrientation)
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync(Ionicons.font)
        await Font.loadAsync(Entypo.font)
        await Font.loadAsync(MaterialIcons.font)
        await Font.loadAsync(FontAwesome.font)

        // Internal App
        const isDark = await getIsDarkMode()
        setThemeIsDark(isDark)

        const showSuggestion = await getShowSuggestions()
        setShowSuggestion(showSuggestion)

        const isReaderVertical = await getAppIsReaderVertical()
        setVerticalOrientation(isReaderVertical)

        //Load ads SDK
        await mobileAds().initialize()

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
