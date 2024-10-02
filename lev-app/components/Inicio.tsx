import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import theme from "../app/theme.json";
export const Inicio = () => (
  <Layout style={styles.page}>
    <Text category="h1" style={styles.text}>Home</Text>
  </Layout>
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    color: theme['color-brand-blue'],  // Set text color to black
  },
});
