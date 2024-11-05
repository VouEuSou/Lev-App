
import { Card, Icon, Text, Button, Layout } from '@ui-kitten/components';
import { useRouter } from "expo-router";
import { StyleSheet, View, ViewProps, Image, Linking, Pressable } from 'react-native';
import { useState } from 'react';
import './ridesList.css'
import Svg, { Path, Ellipse } from 'react-native-svg';

export default function RidesListClient(props: any) {
    const router = useRouter();
    const distancia_km = props.ride.distancia / 1000 + 0.6
    const ano = props.ride.createdAt.substring(0, 4);
    const mes = props.ride.createdAt.substring(5, 7);
    const dia = props.ride.createdAt.substring(8, 10);
    const data = `${dia}/${mes}/${ano}`;
    const preco = props.ride.preco;
    
    // Create local variables for transformed text
    const vehicleType = props.ride.isCarro ? 'Carro' : 'Moto';
    
    let displayStatus = props.ride.status;
    if (props.ride.status === 'Encomenda aceita pelo entregador') {
        displayStatus = 'Aceito';
    } else if (props.ride.status === 'Encomenda em transporte') {
        displayStatus = 'Em transporte';
    } else if (props.ride.status === 'Encomenda entregue') {
        displayStatus = 'Entregue';
    }

    const Header = (props: any): React.ReactElement => (
        <View {...props}>
    <View style={{ marginTop: 5 }}>
    <Pressable onPress={() => router.push('/driverIndex')}>
      <Layout style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
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
        <View>
        <Icon name='arrow-forward-outline' style={{ width: 24, height: 24, tintColor: '#1a1c51', paddingTop: 4 }} />
        </View>
      </Layout>
        </Pressable>
    </View>
        </View>
      );






    return (
        <Card style={styles.card} header={Header}>
          <Layout style={styles.hStack}>
            <View>
                <View style={{ width: 30, height: 64, marginLeft: 0, marginTop: 6 }}>
                <Svg width={30} height={150} viewBox="0 0 23 98.4">
                  <Path d="M5.5,5.4v70.4" stroke="#3B3B3B" fill="none" />
                  <Ellipse cx="5.5" cy="3.8" rx="3.9" ry="3.8" fill="#3B3B3B" />
                  <Ellipse cx="5.5" cy="72.4" rx="3.9" ry="3.8" fill="#3B3B3B" />
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
            <View style={styles.flexEnd}>
              <Text style={styles.textMain}>
                {props.data}
              </Text>
            </View>
          </Layout>
        </Card>
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
  });