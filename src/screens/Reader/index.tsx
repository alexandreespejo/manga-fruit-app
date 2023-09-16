import { useEffect, useState } from "react"
import { Alert, Modal, TouchableOpacity } from "react-native"
import { getChapters, getPages } from "../../services/mangadex"
import { ActionButton, ActionLabel, FooterContainer, ReaderContainer } from "./style"
import { FontAwesome } from "@expo/vector-icons"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import Load from "../../components/Load"
import { getReadChapterAmount, incrementReadChapterAmount, storeChapterRead } from "../../services/storage"
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
  // const { isLoaded, isClosed, load, show } = useInterstitialAd(intersticialId, {
  //   requestNonPersonalizedAdsOnly: true,
  // })
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

    console.log(sequenceState)
    setChapterSequence(sequenceState)
  }

  const loadPages = () => {
    setIsLoading(true)
    const id = readerData?.chapterId
    getPages(id).then(data => {
      const list: any[] = data?.chapter?.data
      const pageList = []

      list.forEach((item, indx) => {
        if (indx === Math.round(list.length / 2))
          pageList.push({
            type: 'ads',
            uri: ''
          })

        pageList.push({
          type: 'image',
          uri: `${data?.baseUrl}/data/${data?.chapter?.hash}/${item}`
        })
      })

      setPages(pageList)

    }).catch(() => {
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
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleChapterSequence = async (direction: 'prev' | 'next') => {
    const selectedChapter = chapterSequence[direction]
    if (selectedChapter) {
      const readAmount = await getReadChapterAmount()
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

    incrementReadChapterAmount()
    storeChapterRead(readerData?.managaId, readerData?.chapterNumber)
    loadChapterSequence()
    loadPages()
    // load()
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