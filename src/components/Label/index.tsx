import { FC } from "react"
import { LabelContainer } from "./style"

export type LabelVariants = 'Headline' | 'Title' | 'Text' | 'Description'

interface LabelType {
  variant?: LabelVariants
  children?: string
}

export const Label: FC<LabelType> = ({ children, variant = 'Text' }) => {
  return (
    <LabelContainer variant={variant}>{children}</LabelContainer>
  )
}

