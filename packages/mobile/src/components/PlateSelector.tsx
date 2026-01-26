import { View, Text, Pressable, ScrollView } from 'react-native';
import { useStore } from '../stores/useStore';

export const PlateSelector = () => {
  const { selectedPlates, setSelectedPlates } = useStore();

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlates = selectedPlates.map(({ enabled, weight }, i) => ({
      enabled: index === i ? !enabled : enabled,
      weight,
    }));
    setSelectedPlates(updatedSelectedPlates);
  };

  return (
    <View className="flex flex-col gap-4 w-full">
      <Text className="text-xl font-bold text-purple-600">Available Plates</Text>
      <View className="flex flex-col gap-4 rounded-xl p-6 bg-gray-100">
        {selectedPlates.map(({ enabled, weight }, index) => (
          <Pressable
            key={weight}
            className="flex flex-row items-center gap-4 w-full"
            onPress={() => handlePlateCheckbox(index)}
          >
            <View
              className={`flex items-center justify-center w-7 h-7 rounded-lg ${
                enabled ? 'bg-purple-600' : 'bg-transparent border-2 border-gray-400'
              }`}
            >
              {enabled && <Text className="text-white text-sm">✓</Text>}
            </View>
            <Text className="text-base font-semibold text-gray-900">{weight} lb</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
