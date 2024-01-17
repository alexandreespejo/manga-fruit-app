import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, MangaListContainer } from "./style"
import { getFavoriteMangaList } from "../../hooks/useAppStorage"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"
import { AdsBanner } from "../../components/AdsManager"
import { View } from "react-native"
import { useAuth } from "../../hooks/useAuth"

const adUnitId = 'ca-app-pub-4863844449125415/7261642143'

export default function FavoritesScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { userIsPremium } = useAuth()
  const [mangaList, setMangaList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAds, setIsLoadingAds] = useState(false)
  const handleSelectManga = async (mangaData: any) => {
    navigation.navigate('Chapter', { mangaData })
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    getFavoriteMangaList().then(list => {
      // createRecommendations(list)
      setMangaList(list)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))

  return (
    <Container>
      {isLoading || isLoadingAds ? <Load /> : null}
      {
        !userIsPremium ?
          <View style={{ marginVertical: 8, flexDirection: 'row' }}>
            <AdsBanner
              adUnitId={adUnitId}
              onLoadStart={() => setIsLoadingAds(true)}
              onAdLoaded={() => setIsLoadingAds(false)}
              onAdFailedToLoad={() => setIsLoadingAds(false)}
            />
          </View> : null
      }
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={mangaList}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        renderItem={renderManga}
      />
    </Container>
  )
}