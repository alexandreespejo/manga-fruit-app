import { FC, createRef, useEffect, useState } from "react"
import { Alert, Dimensions, FlatList, Image, Modal, Text, TouchableOpacity } from "react-native"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { getChapters, getPages } from "../../services/mangadex"
import { ActionButton, ActionLabel, AdsContainer, FooterContainer, ReaderContainer } from "./style"
import { FontAwesome } from "@expo/vector-icons"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import Load from "../../components/Load"
import { storeChapterRead } from "../../services/storage"
// import { useInterstitialAd } from "react-native-google-mobile-ads"
import AsyncStorage from "@react-native-async-storage/async-storage"
import internalization from "../../services/internalization"
import { useTheme } from "styled-components"
import { ScreenRotationIcon } from "../../components/Icons/screenRotation";

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

type RenderZoomableImageType = {
  item: { type: 'image' | 'ads', uri: string }
  onSingleTap?: () => void
}

const RenderZoomableImage = ({
  item,
  onSingleTap
}: RenderZoomableImageType) => {
  const { width, height } = Dimensions.get('window')
  const zoomableViewRef = createRef<ReactNativeZoomableView>()

  if (item.type === "ads") {
    return (
      <AdsContainer>
        <Text>Ads Here</Text>
      </AdsContainer>
    )
  }

  return (
    <ReactNativeZoomableView
      ref={zoomableViewRef}
      contentWidth={width}
      contentHeight={height}
      onSingleTap={onSingleTap}
      maxZoom={5}
      minZoom={1}
      zoomStep={0}
      // onZoomBefore={() => console.log('started zoom')}
      // onZoomAfter={() => console.log('ended zoom')}
      // onZoomBefore={() => {
      //   if (listState.scrollable)
      //     setListState({ scrollable: false })
      // }}
      // onZoomEnd={() => {
      //   setListState({ scrollable: true })
      // }}
      // onDoubleTapAfter={() => {
      //   // zoomableViewRef.current.moveTo(width / 2, height / 2)
      //   zoomableViewRef.current.zoomTo(1)
      // }}
      disablePanOnInitialZoom
    >
      <Image
        style={{ width: width, height: height, resizeMode: 'contain' }}
        source={{ uri: item.uri }}
      />
    </ReactNativeZoomableView>
  )
}

type RenderImageListType = {
  imageList: any[]
  onSingleTapImage?: () => void
}

const RenderImageList = ({
  imageList,
  onSingleTapImage
}: RenderImageListType) => {
  const { width, height } = Dimensions.get('window')
  return (
    <FlatList
      keyExtractor={(item, index) => `key-${item}-${index}`}
      data={imageList}
      style={{ width: width, height: height }}
      renderItem={props => (
        <RenderZoomableImage
          onSingleTap={onSingleTapImage}
          {...props}
        />
      )}
      pagingEnabled={true}
      // scrollEnabled={listState.scrollable}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal
    />
  )
}

export default function ReaderScreen({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) {
  const theme = useTheme()
  // const { isLoaded, isClosed, load, show } = useInterstitialAd(intersticialId, {
  //   requestNonPersonalizedAdsOnly: true,
  // })
  const chapterData: ChapterDataType = route?.params?.chapterData
  const mangaData: any = route?.params?.mangaData
  const [focusMode, setFocusMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pages, setPages] = useState([])
  const [chapterSequence, setChapterSequence] = useState({
    prev: null,
    next: null
  })

  const switchFocusMode = () => {
    setFocusMode(!focusMode)
  }

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
      const list: any[] = data?.chapter?.data
      const pageList = []

      list.forEach((item, indx) => {
        if (indx === list.length / 2)
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

      navigation.navigate('Reader', { chapterData: selectedChapter, mangaData })
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
          <ScreenRotationIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => closePage()} >
          <FontAwesome name="close" size={30} color={theme.text} />
        </TouchableOpacity>
      </FooterContainer>
    )
  }

  useEffect(() => {
    if (!chapterData) return

    incrementReadChapterAmount()
    storeChapterRead(mangaData.id, chapterData?.attributes?.chapter)
    loadChapterSequence()
    loadPages()
    // load()
  }, [chapterData])

  return (
    <Modal>
      <ReaderContainer>
        {
          isLoading
            ? <Load />
            : (
              <RenderImageList
                onSingleTapImage={switchFocusMode}
                imageList={pages}
              />
            )
        }
        <Footer />
      </ReaderContainer>
    </Modal>
  )
}