import React from "react"
import { StatusBar } from "react-native"
import { ThemeProvider } from 'styled-components'
import Colors from "../constants/Colors"
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MyTabs from "../navigation"
import { useAppStore } from "../store"

function Screens() {
  const themeIsDark = useAppStore((state: any) => state.themeIsDark)

  return (
    <ThemeProvider theme={Colors[themeIsDark ? 'dark' : 'light']}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
        />
        <MyTabs />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default Screens
