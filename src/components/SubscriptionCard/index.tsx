import { StyleProp, TextStyle } from "react-native"
import { Label } from "../Label"
import { HighlightHeader, SubscriptionCardContainer, DetailsContainer } from "./style"

type SubscriptionCardType = {
  highlight?: boolean,
  style?: StyleProp<TextStyle>
  onPress?: () => void
  mainText: string
  secondaryText?: string
}

export const SubscriptionCard = ({ highlight, mainText, secondaryText, onPress, ...rest }: SubscriptionCardType) => {
  return (
    <SubscriptionCardContainer highlight={highlight} onPress={onPress} {...rest}>
      {highlight && <HighlightHeader>
        <Label variant="Text">Best Seller</Label>
      </HighlightHeader>}
      <DetailsContainer style={{ height: highlight ? 84 : 100, justifyContent: highlight ? 'flex-start' : 'center' }}>
        <Label variant="Title" style={{ fontWeight: '700' }}>{mainText}</Label>
        <Label style={{ textDecorationLine: "line-through" }}>{secondaryText}</Label>
      </DetailsContainer>
    </SubscriptionCardContainer>
  )
}

