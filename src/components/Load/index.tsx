import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container } from './style'
import { useTheme } from 'styled-components'

type LoadProps = {
  isLoading?: boolean
}

function Load({ }: LoadProps) {
  const theme = useTheme()

  return (
    <Container>
      <ActivityIndicator size="large" color={theme.tint} />
    </Container>
  )
}

export default Load
