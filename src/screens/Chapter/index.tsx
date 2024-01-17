import { memo, useCallback, useMemo, useRef, useState } from "react"
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { ActivityIndicator, View } from "react-native"
import { getChapters, getMangaAggregation, LanguageTypes, OrderTypes } from "../../services/mangadex"
import { Container, ChapterButton, ChapterList, HeaderWrapper, ChapterText, FiltersModalContainer, FilterForm, FilterFormWrapper, ChapterInput, FormField, ChapterDivider } from "./style"
import { NavigationProp, RouteProp, useFocusEffect } from "@react-navigation/native"
import { getChapterRead, getFavoriteMangaList, storeFavoriteMangaList, storeLastVisited } from "../../hooks/useAppStorage"
import Load from "../../components/Load"
import { CustomButton } from "../../components/Button"
import { RoundedButton } from "../../components/RoundedButton"
import { Dropdown } from "../../components/Dropdown"
import internalization, { languageOptions, orderOptions } from "../../services/internalization"
import { Label } from "../../components/Label"
import { useTheme } from "styled-components"
import { useCurrentManga } from "./store"
import { AdsBanner } from "../../components/AdsManager"
import { useAuth } from "../../hooks/useAuth"

const adUnitId = 'ca-app-pub-4863844449125415/7605085638'

const DEFAULT_PAGINATION = {
  limit: 40,
  total: 40,
}

interface HandleFilterProps {
  initialChapter?: number
  language?: string
  order?: OrderTypes
}

const currentLanguageOptions = languageOptions[internalization.t('languageFilter')] ?? []
const currentOrderOptions = orderOptions[internalization.t('languageFilter')] ?? []
const defaultLanguage = internalization.t('languageFilter')

const FiltersModal = memo(({
  handleFilter
}: {
  handleFilter: (props: HandleFilterProps) => void
}) => {
  const theme = useTheme()

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const [initialChapter, setInitialChapter] = useState('1')
  const [selectedChapterLang, setSelectedChapterLang] = useState(defaultLanguage)
  const [selectedOrder, setSelectedOrder] = useState<OrderTypes>("asc")

  if (!isFilterModalVisible) return (
    <RoundedButton
      name='filter'
      onPress={() => setIsFilterModalVisible(true)}
      color={theme.text}
    />
  )

  return (
    <FiltersModalContainer
      visible={true}
      transparent
    >
      <FilterFormWrapper>
        <FilterForm>
          <Dropdown
            label={internalization.t('chapterFilterLanguageLabel')}
            options={currentLanguageOptions}
            onSelect={lang => setSelectedChapterLang(lang)}
            defaultSelected={selectedChapterLang}
          />
          <FormField>
            <Label children={internalization.t('chapterFilterInitialChapterLabel')} />
            <ChapterInput
              placeholderTextColor={theme.text}
              value={initialChapter.toString()}
              onChangeText={value => setInitialChapter(value)}
            />
          </FormField>
          <Dropdown
            label={internalization.t('chapterFilterOrderLabel')}
            options={currentOrderOptions}
            onSelect={order => setSelectedOrder(order as OrderTypes)}
            defaultSelected={selectedOrder}
          />
          <CustomButton
            onPress={() => {
              setIsFilterModalVisible(false)
              handleFilter({
                initialChapter: initialChapter === '0' || initialChapter === '' ? 1 : Number(initialChapter),
                language: selectedChapterLang,
                order: selectedOrder
              })
            }}
            children={internalization.t('chapterFilterConfirm')}
          />
          <CustomButton
            onPress={() => setIsFilterModalVisible(false)}
            variant="Secondary"
            children={internalization.t('chapterFilterCancel')}
            style={{ marginTop: 10 }}
          />
        </FilterForm>
      </FilterFormWrapper>
    </FiltersModalContainer>
  )
})

const ChapterScreen = memo(({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
  const theme = useTheme()
  const { userIsPremium } = useAuth()
  const queryClient = useQueryClient()
  const { aggregation, setAggregation } = useCurrentManga()
  const { mangaData } = route.params ?? {}
  const paginationRef = useRef({
    initialOffset: 0,
    language: defaultLanguage,
    order: "asc"
  })
  const [chaptersTotal, setChaptersTotal] = useState(40)
  const [chaptersRead, setChaptersRead] = useState([])
  const [isLoadingAds, setIsLoadingAds] = useState(false)
  const [chapterIsFavorite, setChapterIsFavorite] = useState(false)
  const currentQueryKey = `chapter-${mangaData?.id}`

  const loadChapters = useCallback(async ({ pageParam = null }) => {
    try {
      const { limit } = DEFAULT_PAGINATION
      const offset = pageParam ?? paginationRef.current.initialOffset
      if (pageParam > chaptersTotal) return []
      const selectedLang = paginationRef.current.language as LanguageTypes
      const selectedOrder = paginationRef.current.order as OrderTypes
      const { data } = await getChapters(mangaData?.id, limit, offset, selectedLang, selectedOrder)
      if (data.total !== chaptersTotal) setChaptersTotal(data.total)
      return data
    } catch (e) {
      console.log(e)
    }
  }, [chaptersTotal])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [currentQueryKey],
    queryFn: loadChapters,
    getNextPageParam: (lastPage) => {
      const currentOffset = (lastPage?.offset + lastPage?.limit)
      if (currentOffset > lastPage?.total) return null
      return currentOffset
    }
  })

  const chapters = useMemo(() => {
    const list: any[] = []

    data?.pages?.forEach(page => {
      page?.data?.forEach(pageData => {
        list.push(pageData)
      })
    })

    return list
  }, [data])

  const loadFavorites = () => {
    getFavoriteMangaList().then(list => {
      setChapterIsFavorite(list?.find(favMangaData => JSON.stringify(favMangaData) === JSON.stringify(mangaData)) !== undefined)
    })
  }

  const changeFavoriteState = () => {
    setChapterIsFavorite(!chapterIsFavorite)
    getFavoriteMangaList().then(list => {
      let favList = list
      if (chapterIsFavorite) favList = favList?.filter(favMangaData => JSON.stringify(favMangaData) !== JSON.stringify(mangaData))
      else favList.push(mangaData)
      storeFavoriteMangaList(favList)
    })
  }

  const loadReadChapters = () => {
    getChapterRead().then(mangas => {
      if (mangas[mangaData?.id]) setChaptersRead(mangas[mangaData?.id])
    })
  }

  const loadMangaAggregation = () => {
    if (aggregation.mangaId === mangaData?.id) return

    const selectedLang = paginationRef.current.language as LanguageTypes
    getMangaAggregation(mangaData?.id, selectedLang).then(({ data }) => {
      if (data?.result !== 'ok') return
      const volumeKeys = Object.keys(data?.volumes)
      let chapterList = {}

      volumeKeys.forEach(key => {
        chapterList = {
          ...chapterList,
          ...data?.volumes[key].chapters
        }
      })

      setAggregation({
        mangaId: mangaData?.id,
        chapters: chapterList
      })
    })
  }

  const openReader = async (chapterData: any) => {
    navigation.navigate('Reader', {
      data: {
        managaId: mangaData.id,
        chapterId: chapterData.id,
        chapterNumber: chapterData?.attributes?.chapter,
      }
    })
  }

  const renderChapter = ({ item }) => {
    const label = `${internalization.t('chapterListLabel')} ${item?.attributes?.chapter} ${item?.attributes?.title ? `: ${item?.attributes?.title}` : ''}`
    const isRead = chaptersRead && chaptersRead.find(data => data === item?.attributes?.chapter)
    return (
      <>
        <ChapterButton onPress={() => openReader(item)}>
          <ChapterText numberOfLines={1} isRead={isRead}>{label}</ChapterText>
        </ChapterButton>
        <ChapterDivider />
      </>
    )
  }

  const handleFilter = ({
    initialChapter,
    language,
    order
  }) => {
    queryClient.removeQueries([currentQueryKey])
    paginationRef.current = {
      initialOffset: initialChapter - 1,
      language,
      order
    }
    fetchNextPage()
  }

  useFocusEffect(useCallback(() => {
    loadFavorites()
    loadReadChapters()
    loadMangaAggregation()
    storeLastVisited(mangaData)
  }, []))

  return (
    <Container>
      {isInitialLoading || isLoadingAds ? <Load /> : null}
      <HeaderWrapper>
        <Label
          variant="Headline"
          children={mangaData?.attributes?.title?.en ?? 'Title'}
          style={{
            maxWidth: '70%'
          }}
        />
        <HeaderWrapper>
          <FiltersModal handleFilter={handleFilter} />
          <RoundedButton
            name='star'
            onPress={changeFavoriteState}
            color={chapterIsFavorite ? theme.tint : 'lightgray'}
          />
        </HeaderWrapper>
      </HeaderWrapper>
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
      {
        chapters.length === 0
          ? <Label style={{ width: '100%', textAlign: 'center' }}>{internalization.t('searchNoDataFound')}</Label>
          : <ChapterList
            data={chapters}
            renderItem={renderChapter}
            keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
            onEndReached={() => hasNextPage && fetchNextPage()}
            getItemCount={() => chapters.length}
            getItem={(data, index) => data[index]}
            maxToRenderPerBatch={DEFAULT_PAGINATION.limit}
            onEndReachedThreshold={0.5}
            progressViewOffset={50}
            refreshing={(isFetchingNextPage || isFetching) && hasNextPage}
            ListFooterComponent={((isFetchingNextPage || isFetching) && hasNextPage) && <ActivityIndicator size="large" color={theme.tint} />}
          />
      }


    </Container>
  )
})

export default ChapterScreen