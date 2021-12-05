import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
`;

export const ListContainer = styled.SafeAreaView`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: blue;
`;