import React, { memo, useCallback, useContext, useEffect, useState } from "react"
import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import { StyleSheet } from "react-native"
import { Container, Image, InfoWrapper, MangaCardContainer, MangaListContainer, Tag, TagsContainer, Title, TitleContainer } from "./style"
import { getCover } from "../../services/mangadex"
import { ApplicationContext } from "../../contexts/Application"
import { getFavoriteMangaList } from "../../services/storage"

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

export default function FavoritesScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [mangaList, setMangaList] = useState([])
  const { startLoad, endLoad } = useContext(ApplicationContext)

  const handleSelectManga = async (mangaData: any) => {
    navigation.navigate('Chapter', { mangaData })
  }

  const renderManga = ({ item }) => <MangaCard key={item.id} data={item} onSelectManga={handleSelectManga} />

  useFocusEffect(useCallback(() => {
    startLoad()
    getFavoriteMangaList().then(list => {
      setMangaList(list)
    }).finally(() => endLoad())
  }, []))

  return (
    <Container>
      <MangaListContainer
        contentContainerStyle={{ alignItems: 'center' }}
        data={mangaList}
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        renderItem={renderManga}
      />
    </Container>
  )
}