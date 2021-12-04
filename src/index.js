import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from 'styled-components';
import Colors from "./constants/Colors";
import SearchScreen from "./screens/Search";

function Main() {
  return (
    <ThemeProvider theme={Colors.light}>
      <StatusBar
        barStyle="dark-content"
      />
      <SearchScreen />
    </ThemeProvider>
  );
}

export default Main;
