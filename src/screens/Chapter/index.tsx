import { memo, useCallback, useMemo, useRef, useState } from "react"
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { ActivityIndicator } from "react-native"
import { getChapters, LanguageTypes } from "../../services/mangadex"
import { Container, Label, ChapterButton, ChapterList, HeaderWrapper, ChapterText, FiltersModalContainer, FilterForm, FilterFormWrapper, ChapterInput } from "./style"
import { NavigationProp, RouteProp, useFocusEffect } from "@react-navigation/native"
import { getChapterRead, getFavoriteMangaList, storeFavoriteMangaList } from "../../services/storage"
import Colors from "../../constants/Colors"
import Load from "../../components/Load"
import { CustomButton } from "../../components/Button"
import { RoundedButton } from "../../components/RoundedButton"

import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"
import { Dropdown } from "../../components/Dropdown"
import internalization from "../../services/internalization"

const adUnitId = 'ca-app-pub-4863844449125415/7605085638'

const DEFAULT_PAGINATION = {
  limit: 40,
  total: 40,
}

interface HandleFilterProps {
  initialChapter?: number
  language?: string
}

const LanguageOptions = ['pt-br', 'en']
const defaultLanguage = internalization.t('languageFilter')

const FiltersModal = memo(({
  handleFilter
}: {
  handleFilter: (props: HandleFilterProps) => void
}) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const [initialChapter, setInitialChapter] = useState('')
  const [selectedChapterLang, setSelectedChapterLang] = useState(defaultLanguage)

  if (!isFilterModalVisible) return (
    <RoundedButton
      name='filter'
      onPress={() => setIsFilterModalVisible(true)}
      color={Colors.light.text}
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
            label="Linguagem"
            options={LanguageOptions}
            onSelect={lang => setSelectedChapterLang(lang)}
            defaultSelected={selectedChapterLang}
          />
          <ChapterInput
            placeholder="Capitulo Inicial"
            placeholderTextColor={Colors.light.text}
            value={initialChapter.toString()}
            onChangeText={value => setInitialChapter(value)}
          />
          <CustomButton
            onPress={() => {
              setIsFilterModalVisible(false)
              handleFilter({
                initialChapter: initialChapter === '0' || initialChapter === '' ? 1 : Number(initialChapter),
                language: selectedChapterLang
              })
            }}
            children='Filtrar'
          />
          <CustomButton
            onPress={() => setIsFilterModalVisible(false)}
            variant="Secondary"
            children='Cancelar'
            style={{ marginTop: 10 }}
          />
        </FilterForm>
      </FilterFormWrapper>
    </FiltersModalContainer>
  )
})

const ChapterScreen = memo(({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
  const queryClient = useQueryClient()
  const { mangaData } = route.params ?? {}
  const paginationRef = useRef({
    initialOffset: 0,
    language: defaultLanguage
  })
  const [chaptersTotal, setChaptersTotal] = useState(40)
  const [chaptersRead, setChaptersRead] = useState([])
  const [chapterIsFavorite, setChapterIsFavorite] = useState(false)
  const currentQueryKey = `chapter-${mangaData?.id}`

  const loadChapters = useCallback(async ({ pageParam = null }) => {
    const { limit } = DEFAULT_PAGINATION
    const offset = pageParam ?? paginationRef.current.initialOffset
    if (pageParam > chaptersTotal) return []
    const selectedLang = paginationRef.current.language as LanguageTypes
    const { data } = await getChapters(mangaData?.id, limit, offset, selectedLang)
    if (data.total !== chaptersTotal) setChaptersTotal(data.total)
    return data
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
    getFavoriteMangaList().then(list => {
      let favList = list
      if (chapterIsFavorite) favList = favList?.filter(favMangaData => JSON.stringify(favMangaData) !== JSON.stringify(mangaData))
      else favList.push(mangaData)

      storeFavoriteMangaList(favList).then(() => {
        setChapterIsFavorite(!chapterIsFavorite)
      })
    })
  }

  const loadReadChapters = () => {
    getChapterRead().then(mangas => {
      if (mangas[mangaData?.id]) setChaptersRead(mangas[mangaData?.id])
    })
  }

  const openReader = async (chapterData: any) => {
    navigation.navigate('Reader', { chapterData, mangaData })
  }

  const renderChapter = useCallback(({ item }) => {
    const label = `Capitulo ${item?.attributes?.chapter} ${item?.attributes?.title ? `: ${item?.attributes?.title}` : ''}`
    const isRead = chaptersRead && chaptersRead.find(data => data === item?.attributes?.chapter)

    return (
      <ChapterButton onPress={() => openReader(item)}>
        <ChapterText numberOfLines={1} style={{ color: isRead ? 'gray' : 'black' }}>{label}</ChapterText>
      </ChapterButton>
    )
  }, [chaptersRead])

  const handleFilter = ({
    initialChapter,
    language
  }) => {
    queryClient.removeQueries([currentQueryKey])
    paginationRef.current = {
      initialOffset: initialChapter - 1,
      language: language
    }
    fetchNextPage()
  }

  useFocusEffect(useCallback(() => {
    loadFavorites()
    loadReadChapters()
  }, []))

  return (
    <Container>
      {isInitialLoading && <Load />}
      <HeaderWrapper>
        <Label>
          {mangaData?.attributes?.title?.en || 'Titulo do mangá'}
        </Label>
        <HeaderWrapper>
          <FiltersModal handleFilter={handleFilter} />
          <RoundedButton
            name='star'
            onPress={changeFavoriteState}
            color={chapterIsFavorite ? Colors.light.tint : 'lightgray'}
          />
        </HeaderWrapper>
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
        renderItem={renderChapter}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        onEndReached={() => hasNextPage && fetchNextPage()}
        getItemCount={() => chapters.length}
        getItem={(data, index) => data[index]}
        maxToRenderPerBatch={DEFAULT_PAGINATION.limit}
        onEndReachedThreshold={0.5}
        progressViewOffset={50}
        refreshing={(isFetchingNextPage || isFetching) && hasNextPage}
        ListFooterComponent={((isFetchingNextPage || isFetching) && hasNextPage) && <ActivityIndicator size="large" color={Colors.light.tint} />}
      />

    </Container>
  )
})

export default ChapterScreen