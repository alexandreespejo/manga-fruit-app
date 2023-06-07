import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, MangaListContainer } from "./style"
import { getFavoriteMangaList } from "../../services/storage"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"

const adUnitId = 'ca-app-pub-4863844449125415/7261642143'

export default function FavoritesScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [mangaList, setMangaList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleSelectManga = async (mangaData: any) => {
    navigation.navigate('Chapter', { mangaData })
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    getFavoriteMangaList().then(list => {
      setMangaList(list)
    }).finally(() => {
      setIsLoading(false)
    })
  }, []))

  return (
    <Container>
      {isLoading && <Load />}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={mangaList}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        renderItem={renderManga}
      />
    </Container>
  )
}