import { FC } from "react"
import { DropdownComponent, DropdownContainer } from "./style"
import { Label } from "../Label"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "../../constants/Colors"

type DropdownTypeOptions = {
  label: string,
  value: string
}

interface DropdownType {
  options: DropdownTypeOptions[]
  defaultSelected?: string
  label?: string
  onSelect?: (selectedItem: string) => void
}

export const Dropdown: FC<DropdownType> = ({ options, defaultSelected, label, onSelect }) => {
  const list = options?.map(op => op.label)
  const selected = options?.find(op => op.value === defaultSelected)
  return (
    <DropdownContainer>
      {label && <Label children={label} />}
      <DropdownComponent
        data={list}
        defaultValue={selected.label}
        onSelect={value => {
          const newSelected = options?.find(op => op.label === value)
          onSelect(newSelected.value)
        }}
        dropdownIconPosition='right'
        renderDropdownIcon={isOpened => <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.light.text} size={18} />}
      />
    </DropdownContainer>
  )
}

