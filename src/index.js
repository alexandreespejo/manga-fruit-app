import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from 'styled-components';
import Colors from "./constants/Colors";
import { ApplicationProvider } from "./contexts/Application";
import SearchScreen from "./screens/Search";

function Main() {
  return (
    <ApplicationProvider>
      <ThemeProvider theme={Colors.light}>
        <StatusBar
          barStyle="dark-content"
        />
        <SearchScreen />
      </ThemeProvider>
    </ApplicationProvider>
  );
}

export default Main;
