import React, { useCallback, useContext, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { Container, MangaListContainer } from "./style"
import { ApplicationContext } from "../../contexts/Application"
import { getFavoriteMangaList } from "../../services/storage"
import { MangaCard } from "../../components/MangaCard"

export default function FavoritesScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [mangaList, setMangaList] = useState([])
  const { startLoad, endLoad } = useContext(ApplicationContext)

  const handleSelectManga = async (mangaData: any) => {
    navigation.navigate('Chapter', { mangaData })
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  useFocusEffect(useCallback(() => {
    startLoad()
    getFavoriteMangaList().then(list => {
      setMangaList(list)
    }).finally(() => endLoad())
  }, []))

  return (
    <Container>
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={mangaList}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        renderItem={renderManga}
      />
    </Container>
  )
}