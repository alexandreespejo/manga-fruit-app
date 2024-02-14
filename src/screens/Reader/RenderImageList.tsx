import { memo, useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, View } from "react-native"
import { AdsContainer } from "./style"
import Load from "../../components/Load"
import { AdsBanner } from "../../components/AdsManager"
import { ImageZoom } from "@likashefqet/react-native-image-zoom"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { CacheManager } from "react-native-expo-image-cache"
import { useAppStore } from "../../store"

const readerId1 = 'ca-app-pub-4863844449125415/1684777520'
const readerId2 = 'ca-app-pub-4863844449125415/2147526547'
const readerId3 = 'ca-app-pub-4863844449125415/2114734934'

type RenderZoomableImageType = {
  listRef: React.MutableRefObject<FlatList<any>>
  item: { type: 'image' | 'ads', uri: string }
}

const { width, height } = Dimensions.get('window')

type RenderImageListType = {
  imageList: any[]
}

const AdsRender = memo(() => (
  <AdsContainer>
    <View style={{ marginTop: 32 }}>
      <AdsBanner adUnitId={readerId1} />
    </View>
    <View style={{ marginTop: 32 }}>
      <AdsBanner adUnitId={readerId2} />
    </View>
    <View style={{ marginTop: 32 }}>
      <AdsBanner adUnitId={readerId3} />
    </View>
  </AdsContainer>
), () => true)

const RenderZoomableImage = memo(({
  listRef,
  item
}: RenderZoomableImageType) => {
  const [isImageLoading, setIsImageLoading] = useState(false)

  const asyncLoadUri = async (uri: string) => {
    uri = await CacheManager.get(uri, { md5: false }).getPath()
  }

  useEffect(() => {
    if (item.uri.startsWith('https://'))
      asyncLoadUri(item.uri)
  }, [])

  if (item.type === "ads")
    return <AdsRender />

  return (<GestureHandlerRootView style={{ flex: 1 }}>
    <ImageZoom
      uri={item.uri}
      minScale={0.5}
      maxScale={3}
      style={{ width: width, height: height, resizeMode: 'contain' }}
      onInteractionStart={() => listRef?.current.setNativeProps({ scrollEnabled: false })}
      onInteractionEnd={() => listRef?.current.setNativeProps({ scrollEnabled: true })}
      onLoadStart={() => setIsImageLoading(true)}
      onLoadEnd={() => setIsImageLoading(false)}
      resizeMode="contain"
    />
    {isImageLoading && <Load />}
  </GestureHandlerRootView>)
})

export const RenderImageList = memo(({
  imageList
}: RenderImageListType) => {
  const verticalOrientation = useAppStore((state) => state.verticalOrientation)
  const listRef = useRef<FlatList<any>>()

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => `key-${JSON.stringify(item)}}`}
      data={imageList}
      style={{ width: width, height: height }}
      renderItem={props => (
        <RenderZoomableImage
          listRef={listRef}
          {...props}
        />
      )}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={!verticalOrientation}
      onViewableItemsChanged={(info) => console.log(info)}
      scrollEnabled
      pagingEnabled
    />
  )
})