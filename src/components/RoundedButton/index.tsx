import { FontAwesome } from "@expo/vector-icons"
import { ButtonContainer } from "./style"

interface RoundedButtonInterface {
  name: any
  onPress?: () => void
  color?: string
}

export function RoundedButton({ name, color, ...rest }: RoundedButtonInterface) {
  return (
    <ButtonContainer {...rest}>
      <FontAwesome
        name={name}
        size={30}
        color={color}
      />
    </ButtonContainer>
  )
}

