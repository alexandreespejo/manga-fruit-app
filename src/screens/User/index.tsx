import React from "react"
import { NavigationProp } from '@react-navigation/native'
import { ConfigContainer, Container, SubscriptionContainer, SwitchContainer, UserProfile, UserProfileContainer } from "./style"
import { Linking, Switch } from "react-native"
import { Label } from "../../components/Label"
import { setAppIsDarkMode, setAppIsReaderVertical, setAppShowSuggestions } from "../../hooks/useAppStorage"
import { useTheme } from "styled-components/native"
import { AppStoreType, useAppStore } from "../../store"
import internalization from "../../services/internalization"
import { CustomButton } from "../../components/Button"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { useAuth } from "../../hooks/useAuth"
import { SubscriptionCard } from "../../components/SubscriptionCard"
import Load from "../../components/Load"

const switchTrackColor = { false: '#767577', true: '#f4f3f4' }

const SubscriptionManager = () => {
  const { userIsPremium, handleSelectSubscription, manageBilling, updateCustomerInfo, signOut } = useAuth()

  if (userIsPremium) return (
    <>
      <CustomButton onPress={manageBilling} style={{ marginTop: 16 }}>
        {internalization.t('manageSubButtonText')}
      </CustomButton>
      <CustomButton onPress={updateCustomerInfo} style={{ marginTop: 16 }}>
        {internalization.t('updateButtonText')}
      </CustomButton>
      <CustomButton onPress={signOut} style={{ marginTop: 16 }}>
        {internalization.t('logoutButtonText')}
      </CustomButton>
    </>
  )

  return (
    <SubscriptionContainer>
      <Label variant="Headline">{internalization.t('becomePremium')}</Label>
      <Label variant="Description" style={{ textAlign: 'center' }}>{internalization.t('becomePremiumDescription')}</Label>
      <SubscriptionCard
        onPress={handleSelectSubscription('1M')}
        mainText={`R$ 9,97 / ${internalization.t('month')}`}
        secondaryText={`R$ 15,64 / ${internalization.t('month')}`}
        style={{ marginTop: 16 }}
        highlight
      />
      <SubscriptionCard
        onPress={handleSelectSubscription('12M')}
        mainText={`R$ 90,60 / ${internalization.t('year')} - (R$ 7,55/${internalization.t('month')})`}
        secondaryText={`R$ 119,64 / ${internalization.t('year')}`}
        style={{ marginTop: 16 }}
      />
    </SubscriptionContainer>
  )
}

export default function UserConfigScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { signIn, isSignedIn, authUserInfo, isLoading } = useAuth()
  const { setThemeIsDark, setShowSuggestion, showSuggestion, themeIsDark, setVerticalOrientation, verticalOrientation } = useAppStore((state: AppStoreType) => state)
  const theme = useTheme()

  const handlePress = async () => {
    const telegramUrl = 'https://www.vakinha.com.br/4320875'
    const supported = await Linking.canOpenURL(telegramUrl)

    if (supported) {
      await Linking.openURL(telegramUrl)
    }
  }

  return (
    <Container>
      {isLoading && <Load />}
      {
        isSignedIn ? (<>
          <UserProfileContainer>
            <UserProfile source={{ uri: authUserInfo.user.photo ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' }} />
          </UserProfileContainer>
          <Label variant="Title" children={`${authUserInfo.user.name}`} />
          <SubscriptionManager />
        </>
        ) : (
          <GoogleSigninButton
            style={{ marginTop: 32 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        )
      }
      <ConfigContainer style={{ marginTop: 16 }}>
        <Label variant="Title">{internalization.t('configScreenTitle')}</Label>
        <SwitchContainer>
          <Switch
            trackColor={switchTrackColor}
            thumbColor={verticalOrientation ? theme.tint : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              const newState = !verticalOrientation
              setVerticalOrientation(newState)
              setAppIsReaderVertical(newState)
            }}
            value={verticalOrientation}
          />
          <Label variant="Text" style={{ marginLeft: 8 }}>{internalization.t('configIsVerticalModeLabel')}</Label>
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
      </ConfigContainer>
      <CustomButton onPress={handlePress} style={{ marginTop: 16 }}>
        {internalization.t('configCommunityButton')}
      </CustomButton>
    </Container>
  )
}