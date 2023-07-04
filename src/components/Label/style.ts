import styled, { css } from 'styled-components/native';
import { LabelVariants } from '.';
import { ColorEnum } from '../../constants/Colors';

interface LabelContainerProps {
  variant?: LabelVariants
  color?: ColorEnum
}

export const LabelContainer = styled.Text<LabelContainerProps>`
  color: ${({ theme, color }) => color ? theme[color] : theme.text}

  ${({ variant }) => variant === 'Headline' && css`
    font-size: 24px;
    font-weight: bold;
  `}
    
  ${({ variant }) => variant === 'Title' && css`
    font-size: 20px;
  `}
  
  ${({ variant }) => variant === 'Text' && css`
    font-size: 16px;
  `}

  ${({ variant }) => variant === 'Description' && css`
    font-size: 14px;
  `}
`
