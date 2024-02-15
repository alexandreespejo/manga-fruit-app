import { FC, memo, useEffect } from "react"
import { BannerAd, BannerAdSize, TestIds, BannerAdProps } from "react-native-google-mobile-ads";
import { useAuth } from "../../hooks/useAuth";
import { StyleProp, View, ViewStyle } from "react-native";

type AdsBannerType = {
  adUnitId: string
  onLoadStart?: () => void
  style?: StyleProp<ViewStyle>
} & Omit<BannerAdProps, 'unitId' | 'size'>

const development = false

export const AdsBanner: FC<AdsBannerType> = memo(({ adUnitId, onLoadStart, style, ...rest }) => {
  const { userIsPremium } = useAuth()
  useEffect(() => { if (!userIsPremium && onLoadStart) onLoadStart() }, [userIsPremium])
  if (userIsPremium) return null

  return (
    <View style={style}>
      <BannerAd
        unitId={development ? TestIds.BANNER : adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        {...rest}
      />
    </View>
  )
})

// export const useAdsBanner = (adUnitId: string) => {
//   const { userIsPremium } = useAuth()
//   const [isLoadingAds, setIsLoadingAds] = useState(false)
//   const Banner = ({ style }: Pick<AdsBannerType, 'style'>) => userIsPremium ? null : (
//     <AdsBanner adUnitId={adUnitId}
//       onLoadStart={() => setIsLoadingAds(true)}
//       onAdLoaded={() => setIsLoadingAds(false)}
//       onAdFailedToLoad={() => setIsLoadingAds(false)}
//       style={style}
//     />
//   )

//   return {
//     isLoading: !userIsPremium && isLoadingAds,
//     Banner
//   }
// }

