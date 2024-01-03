import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`

export const ConfigContainer = styled.View`
  width: 90%;
`

export const SubscriptionContainer = styled.View`
  align-items: center;
  width: 90%;
  margin-top: 16px;
`

export const UserProfileContainer = styled.View`
  height: 102px;
  width: 102px;
  border-radius: 102px;
  border: 5px solid ${(props) => props.theme.tint};
  align-items: center;
  justify-content: center;
`
export const UserProfile = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 100px;
`

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  margin-top: 16px;
`;