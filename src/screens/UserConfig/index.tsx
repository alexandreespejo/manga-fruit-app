import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, SwitchContainer } from "./style"
import Load from "../../components/Load"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"
import { Switch } from "react-native"
import { Label } from "../../components/Label"
import { getIsDarkMode, getShowLastReaders, getShowSuggestions, setAppIsDarkMode, setAppShowLastReaders, setAppShowSuggestions } from "../../services/storage"
import { useTheme } from "styled-components/native"

const adUnitId = 'ca-app-pub-4863844449125415/7261642143'
const switchTrackColor = { false: '#767577', true: '#f4f3f4' }

export default function UserConfigScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showLastReaders, setShowLastReaders] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const loadStates = async () => {
    setIsLoading(true)
    const appIsDark = await getIsDarkMode()
    setIsDarkMode(appIsDark)

    const appShowLast = await getShowLastReaders()
    setShowLastReaders(appShowLast)

    const appShowSuggestion = await getShowSuggestions()
    setShowSuggestions(appShowSuggestion)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadStates()
  }, []))

  return (
    <Container>
      {isLoading && <Load />}
      <SwitchContainer>
        <Switch
          trackColor={switchTrackColor}
          thumbColor={isDarkMode ? theme.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !isDarkMode
            setAppIsDarkMode(newState)
            setIsDarkMode(newState)
          }}
          value={isDarkMode}
        />
        <Label variant="Text" onPress={() => setIsDarkMode(!isDarkMode)} style={{ marginLeft: 8 }}>Dark mode</Label>
      </SwitchContainer>
      {/* <SwitchContainer>
        <Switch
          trackColor={switchTrackColor}
          thumbColor={showLastReaders ? theme.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !showLastReaders
            setAppShowLastReaders(newState)
            setShowLastReaders(newState)
          }}
          value={showLastReaders}
        />
        <Label variant="Text" onPress={() => setShowLastReaders(!showLastReaders)} style={{ marginLeft: 8 }}>Show Last Readers</Label>
      </SwitchContainer> */}
      <SwitchContainer>
        <Switch
          trackColor={switchTrackColor}
          thumbColor={showSuggestions ? theme.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !showSuggestions
            setAppShowSuggestions(newState)
            setShowSuggestions(newState)
          }}
          value={showSuggestions}
        />
        <Label variant="Text" onPress={() => setShowSuggestions(!showSuggestions)} style={{ marginLeft: 8 }}>Show Suggestions</Label>
      </SwitchContainer>
    </Container>
  )
}