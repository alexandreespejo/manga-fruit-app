import { createRef, memo, useRef, useState } from "react"
import { Dimensions, FlatList, Image, Platform, View } from "react-native"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import { AdsContainer } from "./style"
import { useAppStore } from "../../store"
import Load from "../../components/Load"
import { AdsBanner } from "../../components/AdsManager"
import { ImageZoom } from "@likashefqet/react-native-image-zoom"
import { GestureHandlerRootView } from "react-native-gesture-handler"

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

const ImageLoader = memo(({ uri }: { uri: string }) => {
  const [isImageLoading, setIsImageLoading] = useState(false)
  return (
    <View style={{ width: '100%', height: '100%' }}>

    </View>
  )
})

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
  const zoomableViewRef = createRef<ReactNativeZoomableView>()

  if (item.type === "ads")
    return <AdsRender />

  return <GestureHandlerRootView style={{ flex: 1 }}>
    <ImageZoom
      uri={item.uri}
      minScale={0.5}
      maxScale={3}
      style={{ width: width, height: height, resizeMode: 'contain' }}
      onInteractionStart={() => listRef?.current.setNativeProps({ scrollEnabled: false })}
      onInteractionEnd={() => listRef?.current.setNativeProps({ scrollEnabled: true })}
      resizeMode="contain"
    />
  </GestureHandlerRootView>

  return (
    <ReactNativeZoomableView
      ref={zoomableViewRef}
      contentWidth={width}
      contentHeight={height}
      maxZoom={3}
      minZoom={1}
      zoomStep={0}
      initialZoom={1}
      // onZoomBefore={(a, b, zoom) => {
      //   if (!listRef?.current) return

      //   if (zoom.zoomLevel > 1.3)
      //     return listRef?.current.setNativeProps({ scrollEnabled: false })

      //   if (zoom.zoomLevel <= 1.3)
      //     return listRef?.current.setNativeProps({ scrollEnabled: true })
      // }}
      disablePanOnInitialZoom
    >
      <Image
        style={{ width: width, height: height, resizeMode: 'contain' }}
        source={{ uri: item.uri, cache: 'force-cache' }}
        progressiveRenderingEnabled={Platform.OS === 'android'}
      />
    </ReactNativeZoomableView>
  )
})

export const RenderImageList = memo(({
  imageList
}: RenderImageListType) => {
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
      scrollEnabled
      pagingEnabled
    />
  )
})