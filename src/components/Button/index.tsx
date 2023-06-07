import { FC } from "react"
import { ButtonContainer, ButtonLabel } from "./style"

interface CustomButtonType {
  variant?: 'Primary' | 'Secondary',
  children?: string,
  onPress?: () => void
}

export const CustomButton: FC<CustomButtonType> = ({ children, variant = 'Primary', ...rest }) => {
  return (
    <ButtonContainer variant={variant} {...rest}>
      <ButtonLabel variant={variant}>{children}</ButtonLabel>
    </ButtonContainer>
  )
}

