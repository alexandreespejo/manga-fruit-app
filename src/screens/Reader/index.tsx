import { useEffect, useState } from "react"
import { Alert, View } from "react-native"
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
import { useTheme } from "styled-components"

const intersticialId = 'ca-app-pub-4863844449125415/5598910378'

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

// const Header = ({ chapterSequence, mangaData, navigation }: HeaderProps) => {
//   // const { isLoaded, isClosed, load, show } = useInterstitialAd(intersticialId, {
//   //   requestNonPersonalizedAdsOnly: true,
//   // })

//   // const loadAds = async () => {
//   //   const readAmount = await incrementReadChapterAmount()
//   //   if (Number(readAmount) > 4)
//   //     load()
//   // }

//   const closePage = () => {
//     navigation.goBack()
//   }

//   const handleChapterSequence = async (direction: 'prev' | 'next') => {
//     const selectedChapter = chapterSequence[direction]
//     if (selectedChapter)
//       navigation.navigate('Reader', { chapterData: selectedChapter, mangaData })
//   }

//   // useEffect(() => {
//   //   if (isLoaded) {
//   //     show()
//   //     resetReadChapterAmount()
//   //   }
//   // }, [isLoaded])

//   // useEffect(() => {
//   //   loadAds()
//   // }, [])

//   return (
//     <HeaderContainer>
//       <ActionContainer>
//         {
//           chapterSequence.prev &&
//           (<ActionButton onPress={() => handleChapterSequence('prev')}>
//             <ActionLabel children={internalization.t('readerPreviousPageLabel')} />
//           </ActionButton>)
//         }
//         {chapterSequence.next &&
//           (<ActionButton onPress={() => handleChapterSequence('next')}>
//             <ActionLabel children={internalization.t('readerNextPageLabel')} />
//           </ActionButton>)
//         }
//       </ActionContainer>
//       <CloseButton onPress={() => closePage()} >
//         <FontAwesome name="close" size={30} color="white" />
//       </CloseButton>
//     </HeaderContainer>
//   )
// }

export default function ReaderScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const theme = useTheme()

  const { isLoaded, isClosed, load, show } = useInterstitialAd(intersticialId, {
    requestNonPersonalizedAdsOnly: true,
  })
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

    incrementReadChapterAmount()
    storeChapterRead(mangaData.id, chapterData?.attributes?.chapter)
    loadChapterSequence()
    loadPages()
    load()
  }, [chapterData])

  const loadChapterSequence = async () => {
    const currentChapter = chapterData?.attributes?.chapter
    if (!currentChapter) return
    const isFirst = currentChapter === '1'
    const offset = isFirst ? 0 : currentChapter - 2
    try {
      const { data } = await getChapters(mangaData?.id, 3, offset)

      if (data?.data)
        setChapterSequence({
          prev: data?.data[(isFirst ? null : 0)],
          next: data?.data[(isFirst ? 1 : 2)],
        })
    } catch (e) {
      console.log(e)
    }
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

  const handleChapterSequence = async (direction: 'prev' | 'next') => {
    const selectedChapter = chapterSequence[direction]
    if (selectedChapter) {
      const readAmount = await getReadChapterAmount()
      if (isLoaded && Number(readAmount) > 4) {
        await resetReadChapterAmount()
        show()
      }

      navigation.navigate('Reader', { chapterData: selectedChapter, mangaData })
    }
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
              <ActionLabel children={internalization.t('readerPreviousPageLabel')} />
            </ActionButton>)
          }
          {chapterSequence.next &&
            (<ActionButton onPress={() => handleChapterSequence('next')}>
              <ActionLabel children={internalization.t('readerNextPageLabel')} />
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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ReaderContainer visible={true} transparent>
        {
          isLoading
            ? <Load />
            : (
              pages?.length > 0 &&
              <ImageViewer
                renderHeader={header}
                imageUrls={pages}
                loadingRender={() => <Load />}
              />
            )
        }
      </ReaderContainer>
    </View>
  )
}