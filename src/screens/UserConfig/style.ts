import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin-bottom: 16px;
`;