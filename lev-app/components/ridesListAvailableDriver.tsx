import React, { useState } from 'react';
import { Button, Card, Modal, Text, Layout, Divider, ListItem, List, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

export default function RidesListClient({ ride }: { ride: any }) {
  const [visible, setVisible] = useState(false);
  const host = "https://beloved-burro-stunning.ngrok-free.app";
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const router = useRouter();

  const confirmRide = async (id: string) => {
    const UserAuth = await AsyncStorage.getItem('user_logado');

    if (!UserAuth) {
      console.error('User authentication data not found');
      return;
    }

    try {
      const parsedUserAuth = JSON.parse(UserAuth);
      const response = await fetch(`${host}/pacotes/aceitar/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${parsedUserAuth.auth}`,
        },
      });
      const data = await response.json();
      if (data.status === 'Encomenda aceita pelo entregador') {
        // Navigate to the ride details page or perform another action
        alert('Corrida aceita com sucesso');
        closeModal();
        router.push('/driverIndex')
      } else {
        alert(`Erro: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const distancia_km = (ride.distancia / 1000 + 0.6).toFixed(2);
  const data = `${ride.createdAt.substring(8, 10)}/${ride.createdAt.substring(5, 7)}/${ride.createdAt.substring(0, 4)}`;
  const vehicleType = ride.isCarro ? 'Carro' : 'Moto';

  return (
    <>
      <Card style={styles.card} onPress={openModal}>
        <Text category="h5" style={styles.price}>R$ {ride.preco}</Text>
        <Text style={styles.cardText} category="label">{distancia_km} km</Text>
        <Text style={styles.cardText} category="label">{data}</Text>
        <Text category="s1" style={styles.description}>Descrição: {ride.descricao}</Text>
        <Text style={styles.cardText} category="label">Veículo solicitado: {vehicleType}</Text>
        <Button style={styles.button} onPress={openModal}>Aceitar</Button>
      </Card>

      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={closeModal}>
        <Card style={styles.modal} disabled={true}>
          <Text style={styles.cardText} category="h5">Detalhes da corrida:</Text>
          <Divider style={styles.divider} />
          <Text style={styles.cardText}>Preço: R$ {ride.preco}</Text>
          <Text style={styles.cardText}>Distância: {distancia_km} km</Text>
          <Text style={styles.cardText}>Data: {data}</Text>
          <Text style={styles.cardText}>Origem: {ride.origem_endereco}</Text>
          <Text style={styles.cardText}>Veículo: {vehicleType}</Text>
          <Button style={styles.cancelButton} onPress={closeModal}>Cancelar</Button>
          <Button style={styles.confirmButton} onPress={() => { confirmRide(ride.id); closeModal(); }}>
            Confirmar
          </Button>
        </Card>
      </Modal>
      </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 20,
    minWidth: 350,
    width: '100%',
    backgroundColor: '#FFFF',
    alignSelf: 'center'},

    cardText: {
      color: '#1a1c51',
      fontSize: 16,
      marginBottom: 8 },

  price: {
    color: '#1a1c51',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8 },

  description: {
    color: '#1a1c51',
    marginBottom: 10 },

  button: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,},

  divider: {
    marginVertical: 10 },

  cancelButton: {
    marginTop: 10, backgroundColor: '#FF5050',borderColor: '#FF5050' , borderRadius: 20,  color: '#FFFF' },

  confirmButton: {
    marginTop: 10, borderRadius: 20, color: '#FFFF' },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)' },

  modal: {
    backgroundColor: '#FFFF',
    borderRadius: 20,
    alignItems: 'center' }
});
