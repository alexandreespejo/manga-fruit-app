import SelectDropdown from 'react-native-select-dropdown'
import styled from 'styled-components/native'

export const DropdownComponent = styled(SelectDropdown).attrs(({ theme }) => ({
  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: theme.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.tint,
  },
  buttonTextStyle: {
    textAlign: 'left'
  }
}))`
`

export const DropdownContainer = styled.View`
  width: 90%;
`

