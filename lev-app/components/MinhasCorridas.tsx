import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const MinhasCorridas = () => (
  <Layout style={styles.page}>
    <Text category="h1">Corridas</Text>
  </Layout>
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
});
