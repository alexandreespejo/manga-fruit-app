import { FC } from "react"
import { DropdownComponent, DropdownContainer } from "./style"
import { Label } from "../Label"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../../constants/Colors"

interface DropdownType {
  options: string[]
  defaultSelected?: string
  label?: string
  onSelect?: (selectedItem: string) => void
}

export const Dropdown: FC<DropdownType> = ({ options, defaultSelected, label, onSelect }) => {
  return (
    <DropdownContainer>
      {label && <Label children={label} />}
      <DropdownComponent
        data={options}
        defaultValue={defaultSelected}
        onSelect={onSelect}
        dropdownIconPosition='right'
        renderDropdownIcon={isOpened => <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.light.text} size={18} />}
      />
    </DropdownContainer>
  )
}

