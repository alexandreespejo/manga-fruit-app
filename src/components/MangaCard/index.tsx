import React, { memo, useEffect, useMemo, useState } from "react"
import { Image, InfoWrapper, MangaCardContainer, Title, TitleContainer } from "./style"
import { getCover } from "../../services/mangadex"
import { Label } from "../Label"
import { Platform, StyleProp, ViewStyle } from "react-native"

interface MangaCardProps {
  data: any
  onSelectManga: (data: any) => void
  variant?: 'Large' | 'Small'
  style?: StyleProp<ViewStyle>
}

export const MangaCard = memo(({
  data,
  variant = 'Large',
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

  // const [tags, setTags] = useState([])

  // const loadTags = () => {
  //   const tagList = data?.attributes?.tags
  //   setTags(tagList.map((item: any) => item?.attributes?.name?.en))
  // }


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

  // const renderTags = () => {
  //   return tags.map((tag, index) => {
  //     return <Tag key={tag}><Title tag index={index}>{tag}</Title></Tag>
  //   })
  // }

  return (
    <MangaCardContainer onPress={onCardClick} variant={variant} style={style}>
      <Image
        source={{ uri: cover }}
        variant={variant}
        progressiveRenderingEnabled={Platform.OS === 'android'}
      />
      <InfoWrapper>
        <TitleContainer>
          <Label style={{ fontWeight: "bold" }}>{data?.attributes?.title?.en}</Label>
          {variant === 'Large' && <Title autor>Status: {data?.attributes?.status ?? ''}</Title>}
        </TitleContainer>
      </InfoWrapper>
    </MangaCardContainer>
  )
})