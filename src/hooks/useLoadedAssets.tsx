import { Ionicons, Entypo, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import Local from 'expo-localization'
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import React from "react"
import mobileAds from 'react-native-google-mobile-ads'
import internalization from "../services/internalization"

export function useLoadedAssets() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync(Ionicons.font)
        await Font.loadAsync(Entypo.font)
        await Font.loadAsync(MaterialIcons.font)
        await Font.loadAsync(FontAwesome.font)
        // const { locale } = await Local.getLocalizationAsync()
        // internalization.locale = locale
        //Load ads SDK
        // await mobileAds().initialize()

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
