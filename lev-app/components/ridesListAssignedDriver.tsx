
import { Card, Icon, Text, Button, Layout } from '@ui-kitten/components';
import { useRouter } from "expo-router";
import { StyleSheet, View, ViewProps, Image } from 'react-native';
import { useState } from 'react';
import { HiArrowRight } from "react-icons/hi";
import './ridesList.css'
export default function RidesListClient(props: any) {
    const router = useRouter();
    const distancia_km = props.ride.distancia / 1000 + 0.6
    const ano = props.ride.createdAt.substring(0, 4);
    const mes = props.ride.createdAt.substring(5, 7);
    const dia = props.ride.createdAt.substring(8, 10);
    const data = `${dia}/${mes}/${ano}`;
    const preco = props.ride.preco;
    const status = props.ride.status;    

    const Header = (props: any): React.ReactElement => (
        <View {...props}>
    <View style={{ marginTop: 5 }}>
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
            {distancia_km} km
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
              fontWeight: 'bold',
              marginTop: 7,
              fontSize: 16,
            }}
          >
            {status}
          </Text>
        </View>
        <View>
          <HiArrowRight size={24} color="#1a1c51" />
        </View>
      </Layout>

    </View>
        </View>
      );





    if (props.ride.isCarro == true) {
        props.ride.isCarro = 'Carro'
    }
    else {
        props.ride.isCarro = 'Moto'
    }
    if (props.ride.status === 'Encomenda aceita pelo entregador') {
        props.ride.status = 'Aceito'
    } else if (props.ride.status === 'Encomenda em transporte') {
        props.ride.status = 'Em transporte'
    } else if (props.ride.status === 'Encomenda entregue') {
        props.ride.status = 'Entregue'
    }
    return (
        <a onClick={() => router.push("/driverIndex" as never)} /*href={`/ride/${props.ride.id}`} */>
    <Card style={styles.card} header={Header}>
      <Layout style={styles.hStack}>
        <View>
          <Image
            source={require('../assets/images/pointab.svg')}
            style={{ width: 30, height: 64, marginLeft: 0, marginTop: 6 }}
            resizeMode="contain"
          />
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
          {props.ride.isCarro}
        </Text>
        <View style={styles.flexEnd}>
          <Text style={styles.textMain}>
            {props.data}
          </Text>
        </View>
      </Layout>
    </Card>

        </a>
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
      borderRadius: 20,
    },
    textMain: {
      color: '#484848',
      backgroundColor: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
      maxWidth: '100%',
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