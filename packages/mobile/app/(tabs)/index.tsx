import { View, Text } from 'react-native';
import { useStore } from '../../src/stores/useStore';
import { Calculator } from '../../src/components/Calculator';

export default function CalculatorScreen() {
  const { isHydrated } = useStore();

  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  return <Calculator />;
}
