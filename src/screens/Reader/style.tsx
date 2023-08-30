import styled from 'styled-components/native'

export const ActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`

export const ActionLabel = styled.Text`
  color: ${(props) => props.theme.text};
`

export const ReaderContainer = styled.View`
  flex: 1; 
  align-items: center; 
  justify-content: center; 
  background-color: ${(props) => props.theme.background};
`

export const HeaderContainer = styled.View`
  position: absolute;
  z-index: 1000;
  top: 16px;
  height: 48px;
  width: 90%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  padding: 0 16px;
`
