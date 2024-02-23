import React, { memo, useEffect, useState } from "react"
import { getCover } from "../../services/mangadex"
import { Label } from "../Label"
import { Platform, StyleProp, ViewStyle } from "react-native"
import styled from 'styled-components/native'

const MangaCardContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  width: 107px;
`;

const Image = styled.Image`
  height: 157px;
  width: 107px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

interface MangaCardProps {
  data: any
  onSelectManga: (data: any) => void
  style?: StyleProp<ViewStyle>
}

export const MangaCardLarge = memo(({
  data,
  onSelectManga,
  style
}: MangaCardProps) => {
  const [cover, setCover] = useState<string>()

  useEffect(() => {
    if (data?.relationships) {
      const coverArt = (data?.relationships as any[]).find(rel => rel.type === "cover_art")
      if (coverArt && coverArt?.attributes)
        return setCover(`https://uploads.mangadex.org/covers/${data.id}/${coverArt?.attributes?.fileName}`)
    }
    loadCover()
  }, [data])

  const loadCover = async () => {
    try {
      const coverArt = data?.relationships.filter((item: any) => item.type === 'cover_art')[0]
      const coverData = await getCover(coverArt?.id)
      const { fileName } = coverData?.data?.attributes
      const responseCover = `https://uploads.mangadex.org/covers/${data.id}/${fileName}`
      setCover(responseCover)
    } catch (err) {
      console.log(err)
    }
  }

  const onCardClick = () => {
    onSelectManga({ ...data, coverLink: cover })
  }

  return (
    <MangaCardContainer onPress={onCardClick} style={style}>
      <Image
        source={cover ? { uri: cover } : require('./loading-image.png')}
        progressiveRenderingEnabled={Platform.OS === 'android'}
      />
      <Label variant="Description" numberOfLines={2}>{data?.attributes?.title?.en}</Label>
    </MangaCardContainer>
  )
})  