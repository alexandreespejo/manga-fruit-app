import { useEffect, useState } from "react"
import { Alert, Image, Modal, TouchableOpacity } from "react-native"
import { getPages } from "../../services/mangadex"
import { ActionButton, ActionLabel, FooterContainer, ReaderContainer } from "./style"
import { FontAwesome } from "@expo/vector-icons"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import Load from "../../components/Load"
import { storeChapterRead } from "../../hooks/useAppStorage"
import { CacheManager } from "react-native-expo-image-cache"
// import { useInterstitialAd } from "react-native-google-mobile-ads"
import internalization from "../../services/internalization"
import { useTheme } from "styled-components"
import { RenderImageList } from "./RenderImageList"
import { useCurrentManga } from "../Chapter/store"

const intersticialId = 'ca-app-pub-4863844449125415/5598910378'

type ReaderDataType = {
  managaId: string
  chapterId: string
  chapterNumber: string
}

const defaultChapterSequenceState = {
  prev: null,
  next: null
}

export default function ReaderScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const theme = useTheme()
  const aggregation = useCurrentManga(state => state.aggregation)
  const [readerData, setReaderData] = useState<ReaderDataType>(route?.params?.data)
  const [focusMode, setFocusMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState([])
  const [chapterSequence, setChapterSequence] = useState(defaultChapterSequenceState)

  const loadChapterSequence = async () => {
    const currentChapterNumber = Number(readerData?.chapterNumber)
    const prevChapterNumber = currentChapterNumber - 1
    const nextChapterNumber = currentChapterNumber + 1
    const sequenceState = { ...defaultChapterSequenceState }

    if (prevChapterNumber > 0) {
      const prevChapter = aggregation.chapters[prevChapterNumber]
      if (prevChapter)
        sequenceState.prev = {
          managaId: readerData?.managaId,
          chapterId: prevChapter?.id,
          chapterNumber: prevChapter?.chapter
        }
    }

    const nextChapter = aggregation.chapters[nextChapterNumber]
    if (nextChapter)
      sequenceState.next = {
        managaId: readerData?.managaId,
        chapterId: nextChapter?.id,
        chapterNumber: nextChapter?.chapter
      }

    setChapterSequence(sequenceState)
  }

  const loadPages = async () => {
    try {
      setIsLoading(true)
      const id = readerData?.chapterId
      const data = await getPages(id)
      const list: any[] = data?.chapter?.data
      const pageList: { type: string, uri: string }[] = []

      for (const item of list) {
        const page = {
          type: 'image',
          uri: `${data?.baseUrl}/data/${data?.chapter?.hash}/${item}`
        }

        if (pageList.length >= 5) Image.prefetch(page.uri)
        else {
          const path = await CacheManager.get(page.uri, { md5: false }).getPath()
          page.uri = path
        }
        pageList.push(page)
      }

      pageList.push({
        type: 'ads',
        uri: ''
      })

      setPages(pageList)
    } catch (e) {
      Alert.alert(
        internalization.t('searchRequestErrorTitle'),
        internalization.t('searchRequestErrorMessage'),
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleChapterSequence = async (direction: 'prev' | 'next') => {
    const selectedChapter = chapterSequence[direction]
    if (selectedChapter) {
      // const readAmount = await getReadChapterAmount()
      // if (isLoaded && Number(readAmount) > 4) {
      //   await resetReadChapterAmount()
      //   show()
      // }

      setReaderData(selectedChapter)
    }
  }

  const closePage = () => {
    navigation.goBack()
  }

  const Footer = () => {
    if (focusMode) return null

    return (
      <FooterContainer>
        {
          chapterSequence.prev &&
          (<ActionButton onPress={() => handleChapterSequence('prev')}>
            <ActionLabel children={internalization.t('readerPreviousPageLabel')} />
          </ActionButton>)
        }
        {chapterSequence.next &&
          (<ActionButton onPress={() => handleChapterSequence('next')}>
            <ActionLabel children={internalization.t('readerNextPageLabel')} />
          </ActionButton>)
        }
        <TouchableOpacity onPress={() => closePage()} >
          <FontAwesome name="close" size={30} color={theme.text} />
        </TouchableOpacity>
      </FooterContainer>
    )
  }

  useEffect(() => {
    if (!readerData?.chapterId) return
    storeChapterRead(readerData?.managaId, readerData?.chapterNumber)
    loadChapterSequence()
    loadPages()
  }, [readerData])

  return (
    <Modal>
      <ReaderContainer>
        {
          isLoading
            ? <Load />
            : (
              <RenderImageList
                imageList={pages}
              />
            )
        }
        <Footer />
      </ReaderContainer>
    </Modal>
  )
}