import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, MangaListContainer, ScrollContainer } from "./style"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"
import internalization from "../../services/internalization"
import { getRecommendations } from "../../services/recommendations"
import { Label } from "../../components/Label"
import { LanguageTypes, getLastUpdates } from "../../services/mangadex"
import { useQuery } from "@tanstack/react-query"
import { AppStoreType, useAppStore } from "../../store"
import { getLastVisited } from "../../hooks/useAppStorage"
import { SearchInputButton } from "../../components/SearchInput"
import { AdsBanner } from "../../components/AdsManager"

const adUnitId = 'ca-app-pub-4863844449125415/1327516507'

type RenderHorizontalListProps = {
  list: any[]
  title: string
}

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const showSuggestion = useAppStore((state: AppStoreType) => state.showSuggestion)
  const [recommendationList, setRecommendationList] = useState([])
  const [isLoadingAds, setIsLoadingAds] = useState(false)
  const [lastVisitedList, setLastVisitedList] = useState([])

  const loadLastUpdated = async () => {
    loadMostPopular()
    const lang = internalization.t('languageFilter') as LanguageTypes
    const { data } = await getLastUpdates(lang)
    return data?.data ?? []
  }

  const { isLoading, data } = useQuery({
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
  }: RenderHorizontalListProps) => {
    if (list.length === 0) return null

    return (
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
  }

  const loadMostPopular = async () => {
    if (recommendationList.length) return
    getRecommendations("topten").then(list => {
      setRecommendationList(list)
    })
  }

  const loadData = useCallback(() => {
    getLastVisited().then(list => {
      if (JSON.stringify(list) !== JSON.stringify(lastVisitedList))
        setLastVisitedList(list)
    })
  }, [])

  useFocusEffect(loadData)

  return (
    <Container>
      {isLoading || isLoadingAds ? <Load /> : null}
      <SearchInputButton onPress={() => navigation.navigate('Search')} style={{ alignItems: 'center' }} />
      <AdsBanner
        adUnitId={adUnitId}
        onLoadStart={() => setIsLoadingAds(true)}
        onAdLoaded={() => setIsLoadingAds(false)}
        onAdFailedToLoad={() => setIsLoadingAds(false)}
        style={{ marginVertical: 8, flexDirection: 'row' }}
      />
      {
        showSuggestion &&
        <ScrollContainer>
          <RenderHorizontalList
            title={internalization.t('homeLastVisited')}
            list={lastVisitedList ?? []}
          />
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