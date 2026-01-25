import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, LIGHT_THEME, DARK_THEME, type Theme } from '../theme/colors';

const THEME_STORAGE_KEY = 'barbell-theme';

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [isLoading, setIsLoading] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        setIsDark(stored === DARK_THEME);
      } else if (colorScheme) {
        setIsDark(colorScheme === 'dark');
      }
    } catch (e) {
      console.error('Failed to load theme preference:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newIsDark ? DARK_THEME : LIGHT_THEME);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  const setThemeValue = async (themeValue: 'light' | 'dark') => {
    try {
      const newIsDark = themeValue === DARK_THEME;
      setIsDark(newIsDark);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeValue);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme: setThemeValue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
