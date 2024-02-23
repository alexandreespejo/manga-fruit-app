import { FC } from "react"
import { LabelContainer } from "./style"
import { StyleProp, TextStyle, TextProps } from "react-native"
import { ColorEnum } from "../../constants/Colors"

export type LabelVariants = 'Headline' | 'Title' | 'Text' | 'Description'

type LabelType = {
  variant?: LabelVariants
  children?: string
  color?: ColorEnum
  style?: StyleProp<TextStyle>
  onPress?: () => void
} & TextProps

export const Label: FC<LabelType> = ({ children, variant = 'Text', style, color, ...rest }) => {
  return (
    <LabelContainer variant={variant} style={style} color={color} {...rest}>{children}</LabelContainer>
  )
}

