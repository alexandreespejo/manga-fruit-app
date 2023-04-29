import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Text } from "react-native"
import { ApplicationContext } from "../../contexts/Application"
import { getChapters } from "../../services/mangadex"
import { Container, Label, ChapterButton, ChapterList, HeaderWrapper } from "./style"
import { NavigationProp, RouteProp, useFocusEffect } from "@react-navigation/native"
import { getChapterRead, getFavoriteMangaList, storeChapterRead, storeFavoriteMangaList } from "../../services/storage"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../../constants/Colors"

const DEFAULT_PAGINATION = {
  limit: 30,
  page: 0,
  total: 30,
}

export default function ChapterScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const pagination = useRef({ ...DEFAULT_PAGINATION })

  const { mangaData } = route.params ?? {}
  const { startLoad, endLoad } = useContext(ApplicationContext)
  const [chapters, setChapters] = useState([])
  const [chaptersRead, setChaptersRead] = useState([])
  const [chapterIsFavorite, setChapterIsFavorite] = useState(false)

  useEffect(() => {
    loadChapters()
  }, [])

  useFocusEffect(useCallback(() => {
    loadReadChapters()
    loadFavorites()
  }, []))

  const loadFavorites = () => {
    getFavoriteMangaList().then(list => {
      setChapterIsFavorite(list.find(favMangaData => JSON.stringify(favMangaData) === JSON.stringify(mangaData)) !== undefined)
    })
  }

  const changeFavoriteState = () => {
    getFavoriteMangaList().then(list => {
      let favList = list
      if (chapterIsFavorite) favList = favList.filter(favMangaData => JSON.stringify(favMangaData) !== JSON.stringify(mangaData))
      else favList.push(mangaData)

      storeFavoriteMangaList(favList).then(() => {
        setChapterIsFavorite(!chapterIsFavorite)
      })
    })
  }

  const loadReadChapters = () => {
    getChapterRead().then(mangas => {
      if (mangas[mangaData.id]) setChaptersRead(mangas[mangaData.id])
    })
  }

  const loadChapters = () => {
    const { page, limit, total } = pagination.current
    const offset = page * limit
    if (offset && offset > total) return

    startLoad()
    getChapters(mangaData?.id, limit, offset).then((data) => {
      if (data.total !== total) pagination.current.total = data.total
      pagination.current.page = page + 1

      setChapters(oldList => [...oldList, ...data.data])
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      endLoad()
    })
  }

  const openReader = async (chapterData: any) => {
    await storeChapterRead(mangaData.id, chapterData?.attributes?.chapter)
    navigation.navigate('Reader', { chapterData })
  }

  const listChapters = ({ item }) => {
    const label = `Capitulo ${item?.attributes?.chapter} ${item?.attributes?.title ? `: ${item?.attributes?.title}` : ''}`
    const isRead = chaptersRead && chaptersRead.find(data => data === item?.attributes?.chapter)

    return (
      <ChapterButton onPress={() => openReader(item)}>
        <Text numberOfLines={1} style={{ color: isRead ? 'gray' : 'black' }}>{label}</Text>
      </ChapterButton>
    )
  }

  return (
    <Container>
      <HeaderWrapper>
        <Label>
          {mangaData?.attributes?.title?.en || 'Titulo do mangá'}
        </Label>
        <FontAwesome
          onPress={changeFavoriteState}
          name="star"
          size={30}
          color={chapterIsFavorite ? Colors.light.tint : 'lightgray'}
        />
      </HeaderWrapper>
      <ChapterList
        data={chapters}
        renderItem={listChapters}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        onEndReached={loadChapters}
      />
    </Container>
  )
}