import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, SwitchContainer } from "./style"
import Load from "../../components/Load"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"
import { Switch } from "react-native"
import { Label } from "../../components/Label"
import Colors from "../../constants/Colors"
import { getIsDarkMode, getShowLastReaders, getShowSuggestions, setAppIsDarkMode, setAppShowLastReaders, setAppShowSuggestions } from "../../services/storage"

const adUnitId = 'ca-app-pub-4863844449125415/7261642143'

export default function UserConfigScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showLastReaders, setShowLastReaders] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const loadStates = async () => {
    const appIsDark = await getIsDarkMode()
    setIsDarkMode(appIsDark)

    const appShowLast = await getShowLastReaders()
    setShowLastReaders(appShowLast)

    const appShowSuggestion = await getShowSuggestions()
    setShowSuggestions(appShowSuggestion)
  }

  useFocusEffect(useCallback(() => {
    loadStates()
  }, []))

  return (
    <Container>
      <SwitchContainer>
        <Switch
          trackColor={{ false: '#767577', true: '#f4f3f4' }}
          thumbColor={isDarkMode ? Colors.light.tint : '#f4f3f4'}
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
      <SwitchContainer>
        <Switch
          trackColor={{ false: '#767577', true: '#f4f3f4' }}
          thumbColor={showLastReaders ? Colors.light.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !showLastReaders
            setAppShowLastReaders(newState)
            setShowLastReaders(newState)
          }}
          value={showLastReaders}
        />
        <Label variant="Text" onPress={() => setShowLastReaders(!showLastReaders)} style={{ marginLeft: 8 }}>Show Last Readers</Label>
      </SwitchContainer>
      <SwitchContainer>
        <Switch
          trackColor={{ false: '#767577', true: '#f4f3f4' }}
          thumbColor={showSuggestions ? Colors.light.tint : '#f4f3f4'}
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