import { VirtualizedList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
`;

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
   padding:20px;
`

export const Label = styled.Text<any>`
   font-size: 24px;
   font-weight: bold;
   color:${({ theme }) => theme.text};
`;

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