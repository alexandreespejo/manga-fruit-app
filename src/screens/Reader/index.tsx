import { useEffect, useState } from "react"
import { Alert } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { getChapters, getPages } from "../../services/mangadex"
import { ActionButton, ActionContainer, ActionLabel, CloseButton, HeaderContainer, ReaderContainer } from "./style"
import { FontAwesome } from "@expo/vector-icons"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import Load from "../../components/Load"
import { storeChapterRead } from "../../services/storage"

type ChapterDataType = any | undefined

export default function ReaderScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const chapterData: ChapterDataType = route?.params?.chapterData
  const mangaData: any = route?.params?.mangaData
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState([])
  const [chapterSequence, setChapterSequence] = useState({
    prev: null,
    next: null
  })

  useEffect(() => {
    if (!chapterData) return
    storeChapterRead(mangaData.id, chapterData?.attributes?.chapter)
    loadChapterSequence()
    loadPages()
  }, [chapterData])

  const loadChapterSequence = async () => {
    const currentChapter = chapterData?.attributes?.chapter
    if (!currentChapter) return
    const isFirst = currentChapter === '1'
    const offset = isFirst ? 0 : currentChapter - 2
    const { data } = await getChapters(mangaData?.id, 3, offset)

    if (data?.data)
      setChapterSequence({
        prev: data?.data[(isFirst ? null : 0)],
        next: data?.data[(isFirst ? 1 : 2)],
      })
  }

  const loadPages = () => {
    setIsLoading(true)
    const id = chapterData.id
    getPages(id).then(data => {

      const pageList = data?.chapter?.data.map(item => {
        return { url: `${data?.baseUrl}/data/${data?.chapter?.hash}/${item}` }
      })

      setPages(pageList)

    }).catch((err) => {
      Alert.alert(
        'Falha',
        'Infelizmente não foi possivel carregar esse capitulo, tente mais tarde',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleChapterSequence = (direction: 'prev' | 'next') => {
    const selectedChapter = chapterSequence[direction]
    if (selectedChapter)
      navigation.navigate('Reader', { chapterData: selectedChapter, mangaData })
  }

  const closePage = () => {
    navigation.goBack()
  }

  const header = () => {
    return (
      <HeaderContainer>
        <ActionContainer>
          {
            chapterSequence.prev &&
            (<ActionButton onPress={() => handleChapterSequence('prev')}>
              <ActionLabel children='Anterior' />
            </ActionButton>)
          }
          {chapterSequence.next &&
            (<ActionButton onPress={() => handleChapterSequence('next')}>
              <ActionLabel children='Próximo' />
            </ActionButton>)
          }
        </ActionContainer>
        <CloseButton onPress={() => closePage()} >
          <FontAwesome name="close" size={30} color="white" />
        </CloseButton>
      </HeaderContainer>
    )
  }

  return (
    <ReaderContainer visible={true}>
      {
        isLoading
          ? <Load />
          : (
            pages?.length > 0 &&
            <ImageViewer
              renderHeader={header}
              imageUrls={pages}
              loadingRender={() => <Load />}
              onCancel={closePage}
            />
          )
      }
    </ReaderContainer>
  )
}