import styled from 'styled-components/native';

export const SubscriptionCardContainer = styled.TouchableOpacity<{ highlight: boolean }>`
  height: 100px;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.tint1};
  border: ${({ theme, highlight }) => highlight ? `2px solid ${theme.tint}` : 'none'};
  gap: 10px;
  `

export const DetailsContainer = styled.View`
  padding: 0 32px;
`
export const HighlightHeader = styled.View`
  display: flex;
  height: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.tint};
`

