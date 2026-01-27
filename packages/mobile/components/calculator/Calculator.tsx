import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WeightControls } from './WeightControls';
import { PlateResults } from './PlateResults';

export const Calculator = () => {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1">
        <View className="p-6 gap-6">
          <Text className="text-3xl font-bold text-foreground">Barbell Calc</Text>

          <WeightControls />

          <PlateResults />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
