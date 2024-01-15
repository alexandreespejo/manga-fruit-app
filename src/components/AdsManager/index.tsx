import { FC, memo, useEffect, useState } from "react"
import { BannerAd, BannerAdSize, TestIds, BannerAdProps } from "react-native-google-mobile-ads";
import { useAuth } from "../../hooks/useAuth";

type AdsBannerType = {
  adUnitId: string
  onLoadStart?: () => void
} & Omit<BannerAdProps, 'unitId' | 'size'>

const development = false

export const AdsBanner: FC<AdsBannerType> = memo(({ adUnitId, onLoadStart, ...rest }) => {
  const { userIsPremium } = useAuth()

  useEffect(() => onLoadStart, [])

  if (userIsPremium) {
    return null
  }

  return (
    <BannerAd
      unitId={development ? TestIds.BANNER : adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      {...rest}
    />
  )
})

