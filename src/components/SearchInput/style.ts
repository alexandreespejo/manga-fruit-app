import { css } from "styled-components";
import styled from "styled-components/native";
const SearchButtonStyle = css`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
height: 100%;
width: 50px;
border-radius: 8px;
background-color: ${(props) => props.theme.tint};
`
export const SearchButton = styled.TouchableOpacity`
  ${SearchButtonStyle}
`

export const SearchButtonDisabled = styled.View`
${SearchButtonStyle}
`
export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color:${(props) => props.theme.text};
  background-color: ${(props) => props.theme.items};
  border: 1px ${(props) => props.theme.tint};
  height: 50px;
  width: 90%;
  border-radius:8px;
`;

export const Input = styled.TextInput`
  height: 100%;
  flex: 1;
  font-size: 20px;
  padding:0 10px;
  color:${(props) => props.theme.text};
`;