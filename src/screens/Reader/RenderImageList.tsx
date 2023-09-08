import { createRef, memo } from "react"
import { Dimensions, FlatList, Image } from "react-native"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { AdsContainer } from "./style"
import { useReaderStore } from "./store";
import { Label } from "../../components/Label";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const readerId1 = 'ca-app-pub-4863844449125415/1684777520'
const readerId2 = 'ca-app-pub-4863844449125415/2147526547'
type RenderZoomableImageType = {
  item: { type: 'image' | 'ads', uri: string }
  onSingleTap?: () => void
}

const { width, height } = Dimensions.get('window')

const RenderZoomableImage = memo(({
  item,
  onSingleTap
}: RenderZoomableImageType) => {
  // const setScrollEnabled = useReaderStore(state => state.setScrollEnabled)
  const zoomableViewRef = createRef<ReactNativeZoomableView>()
  if (item.type === "ads") {
    return (
      <AdsContainer>
        <Label variant="Headline">Momento Paga Boleto</Label>
        <BannerAd
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
        />
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
      // onZoomBefore={() => setScrollEnabled(false)}
      // onZoomAfter={() => setScrollEnabled(true)}
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
})

type RenderImageListType = {
  imageList: any[]
  onSingleTapImage?: () => void
}

export const RenderImageList = memo(({
  imageList,
  onSingleTapImage
}: RenderImageListType) => {
  const [isVertical, scrollEnabled] = useReaderStore(state => [state.verticalOrientation, state.scrollEnabled])
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
      scrollEnabled={scrollEnabled}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={!isVertical}
    />
  )
})