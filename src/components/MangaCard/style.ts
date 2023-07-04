import { css } from 'styled-components';
import styled from 'styled-components/native'

type MangaCardProps = {
  variant?: 'Large' | 'Small'
}

export const MangaCardContainer = styled.TouchableOpacity<MangaCardProps>`
  display: flex;

  ${({ variant }) => variant === 'Large' && css`
    flex-direction: row;
    align-items: center;
    color:${(props) => props.theme.text};
    margin-top: 15px;
    padding: 10px 15px;
    background-color: ${(props) => props.theme.background};
    height: 150px;
    width: 90%;
    border-radius: 25px;
    border: 1px solid lightgray;
  `}

  ${({ variant }) => variant === 'Small' && css`
    flex-direction: column;
    height: 300px;
    width: 150px;
  `}
`;

export const Image = styled.Image<MangaCardProps>`
   border-radius: 8px;

  ${({ variant }) => variant === 'Large' && css`
    height: 90%;
    width: 90px;
  `}

  ${({ variant }) => variant === 'Small' && css`
    height: 200px;
    width: 150px;
    border: 1px solid black;
  `}
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

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:${(props) => props.theme.text};
  padding: 0 8px;
  background-color: ${(props) => props.theme.items};
  height: 50px;
  width: 90%;
  border-radius:25px;
`;

export const Input = styled.TextInput`
  height: 100%;
  width: 80%;
  font-size: 20px;
  padding:0 10px;
  color:${(props) => props.theme.text};
`;

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

export const MangaListContainer = styled.FlatList`
  width:100%;
`;