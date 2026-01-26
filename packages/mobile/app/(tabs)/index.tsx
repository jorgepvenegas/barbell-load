import { View, Text } from 'react-native';
import { Calculator } from '@/components/calculator/Calculator';
import { useStore } from '@/store/useStore';

export default function CalculatorScreen() {
  const { isHydrated } = useStore();

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  return <Calculator />;
}
