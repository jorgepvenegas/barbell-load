import { View, Text, Pressable, ScrollView } from 'react-native';
import { useStore } from '../../src/stores/useStore';
import { useThemeStore } from '../../src/stores/useThemeStore';
import { BarbellSelector } from '../../src/components/BarbellSelector';
import { PlateSelector } from '../../src/components/PlateSelector';

export default function SettingsScreen() {
  const { isHydrated } = useStore();
  const { theme, toggleTheme, isHydrated: themeHydrated } = useThemeStore();

  if (!isHydrated || !themeHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 gap-6">
        <Text className="text-[34px] font-bold text-purple-600">Settings</Text>

        <BarbellSelector />

        <PlateSelector />

        <View className="flex flex-col gap-4 w-full">
          <Text className="text-xl font-bold text-purple-600">Theme</Text>
          <Pressable
            className="bg-purple-600 p-4 rounded-lg"
            onPress={toggleTheme}
          >
            <Text className="text-white text-center font-semibold">
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
