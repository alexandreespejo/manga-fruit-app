import React, { useState } from "react"
import { NavigationProp } from '@react-navigation/native'
import { Container, SwitchContainer } from "./style"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"
import { Switch } from "react-native"
import { Label } from "../../components/Label"
import { setAppIsDarkMode, setAppShowSuggestions } from "../../services/storage"
import { useTheme } from "styled-components/native"
import { AppStoreType, useAppStore } from "../../store"
import internalization from "../../services/internalization"

const adUnitId = 'ca-app-pub-4863844449125415/7261642143'
const switchTrackColor = { false: '#767577', true: '#f4f3f4' }

export default function UserConfigScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { setThemeIsDark, setShowSuggestion, showSuggestion, themeIsDark, setVerticalOrientation, verticalOrientation } = useAppStore((state: AppStoreType) => state)
  const theme = useTheme()
  const [showLastReaders, setShowLastReaders] = useState(false)

  return (
    <Container>
      <SwitchContainer>
        <Switch
          trackColor={switchTrackColor}
          thumbColor={verticalOrientation ? theme.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !verticalOrientation
            setVerticalOrientation(newState)
            // setThemeIsDark(newState)
          }}
          value={verticalOrientation}
        />
        <Label variant="Text" style={{ marginLeft: 8 }}>Leitura Vertical</Label>
      </SwitchContainer>
      <SwitchContainer>
        <Switch
          trackColor={switchTrackColor}
          thumbColor={themeIsDark ? theme.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !themeIsDark
            setAppIsDarkMode(newState)
            setThemeIsDark(newState)
          }}
          value={themeIsDark}
        />
        <Label variant="Text" style={{ marginLeft: 8 }}>{internalization.t('configIsDarkModeLabel')}</Label>
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
          thumbColor={showSuggestion ? theme.tint : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            const newState = !showSuggestion
            setAppShowSuggestions(newState)
            setShowSuggestion(newState)
          }}
          value={showSuggestion}
        />
        <Label variant="Text" style={{ marginLeft: 8 }}>{internalization.t('configShowSuggestionLabel')}</Label>
      </SwitchContainer>
    </Container>
  )
}