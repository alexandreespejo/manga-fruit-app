import { useEffect, useState } from "react"
import { Alert } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { getChapters, getPages } from "../../services/mangadex"
import { ActionButton, ActionContainer, ActionLabel, CloseButton, HeaderContainer, ReaderContainer } from "./style"
import { FontAwesome } from "@expo/vector-icons"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import Load from "../../components/Load"
import { storeChapterRead } from "../../services/storage"
import { useInterstitialAd } from "react-native-google-mobile-ads"
import AsyncStorage from "@react-native-async-storage/async-storage"
import internalization from "../../services/internalization"
import { Label } from "../../components/Label"

const intersticialId = 'ca-app-pub-4863844449125415/4909628748'

type ChapterDataType = any | undefined

const getReadChapterAmount = async () => {
  const readAmount = await AsyncStorage.getItem('@manga_fruit_read_amount_chapter') ?? '0'
  return readAmount
}

const incrementReadChapterAmount = async () => {
  const readAmount = await getReadChapterAmount()
  await AsyncStorage.setItem('@manga_fruit_read_amount_chapter', String(Number(readAmount) + 1))
  return readAmount
}

const resetReadChapterAmount = async () => {
  await AsyncStorage.setItem('@manga_fruit_read_amount_chapter', '0')
}

interface HeaderProps {
  chapterSequence: { prev?: any, next?: any }
  mangaData: any
  navigation: NavigationProp<any>
}

const Header = ({ chapterSequence, mangaData, navigation }: HeaderProps) => {
  const [c, setC] = useState('')
  const { isLoaded, isClosed, load, show } = useInterstitialAd(intersticialId, {
    requestNonPersonalizedAdsOnly: true,
  })

  const loadAds = async () => {
    const readAmount = await incrementReadChapterAmount()
    setC(readAmount)
    if (Number(readAmount) > 4)
      load()
  }

  const closePage = () => {
    navigation.goBack()
  }

  const handleChapterSequence = async (direction: 'prev' | 'next') => {
    const selectedChapter = chapterSequence[direction]
    if (selectedChapter)
      navigation.navigate('Reader', { chapterData: selectedChapter, mangaData })
  }

  useEffect(() => {
    if (isLoaded) {
      show()
      resetReadChapterAmount()
    }
  }, [isLoaded])

  useEffect(() => {
    loadAds()
  }, [])

  return (
    <HeaderContainer>
      <ActionContainer>
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
        <Label children={c} />
      </ActionContainer>
      <CloseButton onPress={() => closePage()} >
        <FontAwesome name="close" size={30} color="white" />
      </CloseButton>
    </HeaderContainer>
  )
}

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

  return (
    <ReaderContainer visible={true}>
      {
        isLoading
          ? <Load />
          : (
            pages?.length > 0 &&
            <ImageViewer
              renderHeader={() => <Header chapterSequence={chapterSequence} mangaData={mangaData} navigation={navigation} />}
              imageUrls={pages}
              loadingRender={() => <Load />}
            />
          )
      }
    </ReaderContainer>
  )
}