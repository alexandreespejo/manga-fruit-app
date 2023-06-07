import { FC } from "react"
import { ButtonContainer, ButtonLabel } from "./style"
import { StyleProp, ViewStyle } from "react-native"

interface CustomButtonType {
  variant?: 'Primary' | 'Secondary',
  children?: string,
  onPress?: () => void,
  style?: StyleProp<ViewStyle>
}

export const CustomButton: FC<CustomButtonType> = ({ children, variant = 'Primary', ...rest }) => {
  return (
    <ButtonContainer variant={variant} {...rest}>
      <ButtonLabel variant={variant}>{children}</ButtonLabel>
    </ButtonContainer>
  )
}

