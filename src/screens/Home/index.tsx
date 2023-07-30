import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, MangaListContainer, ScrollContainer, SearchNavigatorContainer, SearchNavigatorIndicator } from "./style"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"
import internalization from "../../services/internalization"
import { getRecommendations } from "../../services/recommendations"
import { Label } from "../../components/Label"
import { LanguageTypes, getLastUpdates } from "../../services/mangadex"
import { FontAwesome } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { getIsDarkMode, getShowLastReaders, getShowSuggestions } from "../../services/storage"
import { useTheme } from "styled-components"

const adUnitId = 'ca-app-pub-4863844449125415/1327516507'

type RenderHorizontalListProps = {
  list: any[]
  title: string
}

const SearchButtonNavigator = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const theme = useTheme()

  return (
    <SearchNavigatorContainer onPress={() => { navigation.navigate('Search') }}>
      <SearchNavigatorIndicator>
        <FontAwesome name="search" size={24} color={theme.background} />
      </SearchNavigatorIndicator>
    </SearchNavigatorContainer>
  )
}

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showLastReaders, setShowLastReaders] = useState(false)
  const [recommendationList, setRecommendationList] = useState([])

  const loadLastUpdated = async () => {
    loadMostPopular()
    const lang = internalization.t('languageFilter') as LanguageTypes
    const { data } = await getLastUpdates(lang)
    return data?.data ?? []
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['lastUpdates'],
    queryFn: loadLastUpdated,
  })

  const handleSelectManga = async (mangaData: any) => {
    navigation.navigate('Chapter', { mangaData })
  }

  const renderManga = ({ item }) => (
    <MangaCard
      key={item.id}
      variant="Small"
      data={item}
      onSelectManga={handleSelectManga}
      style={{ marginLeft: 16 }}
    />
  )

  const RenderHorizontalList = ({
    list,
    title
  }: RenderHorizontalListProps) => (
    <>
      <Label
        variant="Title"
        children={title}
        style={{ paddingHorizontal: 32, fontWeight: "bold" }}
      />
      <MangaListContainer
        data={list}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        getItemCount={() => list.length}
        getItem={(data, index) => data[index]}
        renderItem={renderManga}
        horizontal
      />
    </>
  )

  const loadMostPopular = async () => {
    if (recommendationList.length) return
    getRecommendations("topten").then(list => {
      setRecommendationList(list)
    })
  }

  const loadAppStates = async () => {
    const appShowLast = await getShowLastReaders()
    setShowLastReaders(appShowLast)

    const appShowSuggestion = await getShowSuggestions()
    setShowSuggestions(appShowSuggestion)
  }

  useFocusEffect(useCallback(() => {
    loadAppStates()
  }, []))


  return (
    <Container>
      {isLoading && <Load />}
      <SearchButtonNavigator navigation={navigation} />
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}

      {
        showSuggestions &&
        <ScrollContainer>
          <RenderHorizontalList
            title={internalization.t('homeMostPopular')}
            list={recommendationList ?? []}
          />
          <RenderHorizontalList
            title={internalization.t('homeLastUpdated')}
            list={data ?? []}
          />
        </ScrollContainer>
      }
    </Container>
  )
}