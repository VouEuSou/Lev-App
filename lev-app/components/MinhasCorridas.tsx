import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ScrollView, StyleSheet } from 'react-native';
import RidesListAssignedDriver from '@/components/ridesListAssignedDriver';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const host = "https://beloved-burro-stunning.ngrok-free.app";
interface Ride {
  id: number;
  descricao: string;
  data: string;
  preco: string;
  origem_endereco: string;
  origem_coord: {
      crs: {
          type: string;
          properties: {
              name: string;
          };
      };
      type: string;
      coordinates: [number, number];
  };
  destino_endereco: string;
  destinatario_nome: string;
  destinatario_telefone: string;
  destino_coord: {
      crs: {
          type: string;
          properties: {
              name: string;
          };
      };
      type: string;
      coordinates: [number, number];
  };
  status: string;
  usuario_id: number;
  entregador_id: number | null;
  distancia: number;
  isCarro: boolean;
  pinMotorista: string;
  pinUsuario: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


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

export const MinhasCorridas = () => {
    const [rides, setRides] = useState<Ride[]>([]);

    useEffect(() => {
        async function getRides() {
            const user = await getUserInfo();
            console.log("UserAuth:", user);

            if (user && user.auth) { 
                const response = await fetch(`${host}/pacotes/aceitos`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${user.auth}`,
                    },
                });
                const dados: Ride[] = await response.json();
                const sortedRides = dados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
                setRides(sortedRides);
            } else {
                console.log('User not authenticated, skipping fetch');
            }
        }

        getRides();
    }, []);

    return (
        <Layout style={styles.page}>
            <Text category="h1" style={styles.title}>Minhas Corridas</Text>
            <ScrollView contentContainerStyle={styles.rideListContainer}>
                {rides.map((ride) => (
                    <RidesListAssignedDriver key={ride.id} ride={ride} host={host} />
                )) || router.replace('/')}
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#1a1c51',
        alignItems: 'center',
    },
    title: {
        color: '#FFFF',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    rideListContainer: {
        marginHorizontal: 10,
    },
});

export default MinhasCorridas;
