import React, { useRef, useState } from "react"
import { NavigationProp } from '@react-navigation/native'
import { Alert, ActivityIndicator, Modal, TouchableOpacity, FlatList, View } from "react-native"
import { CategoriesButton, CategoriesContainer, CategoriesItemContainer, Container, Header, MangaListContainer } from "./style"
import { getSearch } from "../../services/mangadex"
import { FontAwesome } from "@expo/vector-icons"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"
import internalization from "../../services/internalization"
import { Label } from "../../components/Label"
import { useTheme } from "styled-components"
import { useTags } from "../../hooks/useTags"
import { SafeAreaView } from "react-native-safe-area-context"
import { SearchInput } from "../../components/SearchInput"
import { AdsBanner } from "../../components/AdsManager"
import { useAuth } from "../../hooks/useAuth"

const adUnitId = 'ca-app-pub-4863844449125415/3423097775'

function Categories({ categories, setCategories }: { categories: string[], setCategories: React.Dispatch<React.SetStateAction<string[]>> }) {
  const theme = useTheme()
  const { tags } = useTags()
  const data = tags.filter(tag => tag?.attributes?.group === 'genre')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleChangeVisibility = () => setIsModalVisible(!isModalVisible)
  const selected = data.find(tag => tag?.id === categories[0])

  return (
    <View style={{ marginTop: 8, flexDirection: "row", alignItems: 'center' }}>
      <CategoriesButton onPress={handleChangeVisibility}>
        <Label style={{ marginLeft: 8 }}>
          {
            selected ?
              (selected?.attributes?.name?.en ?? '')
              : "Categories"
          }
        </Label>
        <FontAwesome name="chevron-down" color={theme.text} />
      </CategoriesButton>
      {selected && <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => setCategories([])}><FontAwesome name="close" size={25} color={theme.tint} /></TouchableOpacity>}
      <Modal visible={isModalVisible}>
        <SafeAreaView style={{ backgroundColor: theme.background }}>
          <CategoriesContainer>
            <TouchableOpacity style={{ marginLeft: 8 }} onPress={handleChangeVisibility}><FontAwesome name="close" size={30} color={theme.text} /></TouchableOpacity>
            <FlatList
              style={{ width: '100%', marginTop: 8 }}
              keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
              data={data ?? []}
              renderItem={({ item }) => (
                <CategoriesItemContainer onPress={() => {
                  if (item?.id)
                    setCategories([item?.id])

                  handleChangeVisibility()
                }}>
                  <Label>{item?.attributes?.name?.en ?? ''}</Label>
                </CategoriesItemContainer>
              )}
            />
          </CategoriesContainer>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const DEFAULT_PAGINATION = {
  limit: 15,
  page: 0,
  total: 15,
}

export default function SearchScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { userIsPremium } = useAuth()
  const theme = useTheme()
  const [isLoadingAds, setIsLoadingAds] = useState(false)
  const pagination = useRef(DEFAULT_PAGINATION)

  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  const [categories, setCategories] = useState<string[]>([])
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

  const handleSelectManga = async (mangaData: any) => {
    navigation.navigate('Chapter', { mangaData })
  }

  const handleSearch = () => {
    setSearchData([])
    pagination.current = { ...DEFAULT_PAGINATION }
    searchRequest()
  }

  const searchRequest = () => {
    const { page, limit, total } = pagination.current
    const offset = page * limit
    if (offset && offset > total) return

    setIsFetchingNextPage(true)
    getSearch(search, limit, offset, categories).then((data) => {
      if (data.total !== total) pagination.current.total = data.total
      pagination.current.page = page + 1

      setSearchData(oldList => [...oldList, ...data.data])
    }).catch(err => {
      Alert.alert(
        internalization.t('searchRequestErrorTitle'),
        internalization.t('searchRequestErrorMessage'),
        [
          {
            text: 'OK',
            onPress: () => { },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    }).finally(() => setIsFetchingNextPage(false))
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  return (
    <Container>
      {isLoadingAds ? <Load /> : null}
      <Header>
        <SearchInput search={search} setSearch={setSearch} onSearch={handleSearch} />
        <Categories categories={categories} setCategories={setCategories} />
      </Header>
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
      {searchData.length === 0 && <Label style={{ marginTop: 32 }} children={'No results for this search !'} variant="Title" />}
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={searchData}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        getItemCount={() => searchData.length}
        getItem={(data, index) => data[index]}
        maxToRenderPerBatch={DEFAULT_PAGINATION.limit}
        renderItem={renderManga}
        onEndReached={searchRequest}
        refreshing={isFetchingNextPage}
        ListFooterComponent={isFetchingNextPage && <ActivityIndicator size="large" color={theme.tint} />}
      />
    </Container>
  )
}