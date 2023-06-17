import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from 'styled-components';
import Colors from "./constants/Colors";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from "./navigation";
import { useLoadedAssets } from "./hooks/useLoadedAssets"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

const intersticialId = 'ca-app-pub-4863844449125415/5598910378'
const interstitial = InterstitialAd.createForAdRequest(intersticialId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
})

function Main() {
  const assetsLoad = useLoadedAssets()
  const queryClient = new QueryClient()
  const [loadedAd, setLoadedAd] = useState(false)
  const [showedAd, setShowedAd] = useState(false)

  if (!assetsLoad) return null

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoadedAd(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  })

  useEffect(() => {
    if (loadedAd && assetsLoad && !showedAd) {
      interstitial.show()
      setShowedAd(true)
    }
  }, [loadedAd])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Colors.light}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
          />
          <MyTabs />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Main;
