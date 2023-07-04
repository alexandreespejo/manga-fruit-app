import React, { useState, useCallback } from "react"
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
import Colors from "../../constants/Colors"

const adUnitId = 'ca-app-pub-4863844449125415/3423097775'

type RenderHorizontalListProps = {
  list: any[]
  title: string
}

const SearchButtonNavigator = ({ navigation }: { navigation: NavigationProp<any> }) => (
  <SearchNavigatorContainer onPress={() => { navigation.navigate('Search') }}>
    <SearchNavigatorIndicator>
      <FontAwesome name="search" size={24} color={Colors.light.background} />
    </SearchNavigatorIndicator>
  </SearchNavigatorContainer>
)

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendationList, setRecommendationList] = useState([])
  const [lastUpdatedList, setLastUpdatedList] = useState([])

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

  const loadLastUpdated = async () => {
    setIsLoading(true)
    getLastUpdates(internalization.t('languageFilter') as LanguageTypes).then(list => {
      if (list.data.data)
        setLastUpdatedList(list.data.data)
    }).catch(e => console.log(e)).finally(() => setIsLoading(false))
  }

  const loadMostPopular = async () => {
    if (recommendationList.length) return
    setIsLoading(true)
    getRecommendations("topten").then(list => {
      setRecommendationList(list)
    }).finally(() => setIsLoading(false))
  }

  useFocusEffect(useCallback(() => {
    loadMostPopular()
    loadLastUpdated()
  }, []))

  return (
    <Container>
      {isLoading && <Load />}
      <SearchButtonNavigator navigation={navigation} />
      <ScrollContainer>
        <RenderHorizontalList
          title={internalization.t('homeMostPopular')}
          list={recommendationList}
        />
        <RenderHorizontalList
          title={internalization.t('homeLastUpdated')}
          list={lastUpdatedList}
        />
      </ScrollContainer>
    </Container>
  )
}