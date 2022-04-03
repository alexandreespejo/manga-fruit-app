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
  height: 80%;
  width: 100%;
  bottom:0;
  left: 0;
  background: ${(props) => props.theme.items};
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
`;

export const Label = styled.Text`
   padding:${({ title,desc }) => title ? '20px' : desc? '5px 20px':'5px 0px 10px'}  ;
   font-size: ${({ title }) => title ? '24px' : '16px'} ;
   font-weight: ${({ title,desc }) => title || !desc ? 'bold' : '400'} ;
   color:${({ theme,title,desc}) =>   title || desc?theme.text: theme.tint} ;
`;

export const ChapterButton = styled.TouchableOpacity`
   height: 25px;
   width: 100%;
`;

export const ChapterContainer= styled.View`
   position: absolute;
   background: ${(props) => props.theme.background};
   border-top-right-radius: 40px;
   border-top-left-radius: 40px;
   margin-top: 30%;
   width:95%;
   padding: 20px;
`;

export const ChapterList= styled.FlatList`
   width:100%;
   padding-left: 25px;
   margin-bottom: 100px;
`;