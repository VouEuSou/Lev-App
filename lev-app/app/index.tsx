import React from 'react';
import { View, Image, StyleSheet, ToastAndroid } from "react-native";
import theme from "./theme.json";
import { Layout, Tab, TabView, Input, Button } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useRouter } from "expo-router";
import { showToast } from '../utils/toast';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Index() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index: number): boolean => index === selectedIndex;
  const router = useRouter();

  // React Hook Form
  const {
    control, handleSubmit, formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',    // prevents uncontrolled input warnings
      password: '', // Same for password
      name: ''      // Same but for registration name field
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  async function verificaLogin(data: any) {
    console.log("entrou");
    const host = "https://beloved-burro-stunning.ngrok-free.app"; 
  
    try {
      const response = await fetch(`${host}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          senha: data.password,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message); 
      }
  
      const user = await response.json();

      const userData = {
        id: user.usuario_id,
        nome: user.usuario_nome,
        email: user.usuario_email,
        isAdmin: user.usuario_isAdm,
        isDriver: user.usuario_isDriver,
        auth: user.token,
      };
  
      await AsyncStorage.setItem(
        "user_logado",
        JSON.stringify(userData) // Save user data in AsyncStorage
      );
  
      // Navigate based on user role
      if (user.usuario_isDriver) {
        router.push("/driverIndex" as never);
      } else {
        if (Platform.OS === "android") {
        ToastAndroid.show("Usuário é um cliente. Aplicativo somente para motoristas", ToastAndroid.LONG);
        } else {
        showToast("Usuário é um cliente. Aplicativo somente para motoristas");
        }
      }
    } catch (error: any) {
      console.log(error);
      if (Platform.OS === "android") {
        ToastAndroid.show("Usuário ou senha incorretos", ToastAndroid.LONG);
      } else {
        showToast("Usuário ou senha incorretos");
      }
    }
  }  
  

  return (
    <View
      style={{
        backgroundColor: theme['color-brand-blue'],
        flex: 1,
      }}
    >
          <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <Image
        source={require('../assets/images/lev_green.png')}
        style={{ margin: 20, width: 250, height: 250, alignSelf: "center" }}
      />
      <Layout style={styles.container}>
      <TabView
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={index => setSelectedIndex(index)}
        style={{
          backgroundColor: theme['color-brand-blue'],
          flex: 1,  // take full space
          width: '20%',
          minWidth: 300,
        }}
      >
        <Tab title='Login' style={styles.tab}>
          <Layout style={styles.tabContainer}>
            <Controller
              control={control}
              name="email"
              rules={{ required: 'Obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  textStyle={styles.inputText}  
                  placeholder='Email'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  textStyle={styles.inputText}  
                  placeholder='Senha'
                  value={value}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Button style={styles.button} onPress={handleSubmit(verificaLogin)}>
              Login
            </Button>
          </Layout>
        </Tab>
        
        <Tab title='Registro' style={styles.tab}>
          <Layout style={styles.tabContainer}>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  textStyle={styles.inputText}
                  placeholder='Nome'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name ? errors.name.message : ''}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{ required: 'Obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  textStyle={styles.inputText} 
                  placeholder='Email'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.input}
                  textStyle={styles.inputText} 
                  placeholder='Senha'
                  value={value}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
              Register
            </Button>
          </Layout>
        </Tab>
      </TabView>
      </Layout>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: theme['color-brand-blue'],
    flexGrow: 1,
    width: '100%', 
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    backgroundColor: theme['color-brand-blue'],
    marginBottom: 5,
    width: '100%',  
  },
  input: {
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: theme['color-brand-white'],
    width: '100%',
  },
  button: {
    marginTop: 10,
    borderRadius: 30,
    width: '100%',
    color: theme['color-brand-green'],
  },
  inputText: {
    color: theme['color-brand-blue'],
    fontSize: 16,
  },
  container: {
    backgroundColor: theme['color-brand-blue'],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
