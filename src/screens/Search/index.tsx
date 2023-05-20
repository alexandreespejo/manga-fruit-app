import React, { useContext, useRef, useState } from "react"
import { NavigationProp } from '@react-navigation/native'
import { Alert } from "react-native"
import { Container, Input, MangaListContainer, SearchButton, SearchContainer } from "./style"
import { getSearch } from "../../services/mangadex"
import { ApplicationContext } from "../../contexts/Application"
import Colors from "../../constants/Colors"
import { FontAwesome } from "@expo/vector-icons"
import { MangaCard } from "../../components/MangaCard"

function SearchBar({ search, setSearch, onSearch }) {
  return (
    <SearchContainer>
      <Input
        onChangeText={setSearch}
        value={search}
        placeholder="Pesquise um titulo"
        placeholderTextColor={Colors.light.text}
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
  const { startLoad, endLoad } = useContext(ApplicationContext)

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

    startLoad()
    getSearch(search, limit, offset).then((data) => {
      if (data.total !== total) pagination.current.total = data.total
      pagination.current.page = page + 1

      setSearchData(oldList => [...oldList, ...data.data])
    }).catch(err => {
      console.log(err)
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
    }).finally(() => endLoad())
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  return (
    <Container>
      <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
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