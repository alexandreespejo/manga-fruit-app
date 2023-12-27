import { VirtualizedList } from 'react-native';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native'

export const Header = styled.View`
  display: flex;
  align-items: flex-start;
`

export const MangaCardContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:${(props) => props.theme.text};
  margin-top: 15px;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.background};
  height: 150px;
  width: 90%;
  border-radius:25px;
`;

export const Image = styled.Image`
   height: 90%;
   width: 90px;
   border-radius: 10px;
`;

export const Title = styled.Text<any>`
   font-size: ${({ autor, tag }) => autor || tag ? '14px' : '18px'} ;
   font-weight: ${({ autor, tag }) => autor || tag ? '400' : 'bold'} ;
   color:${({ theme, autor, tag }) => autor ? theme.text : tag ? 'white' : 'black'} ;
`;

export const InfoWrapper = styled.View`
  display: flex;
  margin-left: 15px;
  padding: 5px 0;
  flex: 1;
  overflow: hidden;
`

export const TitleContainer = styled.View`
  display: flex;
  flex: 1;
`

export const TagsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
export const Tag = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-right: 5px;
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.tint};
  color:white;
`

export const CategoriesButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 35px;
  padding-left: 8px;
  padding-right: 8px;
  width: auto;
  border-radius: 50px;
  background-color: ${(props) => props.theme.tint3};
  border: 1px solid ${(props) => props.theme.tint};
  filter: blur(100%);
`

export const CategoriesItemContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  border-radius: 8px;
`

export const CategoriesContainer = styled(BlurView).attrs(() => ({
  intensity: 70,
  // blurReductionFactor: 10
}))`
  display: flex; 
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.items};
  padding: 32px 16px 8px;
  
`

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  align-items: center;
`

export const ListContainer = styled.SafeAreaView`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: blue;
`

export const MangaListContainer = styled(VirtualizedList)`
  margin-top: 10px;
  width:100%;
`;