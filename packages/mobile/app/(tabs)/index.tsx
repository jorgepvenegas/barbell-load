import { View, Text } from 'react-native';
import { Calculator } from '@/components/calculator/Calculator';
import { useStore } from '@/store/useStore';

export default function CalculatorScreen() {
  const { isHydrated } = useStore();

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-foreground-secondary">Loading...</Text>
      </View>
    );
  }

  return <Calculator />;
}
