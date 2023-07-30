import SelectDropdown from 'react-native-select-dropdown'
import styled from 'styled-components/native'

export const DropdownComponent = styled(SelectDropdown).attrs(({ theme }) => ({
  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: theme.items,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.tint,
    color: theme.text
  },
  buttonTextStyle: {
    textAlign: 'left',
    color: theme.text
  }
}))`
`

export const DropdownContainer = styled.View`
  width: 90%;
`

