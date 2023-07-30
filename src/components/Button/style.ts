import styled from 'styled-components/native';

interface ButtonContainerProps {
  variant?: 'Primary' | 'Secondary'
}

export const ButtonLabel = styled.Text<ButtonContainerProps>`
  color: ${({ theme, variant }) => variant === 'Primary' ? theme.background : theme.tint};
  font-size: 24px;
`

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 50px;
  width: 90%;
  background: ${({ theme, variant }) => variant === 'Primary' ? theme.tint : theme.items};
  border: 1px solid ${({ theme }) => theme.tint};
`;
