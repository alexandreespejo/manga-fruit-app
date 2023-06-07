import { Button } from 'react-native';
import styled from 'styled-components/native';

export const CloseButton = styled.TouchableOpacity`
  margin: 30px;
  right: 0;
  top: 0;
`;

export const ActionButton = styled.TouchableOpacity`
  margin: 0 5px;
`

export const ActionLabel = styled.Text`
  color: ${({ theme }) => theme.background};
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 1000;
  height: auto;
  width: 100%;
`

export const ActionContainer = styled.View`
  flex-direction: row;
  margin: 30px;
  left: 0;
  top: 0;
`

export const ReaderContainer = styled.Modal`
  background-color: black;
`
