import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export const Perfil = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_logado'); 

      router.push("/" as never);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Layout style={styles.page}>
      <Text category="h1">Perfil</Text>
      <Button onPress={logout}>Logout</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
});