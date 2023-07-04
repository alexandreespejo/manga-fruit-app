import React from 'react'
import { ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { Container } from './style'

type LoadProps = {
  isLoading?: boolean
}

function Load({ }: LoadProps) {
  return (
    <Container>
      <ActivityIndicator size="large" color={Colors.light.tint} />
    </Container>
  )
}

export default Load
