import { FC, memo, useEffect } from "react"
import { BannerAd, BannerAdSize, TestIds, BannerAdProps } from "react-native-google-mobile-ads";

type AdsBannerType = {
  adUnitId: string
  onLoadStart?: () => void
} & Omit<BannerAdProps, 'unitId' | 'size'>

const development = true

export const AdsBanner: FC<AdsBannerType> = memo(({ adUnitId, onLoadStart, ...rest }) => {
  useEffect(() => onLoadStart, [])
  // return null
  return (
    <BannerAd
      unitId={development ? TestIds.BANNER : adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      {...rest}
    />
  )
})

