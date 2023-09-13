import { createRef, memo, useRef } from "react"
import { Dimensions, FlatList, Image } from "react-native"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import { AdsContainer } from "./style"
import { Label } from "../../components/Label"
import { useAppStore } from "../../store"
// import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const readerId1 = 'ca-app-pub-4863844449125415/1684777520'
const readerId2 = 'ca-app-pub-4863844449125415/2147526547'

type RenderZoomableImageType = {
  item: { type: 'image' | 'ads', uri: string }
}

const { width, height } = Dimensions.get('window')

type RenderImageListType = {
  imageList: any[]
}

export const RenderImageList = memo(({
  imageList
}: RenderImageListType) => {
  const isVerticalOrientation = useAppStore(state => state.verticalOrientation)
  const listRef = useRef<FlatList<any>>()
  const zoomableViewRef = createRef<ReactNativeZoomableView>()

  const RenderZoomableImage = ({
    item
  }: RenderZoomableImageType) => {

    console.log('rerendered image')

    if (item.type === "ads") {
      return (
        <AdsContainer>
          <Label variant="Headline" style={{ paddingHorizontal: 24 }}>Momento Paga Boleto</Label>
          {/* <BannerAd
            unitId={readerId1}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          <BannerAd
            unitId={readerId2}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          /> */}
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
        // onDoubleTapAfter={() => {
        //   scrollEnabledRef.current = true
        //   setScrollEnabled(true)
        //   zoomableViewRef.current.zoomTo(1)
        // }}
        visualTouchFeedbackEnabled={false}
        disablePanOnInitialZoom
      >
        <Image
          style={{ width: width, height: height, resizeMode: 'contain' }}
          source={{ uri: item.uri }}
        />
      </ReactNativeZoomableView>
    )
  }

  console.log('rerender list')

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item, index) => `key-${item}-${index}`}
      data={imageList}
      style={{ width: width, height: height }}
      renderItem={props => (
        <RenderZoomableImage
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
}, () => true)