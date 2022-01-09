import styled from 'styled-components/native';

export const Container = styled.View`
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
