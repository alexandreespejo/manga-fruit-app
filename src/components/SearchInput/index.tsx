import React from "react"
import { FontAwesome } from "@expo/vector-icons"
import internalization from "../../services/internalization"
import { useTheme } from "styled-components"
import { Input, SearchButton, SearchContainer } from "./style"

type SearchInputType = {
  search?: string, setSearch?: React.Dispatch<React.SetStateAction<string>>,
  onSearch?: () => void, disabled?: boolean
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
        <FontAwesome name="search" size={24} color={theme.background} />
      </SearchButton>
    </SearchContainer>
  )
}