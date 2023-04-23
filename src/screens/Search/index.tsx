import React, { memo, useContext, useEffect, useRef, useState } from "react"
import { NavigationProp } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { Container, Image, InfoWrapper, Input, MangaCardContainer, MangaListContainer, SearchContainer, Tag, TagsContainer, Title, TitleContainer } from "./style"
import { getCover, getSearch } from "../../services/mangadex"
import { ApplicationContext } from "../../contexts/Application"
import Colors from "../../constants/Colors"
import { FontAwesome } from "@expo/vector-icons"

interface MangaCardProps {
  data: any
  onSelectManga: (data: any) => void
}

const MangaCard = memo(({ data, onSelectManga }: MangaCardProps) => {
  const [cover, setCover] = useState(null)
  const [tags, setTags] = useState([])

  useEffect(() => {
    loadTags()
    loadCover()
  }, [data])

  const loadTags = () => {
    const tagList = data?.attributes?.tags
    setTags(tagList.map((item: any) => item?.attributes?.name?.en))
  }

  const loadCover = async () => {
    try {

      const coverArt = data?.relationships.filter((item: any) => item.type === 'cover_art')[0]
      const coverData = await getCover(coverArt?.id)
      const { fileName } = coverData?.data?.attributes

      const responseCover = `https://uploads.mangadex.org/covers/${data.id}/${fileName}`

      setCover(responseCover)

    } catch (err) {
      console.log(err)
    }
  }

  const onCardClick = () => {
    onSelectManga({ ...data, coverLink: cover })
  }

  const styles = StyleSheet.create({
    containerShadow: {
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      elevation: 1,
    }
  })

  const renderTags = () => {
    return tags.map((tag, index) => {
      return <Tag key={tag}><Title tag index={index}>{tag}</Title></Tag>
    })
  }

  return (
    <MangaCardContainer style={styles.containerShadow} onPress={onCardClick}>
      {
        cover && <Image source={{ url: cover }} />
      }
      <InfoWrapper>
        <TitleContainer>
          <Title>{data?.attributes?.title?.en}</Title>
          <Title autor>Status: {data?.attributes?.status ?? ''}</Title>
        </TitleContainer>
        <TagsContainer>
          {renderTags()}
        </TagsContainer>
      </InfoWrapper>
    </MangaCardContainer>
  )
})

function SearchBar({ search, setSearch, onSearch }) {
  return (
    <SearchContainer>
      <Input
        onChangeText={setSearch}
        value={search}
        placeholder="Pesquise um titulo"
        placeholderTextColor={Colors.light.text}
      />
      <TouchableOpacity onPress={onSearch}>
        <FontAwesome name="search" size={24} color={Colors.light.tint} />
      </TouchableOpacity>
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
    }).catch(err => console.log(err)
    ).finally(() => endLoad())
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