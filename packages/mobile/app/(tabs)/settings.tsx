import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarbellSelector } from '@/components/calculator/BarbellSelector';
import { PlateSelector } from '@/components/calculator/PlateSelector';
import { useStore } from '@/store/useStore';
import { useThemeStore } from '@/store/useThemeStore';

export default function SettingsScreen() {
  const { isHydrated } = useStore();
  const { isHydrated: themeHydrated, theme, toggleTheme } = useThemeStore();

  if (!isHydrated || !themeHydrated) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top']}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-foreground-secondary">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1">
        <View className="p-6 gap-6">
          <Text className="text-3xl font-bold text-foreground">Settings</Text>

          <BarbellSelector />

          <PlateSelector />

          <View className="flex flex-col gap-4 w-full">
            <Text className="text-xl font-bold text-foreground">Theme</Text>
            <Pressable
              className="flex flex-row items-center justify-between h-16 rounded-xl px-6 bg-surface"
              onPress={toggleTheme}
            >
              <Text className="text-lg font-bold text-foreground-secondary">
                {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
              </Text>
              <Text className="text-2xl">{theme === 'light' ? '☀️' : '🌙'}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
