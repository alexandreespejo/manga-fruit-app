import { FC } from "react"
import { LabelContainer } from "./style"
import { StyleProp, TextStyle } from "react-native"
import { ColorEnum } from "../../constants/Colors"

export type LabelVariants = 'Headline' | 'Title' | 'Text' | 'Description'

interface LabelType {
  variant?: LabelVariants
  children?: string
  color?: ColorEnum
  style?: StyleProp<TextStyle>
  onPress?: () => void
}

export const Label: FC<LabelType> = ({ children, variant = 'Text', style, color }) => {
  return (
    <LabelContainer variant={variant} style={style} color={color}>{children}</LabelContainer>
  )
}

