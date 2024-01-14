import { FC, memo, useState } from "react"
import { BannerAd, BannerAdSize, TestIds, BannerAdProps } from "react-native-google-mobile-ads";
import { useAuth } from "../../hooks/useAuth";

type AdsBannerType = {
  adUnitId: string
} & Omit<BannerAdProps, 'unitId' | 'size'>

const development = true

export const AdsBanner: FC<AdsBannerType> = memo(({ adUnitId, ...rest }) => {
  const { userIsPremium } = useAuth()

  if (userIsPremium)
    return null

  return (
    <BannerAd
      unitId={development ? TestIds.BANNER : adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      {...rest}
    />
  )
})

