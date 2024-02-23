import React from "react"
import { FontAwesome } from "@expo/vector-icons"
import internalization from "../../services/internalization"
import { useTheme } from "styled-components"
import { Input, SearchButton, SearchButtonDisabled, SearchContainer } from "./style"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Label } from "../Label"

type SearchInputType = {
  search?: string, setSearch?: React.Dispatch<React.SetStateAction<string>>,
  onSearch?: () => void, disabled?: boolean
}

export function SearchInputButton(props: TouchableOpacityProps) {
  const theme = useTheme()

  return (
    <TouchableOpacity {...props}>
      <SearchContainer>
        <Label variant="Title" children={internalization.t('searchInputPlaceholder')} style={{ paddingLeft: 8 }} />
        <SearchButtonDisabled>
          <FontAwesome name="search" size={16} color={theme.text} />
        </SearchButtonDisabled>
      </SearchContainer>
    </TouchableOpacity>
  )
}

export function SearchInput({ search, setSearch, onSearch, disabled }: SearchInputType) {
  const theme = useTheme()

  return (
    <SearchContainer>
      <Input
        onChangeText={setSearch}
        value={search}
        placeholder={internalization.t('searchInputPlaceholder')}
        placeholderTextColor={theme.text}
        onSubmitEditing={onSearch}
        pointerEvents={disabled ? "none" : 'auto'}
      />
      <SearchButton onPress={onSearch} disabled={disabled}>
        <FontAwesome name="search" size={16} color={theme.text} />
      </SearchButton>
    </SearchContainer>
  )
}