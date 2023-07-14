import { VirtualizedList } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`

export const SearchNavigatorIndicator = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 75px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tint};
`

export const SearchNavigatorContainer = styled.TouchableOpacity`
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color:${(props) => props.theme.text};
  background-color: ${(props) => props.theme.items};
  border: 1px ${(props) => props.theme.tint};
  height: 50px;
  width: 90%;
  border-radius:25px;
`

export const SuggestionFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
`

export const MangaListContainer = styled(VirtualizedList)`
  margin-top: 10px;
  width:100%;
  min-height: 300px;
`
