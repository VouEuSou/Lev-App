import { Button, Box, Card, CardHeader, CardBody, Spacer, Flex, HStack } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { UserContext } from '@/contexts/user';
import './ridesList.css';
export default function RidesListClient(props) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const host = process.env.NEXT_PUBLIC_HOST;
  const { UserAuth } = useContext(UserContext);

  async function confirmRide(id) {
    const response = await fetch(`${host}/pacotes/aceitar/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${UserAuth}`
      },
    });
    const data = await response.json();
    if (data.status === 'Encomenda aceita pelo entregador') {
      window.location.href = `/ride/${id}`;
    } else {
      alert('Error!');
    }
  }

  const distancia_km = (props.ride.distancia / 1000) + 0.6;
  const ano = props.ride.createdAt.substring(0, 4);
  const mes = props.ride.createdAt.substring(5, 7);
  const dia = props.ride.createdAt.substring(8, 10);
  const data = `${dia}/${mes}/${ano}`;
  const vehicleType = props.ride.isCarro ? 'Carro' : 'Moto';
  return (
    <>
      <Card mt={'20px'} style={{ backgroundColor: '#FBFBFB', boxShadow: '0px 5px 14.5px #B2B2B2', borderRadius: '27px', paddingLeft: '10px', paddingRight: '10px' }}>
        <CardHeader mt={'5px'}>
          <Flex>
            <Box>
              <h2 id='preco' style={{ color: '#1a1c51', fontWeight: 'bold', fontSize: '140%' }}>R$ {props.ride.preco}</h2>
            </Box>
            <Box>
              <h2 id='km' style={{ color: '#000000', fontWeight: 'bold', fontSize: '100%', marginLeft: '12px', marginTop: '5px', backgroundColor: '#D9D9D9', borderRadius: '20px', paddingInline: '8px' }}>
                {distancia_km.toFixed(2)} km
              </h2>
            </Box>
            <Spacer />
            <Box>
              <h2 id='data' style={{ color: '#000000', fontWeight: 'bold', fontSize: '100%' }}>{data}</h2>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <HStack mb={'20px'}>
            <Box id='ab'>
              <img src='/pointab.svg' width='30px' style={{ marginLeft: '0px' }} height='0px' alt="Point A to B" />
            </Box>
            <Box id='leftside'>
              <h2 style={{ color: '#484848', fontWeight: 'bold', fontSize: '100%', marginBottom: '42px', marginTop: '1px', maxWidth: '250px' }}>{props.ride.origem_endereco}</h2>
              <h2 style={{ color: '#989898', fontWeight: 'bold', fontSize: '100%', maxWidth: '250px', marginTop: '30px', filter: 'blur(4px)' }}>{props.ride.destino_endereco}</h2>
            </Box>
            <Box id='rightside' marginLeft={'40px'}>
              <h2 style={{ color: '#484848', fontWeight: 'bold', fontSize: '100%', marginTop: '10px' }}>Descrição</h2>
              <h2 style={{ color: '#000000', fontWeight: 'bold', fontSize: '100%', maxWidth: '150px' }}>{props.ride.descricao}</h2>
              <h2 style={{ color: '#484848', fontWeight: 'bold', fontSize: '100%', }}>Veículo solicitado:</h2>
              <h2 style={{ color: '#000000', fontWeight: 'bold', fontSize: '100%', }}>{vehicleType}</h2>

              <Button
                colorScheme='brand_green'
                style={{ color: '#1a1c51', fontWeight: 'bold', fontSize: '100%', marginLeft: '100px', marginTop: '40px', borderRadius: '30px', paddingTop: '0px' }}
                onClick={openModal}
              >
                Aceitar
              </Button>
            </Box>
          </HStack>
          <Box id='bottomside'>
            <h2 style={{ color: '#484848', fontWeight: 'bold', fontSize: '100%', marginTop: '10px' }}>Descrição</h2>
            <h2 style={{ color: '#000000', fontWeight: 'bold', fontSize: '100%', maxWidth: '150px' }}>{props.ride.descricao}</h2>
            <h2 style={{ color: '#484848', fontWeight: 'bold', fontSize: '100%', }}>Veículo solicitado:</h2>
            <h2 style={{ color: '#000000', fontWeight: 'bold', fontSize: '100%', }}>{vehicleType}</h2>

            <Flex justifyContent="flex-end">
              <Button
                colorScheme='brand_green'
                style={{ color: '#1a1c51', fontWeight: 'bold', fontSize: '100%', marginTop: '20px', borderRadius: '30px', paddingTop: '0px', paddingInline: '20%' }}
                onClick={openModal}
              >
                Aceitar
              </Button>
            </Flex>

          </Box>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent minWidth={'35vw'}>
          <ModalHeader>Detalhes da corrida:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p style={{ fontWeight: 'bold' }}>Preço: R$ {props.ride.preco}</p>
            <p style={{ fontWeight: 'bold' }}>Distância: {distancia_km.toFixed(2)} km</p>
            <p style={{ fontWeight: 'bold' }}>Data: {data}</p>
            <p style={{ fontWeight: 'bold' }}>Origem: {props.ride.origem_endereco}</p>
            <p style={{ fontWeight: 'bold' }}>Veículo: {vehicleType}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="danger" style={{ borderRadius: '30px' }} mr={3} onClick={closeModal}>Cancelar</Button>
            <Button colorScheme="brand_green" style={{ color: '#1a1c51', borderRadius: '30px' }} onClick={() => { confirmRide(props.ride.id); closeModal(); }}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}