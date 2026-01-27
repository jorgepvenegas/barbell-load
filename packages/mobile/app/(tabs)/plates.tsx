import { View, Text } from 'react-native';
import { Plates } from '@/components/calculator/Plates';
import { useStore } from '@/store/useStore';

export default function PlatesScreen() {
  const { isHydrated } = useStore();

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-foreground-secondary">Loading...</Text>
      </View>
    );
  }

  return <Plates />;
}
