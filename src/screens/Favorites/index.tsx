import React, { useCallback, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, MangaListContainer } from "./style"
import { getFavoriteMangaList } from "../../services/storage"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"

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
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={mangaList}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        renderItem={renderManga}
      />
    </Container>
  )
}