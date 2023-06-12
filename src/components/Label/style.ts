import styled, { css } from 'styled-components/native';
import { LabelVariants } from '.';

interface LabelContainerProps {
  variant?: LabelVariants
}

export const LabelContainer = styled.Text<LabelContainerProps>`
  color: ${({ theme }) => theme.text}

  ${({ variant }) => variant === 'Title' && css`
    font-size: 20px;
    line-height: 30px;
  `}
  
  ${({ variant }) => variant === 'Text' && css`
    font-size: 16px;
  `}

  ${({ variant }) => variant === 'Description' && css`
    font-size: 14px;
    line-height: 2%;
  `}
`
