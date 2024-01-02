import { FC } from "react"
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { useAuth } from "../../hooks/useAuth";

type AdsBannerType = {
  adUnitId: string
}

export const AdsBanner: FC<AdsBannerType> = ({ adUnitId }) => {
  const { userIsPremium } = useAuth()
  if (userIsPremium)
    return null

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  )
}

