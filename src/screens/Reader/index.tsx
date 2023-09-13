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

const intersticialId = 'ca-app-pub-4863844449125415/5598910378'

type ReaderDataType = {
  managaId: string
  chapterId: string
  chapterNumber: string
}

export default function ReaderScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const theme = useTheme()
  // const { isLoaded, isClosed, load, show } = useInterstitialAd(intersticialId, {
  //   requestNonPersonalizedAdsOnly: true,
  // })
  const data: ReaderDataType = route?.params?.data
  const [focusMode, setFocusMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState([])
  const [chapterSequence, setChapterSequence] = useState({
    prev: null,
    next: null
  })

  // const loadChapterSequence = async () => {
  //   const currentChapter = data.chapterNumber
  //   if (!currentChapter) return
  //   const isFirst = currentChapter === '1'
  //   const offset = isFirst ? 0 : currentChapter - 2
  //   try {
  //     const { data } = await getChapters(data, 3, offset)

  //     if (data?.data)
  //       setChapterSequence({
  //         prev: data?.data[(isFirst ? null : 0)],
  //         next: data?.data[(isFirst ? 1 : 2)],
  //       })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const loadPages = () => {
    setIsLoading(true)
    const id = data.chapterId
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

      console.log('next chap')
      // navigation.navigate('Reader', { chapterData: selectedChapter, mangaData })
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
        {/* <TouchableOpacity onPress={() => changeOrientation()} >
          <ScreenRotationIcon />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => closePage()} >
          <FontAwesome name="close" size={30} color={theme.text} />
        </TouchableOpacity>
      </FooterContainer>
    )
  }

  useEffect(() => {
    if (!data.chapterId) return

    incrementReadChapterAmount()
    storeChapterRead(data.managaId, data.chapterNumber)
    // loadChapterSequence()
    loadPages()
    // load()
  }, [])

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