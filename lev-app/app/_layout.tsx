import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { RootSiblingParent } from 'react-native-root-siblings';

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
    <ApplicationProvider {...eva} theme={{ ...customEvaTheme, ...theme }}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="driverIndex/index" />
    </Stack>
    </ApplicationProvider>
    </RootSiblingParent> 
  );
}
