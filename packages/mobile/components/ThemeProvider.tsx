import { View } from 'react-native';
import { vars } from 'nativewind';
import { useThemeStore } from '@/store/useThemeStore';

const themes = {
  light: vars({
    '--color-background': '255 255 255',
    '--color-surface': '243 244 246',
    '--color-primary': '139 92 246',
    '--color-text-primary': '88 28 135',
    '--color-text-secondary': '31 41 55',
    '--color-accent': '13 148 136',
    '--color-border': '229 231 235',
    '--color-tab-active': '139 92 246',
    '--color-tab-inactive': '156 163 175',
  }),
  dark: vars({
    '--color-background': '17 24 39',
    '--color-surface': '31 41 55',
    '--color-primary': '167 139 250',
    '--color-text-primary': '216 180 254',
    '--color-text-secondary': '229 231 235',
    '--color-accent': '45 212 191',
    '--color-border': '55 65 81',
    '--color-tab-active': '167 139 250',
    '--color-tab-inactive': '156 163 175',
  }),
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  return <View style={themes[theme]} className="flex-1">{children}</View>;
};
