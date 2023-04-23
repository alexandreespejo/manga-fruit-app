import { useContext, useEffect, useState } from "react"
import { Text } from "react-native"
import { ApplicationContext } from "../../contexts/Application"
import { getChapters } from "../../services/mangadex"
import { Container, ContentWrraper, Label, ChapterButton, ChapterList, HeaderWrapper } from "./style"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import { getChapterRead, getFavoriteMangaList, storeChapterRead, storeFavoriteMangaList } from "../../services/storage"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../../constants/Colors"

export default function ChapterScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const { mangaData } = route.params ?? {}
  const { startLoad, endLoad } = useContext(ApplicationContext)
  const [page, setPage] = useState(0)
  const [maxPages, setMaxPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [chapters, setChapters] = useState([])
  const [chaptersRead, setChaptersRead] = useState([])

  useEffect(() => {
    console.log('mangaData=>', mangaData.id)
    startLoad()
    loadReadChapters()
    loadFavorites()
    loadChapters()
  }, [])

  const loadFavorites = () => {
    getFavoriteMangaList().then(list => {
      console.log(list)
    })
  }

  const changeFavoriteState = () => {
    // storeFavoriteMangaList()
  }

  const loadReadChapters = () => {
    getChapterRead().then(mangas => {
      if (mangas[mangaData.id]) setChaptersRead(mangas[mangaData.id])
    })
  }

  const loadChapters = () => {
    // const nextPage = page+1

    getChapters(mangaData?.id).then((data) => {

      let chapterList = []

      for (let volume in data.volumes) {
        const { chapters } = data.volumes[volume]
        for (let chapter in chapters) {
          chapterList.push(chapters[chapter])
        }
      }

      setChapters(chapterList)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
      endLoad()
    })
  }

  const openReader = async (chapterData: any) => {
    await storeChapterRead(mangaData.id, chapterData.chapter)
    navigation.navigate('Reader', { chapterData })
  }

  const listChapters = ({ item }) => {
    const label = `Capitulo ${item?.chapter}`
    const isRead = chaptersRead && chaptersRead.find(data => data === item?.chapter)

    return (
      <ChapterButton onPress={() => openReader(item)}>
        <Text numberOfLines={1} style={{ color: isRead ? 'gray' : 'black' }}>{label}</Text>
      </ChapterButton>
    )
  }

  // const renderFooterLoader = () => {
  //   if (!isLoading) return null
  //   return <Load />
  // }

  // const onReachListEnd = () => {
  //   const nextPage = page + 1
  //   if (nextPage <= maxPages) {
  //     setIsLoading(true)
  //     loadChapters()
  //   }

  return (
    <Container>
      <ContentWrraper>
        <HeaderWrapper>
          <Label>
            {mangaData?.attributes?.title?.en || 'Titulo do mangá'}
          </Label>
          <FontAwesome name="star" size={30} color={true ? Colors.light.tint : 'lightgray'} />
        </HeaderWrapper>
        <ChapterList
          data={chapters}
          renderItem={listChapters}
          keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        // onEndReached={onReachListEnd}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={renderFooterLoader}
        />

      </ContentWrraper>
    </Container>
  )
}