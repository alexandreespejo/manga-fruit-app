import React, { useRef, useState } from "react"
import { NavigationProp } from '@react-navigation/native'
import { Alert } from "react-native"
import { Container, Input, MangaListContainer, SearchButton, SearchContainer } from "./style"
import { getSearch } from "../../services/mangadex"
import Colors from "../../constants/Colors"
import { FontAwesome } from "@expo/vector-icons"
import { MangaCard } from "../../components/MangaCard"
import Load from "../../components/Load"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads"

const adUnitId = 'ca-app-pub-4863844449125415/3423097775'

function SearchBar({ search, setSearch, onSearch }) {

  return (
    <SearchContainer>
      <Input
        onChangeText={setSearch}
        value={search}
        placeholder="Pesquise um titulo"
        placeholderTextColor={Colors.light.text}
        onSubmitEditing={onSearch}
      />
      <SearchButton onPress={onSearch}>
        <FontAwesome name="search" size={24} color={Colors.light.background} />
      </SearchButton>
    </SearchContainer>
  )
}

const DEFAULT_PAGINATION = {
  limit: 15,
  page: 0,
  total: 15,
}

export default function SearchScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const pagination = useRef(DEFAULT_PAGINATION)

  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

    setIsLoading(true)
    getSearch(search, limit, offset).then((data) => {
      if (data.total !== total) pagination.current.total = data.total
      pagination.current.page = page + 1

      setSearchData(oldList => [...oldList, ...data.data])
    }).catch(err => {
      Alert.alert(
        'Falha',
        'Infelizmente estamos com problemas no servidor, tente novamente mais tarde!',
        [
          {
            text: 'OK',
            onPress: () => { },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    }).finally(() => setIsLoading(false))
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  return (
    <Container>
      {isLoading && <Load />}
      <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={searchData}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        renderItem={renderManga}
        onEndReached={searchRequest}
      />
    </Container>
  )
}