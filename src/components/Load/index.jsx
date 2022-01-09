import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './style';

function Load() {
  return (
    <Container>
      <ActivityIndicator size="large" color="#2E7AEB" />
    </Container>
  );
}

export default Load;
