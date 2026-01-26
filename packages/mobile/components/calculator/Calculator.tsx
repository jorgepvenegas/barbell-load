import { View, Text, ScrollView } from 'react-native';
import { WeightControls } from './WeightControls';
import { PlateResults } from './PlateResults';

export const Calculator = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 gap-6">
        <Text className="text-[34px] font-bold text-purple-600">Barbell Calc</Text>

        <WeightControls />

        <PlateResults />
      </View>
    </ScrollView>
  );
};
