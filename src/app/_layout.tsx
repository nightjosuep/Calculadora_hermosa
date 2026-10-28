import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../styles/global-styles';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    'blackOpsOne': require('@/assets/fonts/BlackOpsOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={globalStyles.background}>
      <StatusBar style="light" />
      <Slot />
    </View>
  );
}