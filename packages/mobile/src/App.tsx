import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './stores/AppContext';
import { ThemeProvider } from './stores/ThemeContext';
import { RootNavigator } from './navigation/RootNavigator';
import { useTheme } from './stores/ThemeContext';

function Navigation() {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.purple,
          background: theme.pageBg,
          card: theme.cardBg,
          text: theme.textPrimary,
          border: theme.border,
          notification: theme.pink,
        },
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
