import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry  } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { RootSiblingParent } from 'react-native-root-siblings';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';

const customEvaTheme = {
  ...eva.dark, // or eva.dark for dark mode
  // Override colors with your theme
  'color-primary-500': theme['color-brand-green'],
  'color-primary-400': theme['color-brand-green'],
  'color-primary-600': theme['color-brand-green-600'],
  'color-basic-800': theme['color-brand-blue'],
  // Add more customizations as needed
};

export default function RootLayout() {
  return (
    <RootSiblingParent>
    <StatusBar style="light" backgroundColor="#1a1c51" />
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...customEvaTheme, ...theme }}>
    <Stack screenOptions={{ headerShown: false, statusBarColor: '#1a1c51' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="driverIndex/index" />
    </Stack>
    </ApplicationProvider>
    </RootSiblingParent> 
  );
}
