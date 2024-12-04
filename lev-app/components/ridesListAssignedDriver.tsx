  import React, { useState, useEffect } from 'react';
  import { Card, Icon, Text, Button, Layout, Modal, Input } from '@ui-kitten/components';
  import { useRouter } from "expo-router";
  import { StyleSheet, View, ViewProps, Image, Linking, Pressable, Animated } from 'react-native';
  import Svg, { Path, Ellipse } from 'react-native-svg';
  import { TouchableOpacity } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function RidesListClient(props: any) {
      const router = useRouter();
      const [visible, setVisible] = useState(false);
      const [animation] = useState(new Animated.Value(0));
      const [isPin1, setIsPin1] = useState(true);
      const [pinInput, setPinInput] = useState('');
      const [isCompleted, setIsCompleted] = useState(false);
      const [displayStatus, setDisplayStatus] = useState('');

      useEffect(() => {
          let status = props.ride.status;
          if (status === 'Encomenda aceita pelo entregador') {
              status = 'Aceito';
          } else if (status === 'Encomenda em transporte') {
              status = 'Na rota';
              setIsPin1(false);
          } else if (status === 'Encomenda entregue') {
              status = 'Entregue';
              setIsCompleted(true);
          }
          setDisplayStatus(status);
      }, [props.ride.status]);

      const updatePacotePin1 = async () => {
          const UserAuth = await AsyncStorage.getItem('user_logado');
          try {
              const response = await fetch(`${props.host}/pacotes/update/pin1`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': JSON.parse(UserAuth!).auth
                  },
                  body: JSON.stringify({
                      pin: pinInput
                  })
              });
              const data = await response.json();
              if (data.pinMotorista === pinInput) {
                  alert('Pin inserido com sucesso');
                  closeModal();
                  router.replace('/driverIndex');
              } else {
                  alert('Pin incorreto');
              }
          } catch (error) {
              console.log(error);
          }
      };
      
      const updatePacotePin2 = async () => {
          const UserAuth = await AsyncStorage.getItem('user_logado');
          try {
              const response = await fetch(`${props.host}/pacotes/update/pin2`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': JSON.parse(UserAuth!).auth
                  },
                  body: JSON.stringify({
                      pin: pinInput
                  })
              });
              const data = await response.json();
              if (data.pinUsuario === pinInput) {
                  alert('Pin inserido com sucesso');
                  closeModal();
                  router.replace('/driverIndex');
              } else {
                  alert('Pin incorreto');
              }
          } catch (error) {
              console.log(error);
          }
      };


      const openModal = () => {
          setVisible(true);
          Animated.spring(animation, {
              toValue: 1,
              useNativeDriver: true,
          }).start();
      };

      // Add this function inside the component
      const openMapsNavigation = () => {
        const maplink = `https://www.google.com/maps/dir/?api=1&origin=${props.ride.origem_coord.coordinates[0]},${props.ride.origem_coord.coordinates[1]}&destination=${props.ride.destino_coord.coordinates[0]},${props.ride.destino_coord.coordinates[1]}&travelmode=driving`;
        Linking.openURL(maplink);
      };

      const closeModal = () => {
          Animated.timing(animation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
          }).start(() => setVisible(false));
      };

      const distancia_km = props.ride.distancia / 1000 + 0.6
      const ano = props.ride.createdAt.substring(0, 4);
      const mes = props.ride.createdAt.substring(5, 7);
      const dia = props.ride.createdAt.substring(8, 10);
      const data = `${dia}/${mes}/${ano}`;
      const preco = props.ride.preco;
    
      const vehicleType = props.ride.isCarro ? 'Carro' : 'Moto';


      const Header = (props: any): React.ReactElement => (
          <View {...props}>
      <View style={{ marginTop: 5 }}>
        <Layout style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }} >
          <View>
            <Text style={{ color: '#1a1c51', fontWeight: 'bold', fontSize: 20 }}>
              R$ {preco}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#000000',
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: 12,
                marginTop: 5,
                backgroundColor: '#D9D9D9',
                borderRadius: 20,
                paddingHorizontal: 8,
              }}
            >
              {distancia_km.toFixed(2)} km
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <View>
            <Text
              style={{
                color: '#FFFF',
                backgroundColor: '#1a1c51',
                borderRadius: 20,
                marginRight: 5,
                paddingHorizontal: 10,
                paddingVertical: 2,
                fontWeight: 'bold',
                marginTop: 4,
                fontSize: 16,
              }}
            >
              {displayStatus}
            </Text>
          </View>
        </Layout>
      </View>
          </View>
        );

      return (
          <>
              <Card style={styles.card} header={Header}>
                <Layout style={styles.hStack}>
                  <View>
                      <View style={{ width: 30, height: 64, marginLeft: 0, marginTop: 6 }}>
                      <Svg width={30} height={190} viewBox="0 0 19 110.4">
                        <Path d="M5.5,6.4v60.4" stroke="#3B3B3B" fill="none" />
                        <Ellipse cx="5.5" cy="3.8" rx="5" ry="5" fill="#3B3B3B" />
                        <Ellipse cx="5.5" cy="70.4" rx="5" ry="5" fill="#3B3B3B" />
                      </Svg>
                      </View>
                  </View>
                  <View>
                    <Text style={styles.textMain}>
                      {props.ride.origem_endereco}
                    </Text>
                    <Text style={[styles.textMain, { marginTop: 30 }]}>
                      {props.ride.destino_endereco}
                    </Text>
                  </View>
                </Layout>
                <Layout style={styles.bottomSide}>
                  <Text style={styles.label}>Descrição</Text>
                  <Text style={styles.textMain}>
                    {props.ride.descricao}
                  </Text>
                  <Text style={styles.label}>Veículo solicitado:</Text>
                  <Text style={styles.textMain}>
                    {vehicleType}
                  </Text>
                  { isCompleted ? null :
                   
                   <Button style={styles.PINButton} onPress={openModal} accessoryLeft={props => <Icon {...props} name='lock-outline'/>}>
                    Digitar seu PIN
                    </Button> }
                  <Button 
                    style={styles.navigationButton} 
                    onPress={openMapsNavigation}
                    accessoryLeft={props => <Icon {...props} name='navigation-2-outline'/>}>
                    Abrir no Maps
                  </Button>
                  <View style={styles.flexEnd}>
                    <Text style={styles.textMain}>
                      {props.data}
                    </Text>
                  </View>
                </Layout>
              </Card>

              <Modal
                  visible={visible}
                  backdropStyle={styles.backdrop}
                  onBackdropPress={closeModal}>
                  <Animated.View style={[
                      styles.modalContainer,
                      {
                          transform: [{
                              scale: animation.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0.8, 1],
                              }),
                          }],
                          opacity: animation,
                      },
                  ]}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={closeModal}>
                            <Icon name='close-outline' style={styles.closeIcon} />
                        </Pressable>
                    </View>
                      <Card style={styles.modal} disabled={true}>
                      <Text style={styles.textModal} category="h6">{isPin1 ? 'Digite seu PIN1' : 'Digite seu PIN2'}</Text>
                          <Input
                              textStyle={{ color: '#1a1c51' }}
                              placeholder="PIN"
                              value={pinInput}
                              onChangeText={setPinInput}
                              style={styles.pinInput}
                              keyboardType="numeric"
                              maxLength={4}
                              autoFocus={true}

                          />
                          <Button
                              style={styles.submitButton}
                              onPress={() => isPin1 ? updatePacotePin1() : updatePacotePin2()}>
                              Enviar
                          </Button>
                      </Card>
                  </Animated.View>
              </Modal>
          </>
      );
  };

  const styles = StyleSheet.create({
      hStack: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'white'
      },
      card: {
        backgroundColor: '#FFFFFF',  
        color: '#484848',
        margin: 10,
        maxWidth: '98%',
        borderRadius: 20,
      },
      textMain: {
        color: '#484848',
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        maxWidth: '90%',
      },
      label: {
        color: '#484848',
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
      },
      rightSide: {
        backgroundColor: 'white',
        marginLeft: 40,
      },
      bottomSide: {
        marginTop: 10,
        backgroundColor: 'white'
      },
      flexEnd: {
        alignItems: 'flex-end',
        backgroundColor: 'white'
      },
      backdrop: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modal: {
          backgroundColor: '#FFFF',
          borderRadius: 20,
          marginBottom: 500,
      },
      modalContainer: {
          width: '90%',
          alignSelf: 'center',
      },
      cardText: {
          color: '#1a1c51',
          fontSize: 16,
          marginBottom: 8,
      },
      closeButton: {
          marginTop: 20,
          borderRadius: 20,
      },
      navigationButton: {
        marginTop: 15,
        backgroundColor: '#1a1c51',
        borderColor: '#1a1c51',
        borderRadius: 25,
      },
      modalHeader: {
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 10,
      },
      closeIcon: {
          width: 32,
          height: 32,
          tintColor: '#FFFFFFFF',
      },
      pinInput: {
        marginVertical: 10,
        width: '100%',
        backgroundColor: '#FFFF',
        borderRadius: 20,
        borderColor: '#1a1c51',
    },
    submitButton: {
        marginTop: 10,
        borderRadius: 20,
    },
    textModal: {
        color: '#1a1c51',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 8,
    },
    PINButton: {
        marginTop: 30,
        borderRadius: 25,
    }
  });
