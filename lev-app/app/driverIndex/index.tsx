import React from 'react';
import { Layout, BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Inicio } from '../../components/Inicio';
import { MinhasCorridas } from '../../components/MinhasCorridas';
import { Perfil } from '../../components/Perfil';
export default function BottomTabNavigation() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const tabContents = [
    <Inicio />,
    <MinhasCorridas />,
    <Perfil />,
  ];
  
  const renderTabContent = () => {
    return tabContents[selectedIndex] || tabContents[0];
  };

  return (
    <Layout style={styles.container} appearance='default'>
      {/* Render the selected tab's content */}
      {renderTabContent()}

      {/* Bottom Navigation Tab Bar */}
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.bottomNavigation}
      >
        <BottomNavigationTab title="Inicio" />
        <BottomNavigationTab title="Minhas Corridas" />
        <BottomNavigationTab title="Perfil" />
      </BottomNavigation>
    </Layout>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tabContent: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  bottomNavigation: {
    marginBottom: 0, // Makes sure it sticks at the bottom
  }
});
