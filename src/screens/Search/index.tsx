import React, { useCallback, useContext, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { Container, Image, InfoWrapper, Input, MangaCardContainer, MangaListContainer, SearchContainer, Tag, TagsContainer, Title, TitleContainer } from "./style"
import { getCover, getSearch } from "../../services/index"
import { ApplicationContext } from "../../contexts/Application"
import Colors from "../../constants/Colors"

function MangaCard({ data }: { data: any }) {
  const { setSelectedManga } = useContext(ApplicationContext)
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

      console.log(responseCover)
      setCover(responseCover)

    } catch (err) {
      console.log(err)
    }
  }

  const onMangaSelect = () => {
    setSelectedManga({ ...data, coverLink: cover })
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
    <MangaCardContainer style={styles.containerShadow} onPress={() => onMangaSelect()}>
      {
        cover && <Image source={{ url: cover }} />
      }
      <InfoWrapper>
        <TitleContainer>
          <Title>{data?.attributes?.title?.en}</Title>
          <Title autor>Lançamento: {data?.attributes?.year ?? 'Indefinido'}</Title>
          <Title autor>Status: {data?.attributes?.status ?? ''}</Title>
        </TitleContainer>
        <TagsContainer>
          {renderTags()}
        </TagsContainer>
      </InfoWrapper>
    </MangaCardContainer>
  )
}

function SearchBar() {
  const [search, setSearch] = useState('')
  const { setSearchData, startLoad, endLoad } = useContext(ApplicationContext)

  const onSearch = () => {
    startLoad()
    getSearch(search).then((data) => {
      setSearchData(data.data)
    }).catch(err => console.log(err)
    ).finally(() => endLoad())
  }

  return (
    <SearchContainer>
      <Input
        onChangeText={setSearch}
        value={search}
        placeholder="Pesquise um titulo"
        selectionColor={Colors.light.text}
      />
      <TouchableOpacity onPress={() => onSearch()}>
        <Text>
          Search
        </Text>
      </TouchableOpacity>
    </SearchContainer>
  )
}

export default function SearchScreen({ navigation }: { navigation: any }) {
  const { searchData } = useContext(ApplicationContext)

  return (
    <Container>
      <SearchBar />
      <MangaListContainer contentContainerStyle={{ alignItems: 'center' }}>
        {
          searchData?.map((mangaData: any) => <MangaCard key={mangaData.id} data={mangaData} />)
        }
      </MangaListContainer>
    </Container>
  )
}