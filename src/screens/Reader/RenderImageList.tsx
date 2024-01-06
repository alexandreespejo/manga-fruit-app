import { createRef, memo, useRef, useState } from "react"
import { Dimensions, FlatList, Image, Platform, View } from "react-native"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import { AdsContainer } from "./style"
import { Label } from "../../components/Label"
import { useAppStore } from "../../store"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import Load from "../../components/Load"
import { AdsBanner } from "../../components/AdsManager"

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
  const [isImageLoading, setIsImageLoading] = useState(true)
  if (!uri) return null
  Image.prefetch(uri)
  return (
    <View>
      <Image
        style={{ width: width, height: height, resizeMode: 'contain' }}
        source={{ uri: uri }}
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
        progressiveRenderingEnabled={Platform.OS === 'android'}
      />
      {isImageLoading && <Load />}
    </View>
  )
})

const RenderZoomableImage = memo(({
  listRef,
  item
}: RenderZoomableImageType) => {
  const zoomableViewRef = createRef<ReactNativeZoomableView>()

  if (item.type === "ads") {
    return (
      <AdsContainer>
        <Label variant="Headline" style={{ paddingHorizontal: 24 }}>Momento Paga Boleto</Label>
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
    )
  }

  return (
    <ReactNativeZoomableView
      ref={zoomableViewRef}
      contentWidth={width}
      contentHeight={height}
      maxZoom={3}
      minZoom={1}
      zoomStep={0}
      onZoomBefore={(a, b, zoom) => {
        if (!listRef?.current) return

        if (zoom.zoomLevel > 1.1)
          return listRef?.current.setNativeProps({ scrollEnabled: false })

        if (zoom.zoomLevel <= 1.1)
          return listRef?.current.setNativeProps({ scrollEnabled: true })
      }}
      visualTouchFeedbackEnabled={false}
      disablePanOnInitialZoom
    >
      <ImageLoader {...item} />
    </ReactNativeZoomableView>
  )
})

export const RenderImageList = memo(({
  imageList
}: RenderImageListType) => {
  const isVerticalOrientation = useAppStore(state => state.verticalOrientation)
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
      horizontal={!isVerticalOrientation}
      scrollEnabled
      pagingEnabled
    />
  )
})