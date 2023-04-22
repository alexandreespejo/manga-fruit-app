import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from 'styled-components';
import Colors from "./constants/Colors";
import { ApplicationProvider } from "./contexts/Application";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from "./navigation";
import { useLoadedAssets } from "./hooks/useLoadedAssets"

function Main() {
  const assetsLoad = useLoadedAssets()
  if (!assetsLoad) return null
  return (
    <ApplicationProvider>
      <ThemeProvider theme={Colors.light}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
          />
          <MyTabs />
        </NavigationContainer>
      </ThemeProvider>
    </ApplicationProvider>
  );
}

export default Main;
