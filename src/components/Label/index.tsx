import { FC } from "react"
import { LabelContainer } from "./style"
import { StyleProp, TextStyle } from "react-native"

export type LabelVariants = 'Headline' | 'Title' | 'Text' | 'Description'

interface LabelType {
  variant?: LabelVariants
  children?: string
  style?: StyleProp<TextStyle>
}

export const Label: FC<LabelType> = ({ children, variant = 'Text', style }) => {
  return (
    <LabelContainer variant={variant} style={style}>{children}</LabelContainer>
  )
}

