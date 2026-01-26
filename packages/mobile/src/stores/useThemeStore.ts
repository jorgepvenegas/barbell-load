import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  isHydrated: boolean;
};

type ThemeActions = {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setHydrated: () => void;
};

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      isHydrated: false,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: '@mobile/theme',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export const useColorScheme = () => {
  const { theme } = useThemeStore();
  const systemColorScheme = useNativeColorScheme();

  return theme === 'dark' ? 'dark' : 'light';
};
