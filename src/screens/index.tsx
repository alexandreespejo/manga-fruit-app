import React, { useEffect, useState } from "react"
import { StatusBar } from "react-native"
import { ThemeProvider } from 'styled-components'
import Colors from "../constants/Colors"
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MyTabs from "../navigation"
import { getIsDarkMode } from "../services/storage"

type ThemeType = 'light' | 'dark'
function Screens() {
  const [actualTheme, setActualTheme] = useState<ThemeType>('light')

  useEffect(() => {
    (async () => {
      const isDark = await getIsDarkMode()
      setActualTheme(isDark ? 'dark' : 'light')
    })()
  })

  return (
    <ThemeProvider theme={Colors[actualTheme]}>
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
