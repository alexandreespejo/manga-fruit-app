import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from 'styled-components';
import Colors from "./constants/Colors";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from "./navigation";
import { useLoadedAssets } from "./hooks/useLoadedAssets"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Main() {
  const assetsLoad = useLoadedAssets()
  const queryClient = new QueryClient()

  if (!assetsLoad) return null

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
