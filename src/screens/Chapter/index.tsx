import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useInfiniteQuery } from '@tanstack/react-query'
import { ActivityIndicator, Text } from "react-native"
import { getChapters } from "../../services/mangadex"
import { Container, Label, ChapterButton, ChapterList, HeaderWrapper } from "./style"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import { getChapterRead, getFavoriteMangaList, storeChapterRead, storeFavoriteMangaList } from "../../services/storage"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../../constants/Colors"
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads"
import Load from "../../components/Load"

const adUnitId = 'ca-app-pub-4863844449125415/7605085638'
// const adUnitId = TestIds.BANNER

const DEFAULT_PAGINATION = {
  limit: 40,
  total: 40,
}

const ChapterScreen = memo(({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
  const pagination = useRef({ ...DEFAULT_PAGINATION })

  const { mangaData } = route.params ?? {}
  const [chaptersRead, setChaptersRead] = useState([])
  const [chapterIsFavorite, setChapterIsFavorite] = useState(false)

  const loadChapters = async ({ pageParam = 0 }) => {
    const { limit, total } = pagination.current
    const offset = pageParam
    if (pageParam > total) return []

    loadReadChapters()
    const { data } = await getChapters(mangaData?.id, limit, offset)
    if (data.total !== total) pagination.current.total = data.total
    return data
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`chapter-${mangaData?.id}`],
    queryFn: loadChapters,
    getNextPageParam: (lastPage) => (lastPage?.offset + pagination.current.limit)
  })

  const chapters = useMemo(() => {
    const list: any[] = []

    data?.pages.forEach(page => {
      page.data.forEach(pageData => {
        list.push(pageData)
      })
    })

    return list
  }, [data])

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

  const openReader = async (chapterData: any) => {
    await storeChapterRead(mangaData.id, chapterData?.attributes?.chapter)
    navigation.navigate('Reader', { chapterData })
  }

  const listChapters = useCallback(({ item }) => {
    const label = `Capitulo ${item?.attributes?.chapter} ${item?.attributes?.title ? `: ${item?.attributes?.title}` : ''}`
    const isRead = chaptersRead && chaptersRead.find(data => data === item?.attributes?.chapter)

    return (
      <ChapterButton onPress={() => openReader(item)}>
        <Text numberOfLines={1} style={{ color: isRead ? 'gray' : 'black' }}>{label}</Text>
      </ChapterButton>
    )
  }, [chaptersRead])

  useEffect(() => loadFavorites())

  return (
    <Container>
      {isInitialLoading && <Load />}
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
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}
      <ChapterList
        data={chapters}
        renderItem={listChapters}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        onEndReached={() => hasNextPage && fetchNextPage()}
        getItemCount={() => chapters.length}
        getItem={(data, index) => data[index]}
        initialNumToRender={pagination.current.limit}
        maxToRenderPerBatch={pagination.current.limit}
        onEndReachedThreshold={0.5}
        progressViewOffset={50}
        refreshing={isFetchingNextPage || isFetching}
        ListFooterComponent={(isFetchingNextPage || isFetching) && <ActivityIndicator size="large" color={Colors.light.tint} />}
      />
    </Container>
  )
})

export default ChapterScreen