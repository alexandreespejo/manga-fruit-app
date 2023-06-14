import { VirtualizedList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
`;

export const FiltersModalContainer = styled.Modal``;

export const FilterFormWrapper = styled.View`
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 100%;
   background-color: rgba(0,0,0,0.5);
`

export const FormField = styled.View`
   width: 90%;
`

export const ChapterInput = styled.TextInput.attrs(() => ({
   keyboardType: 'numeric',
}))`
   height: 50px;
   width: 100%;
   border-radius: 8px;
   margin-bottom: 10px;
   border: 1px ${(props) => props.theme.tint};
   font-size: 20px;
   padding:0 10px;
   color:${(props) => props.theme.text};
`

export const FilterForm = styled.View`
   align-items: center;
   border-radius: 8px;
   height: auto;
   width: 90%;
   padding: 15px 0;
   background: ${(props) => props.theme.items};
`

export const Banner = styled.Image`
   height: 30%;
   width: 100%;
`;

export const ContentWrraper = styled.View`
  height: 100%;
  width: 100%;
  bottom:0;
  left: 0;
  background: ${(props) => props.theme.items};
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
`;

export const HeaderWrapper = styled.View`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 0 20px;
`

export const ChapterButton = styled.TouchableOpacity`
   height: 25px;
   width: 100%;
`;

export const ChapterContainer = styled.View`
   position: absolute;
   background: ${(props) => props.theme.background};
   border-top-right-radius: 40px;
   border-top-left-radius: 40px;
   margin-top: 30%;
   width:95%;
   padding: 20px;
`;

export const ChapterList = styled(VirtualizedList)`
   width:100%;
   padding-left: 25px;
   margin-top: 10px;
   margin-bottom: 5px;
`;

export const ChapterText = styled.Text`
  
`;