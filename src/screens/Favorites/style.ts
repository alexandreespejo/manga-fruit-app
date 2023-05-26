import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
`

export const MangaListContainer = styled.FlatList`
  width:100%;
  margin-top: 5px;
`;