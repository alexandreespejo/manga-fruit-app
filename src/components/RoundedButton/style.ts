import styled from 'styled-components/native';

export const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.background};
  font-size: 24px;
`

export const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 50px;
  width: 50px;
`;
