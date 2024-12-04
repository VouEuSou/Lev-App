import React,  { useState }  from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect } from 'react';
export const Perfil = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_logado'); 

      router.replace("/" as never);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getUserInfo = async () => {
    try {
        const userData = await AsyncStorage.getItem('user_logado');
        if (userData) {
            const user = JSON.parse(userData);
            return user;
        } else {
            console.log('No user data found');
            return null;
        }
    } catch (error) {
        console.error('Failed to load user data:', error);
        return null;
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUserInfo();
      if (user && user.nome) {
        setUserName(user.nome);
      }
    };
    fetchUserInfo();
  }, []);
    
  

  return (
    <Layout style={styles.page}>
      <Text category="h1" style={styles.title}>Perfil</Text>
      <Image
        source={require('../assets/images/avatar.png')}
        style={{marginTop: 20, marginBottom: 20, width: 100, height: 100, objectFit: 'contain' }}
      />      
      <Text category="h2">Olá, {userName}!</Text>

      <Button style={styles.button} onPress={logout}>Logout</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    color: '#FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
    minWidth: 200,
    borderRadius: 20,
  },
  
});