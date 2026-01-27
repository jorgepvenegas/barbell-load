import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo, useEffect } from 'react';
import type { PlateWeight } from '@barbell/shared';
import { useStore } from '@/store/useStore';

export const Plates = () => {
  const { selectedPlates, barWeight } = useStore();

  const enabledPlates = useMemo(
    () => selectedPlates.filter(({ enabled }) => enabled),
    [selectedPlates]
  );

  const [plateCounts, setPlateCounts] = useState<Record<PlateWeight, number>>(
    Object.fromEntries(enabledPlates.map((plate) => [plate.weight, 0])) as Record<PlateWeight, number>
  );

  useEffect(() => {
    const currentEnabledWeights = new Set(enabledPlates.map((p) => p.weight));
    setPlateCounts((prev) => {
      const newCounts = { ...prev };
      (Object.keys(newCounts) as unknown as PlateWeight[]).forEach((weight) => {
        if (!currentEnabledWeights.has(weight)) {
          delete newCounts[weight];
        }
      });
      enabledPlates.forEach((plate) => {
        if (!(plate.weight in newCounts)) {
          newCounts[plate.weight] = 0;
        }
      });
      return newCounts;
    });
  }, [enabledPlates]);

  const totalWeight = useMemo(() => {
    const plateWeight = Object.entries(plateCounts).reduce(
      (sum, [weight, count]) => sum + Number(weight) * count * 2,
      0
    );
    return plateWeight + barWeight;
  }, [plateCounts, barWeight]);

  const handleIncrement = (weight: PlateWeight) => {
    setPlateCounts((prev) => ({ ...prev, [weight]: prev[weight] + 1 }));
  };

  const handleDecrement = (weight: PlateWeight) => {
    setPlateCounts((prev) => ({
      ...prev,
      [weight]: Math.max(0, prev[weight] - 1),
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView className="flex-1">
        <View className="p-6 gap-6">
          <Text className="text-3xl font-bold text-purple-800">Plate Counter</Text>

          <View className="flex flex-col gap-4 w-full">
            <Text className="text-xl font-bold text-purple-900">Total Weight</Text>
            <View className="flex flex-col gap-1 rounded-xl p-6 bg-teal-600">
              <Text className="text-4xl font-extrabold text-white">{totalWeight} lb</Text>
              <Text className="text-[15px] font-medium text-white opacity-80">
                {barWeight} lb Olympic Bar + Plates
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-4 w-full">
            <Text className="text-xl font-bold text-purple-900">Plates  Per Side</Text>
            <View className="flex flex-col gap-5 rounded-xl p-6 bg-gray-100">
              {enabledPlates.map((plate) => (
                <View key={plate.weight} className="flex flex-row items-center justify-between w-full">
                  <Text className="text-xl font-semibold text-gray-800">{plate.weight} lb</Text>
                  <View className="flex flex-row items-center gap-3">
                    <Pressable
                      className={`flex items-center justify-center w-9 h-9 rounded-[18px] bg-purple-800 ${
                        plateCounts[plate.weight] === 0 && 'opacity-50'
                      }`}
                      onPress={() => handleDecrement(plate.weight)}
                      disabled={plateCounts[plate.weight] === 0}
                    >
                      <Text className="text-xl text-white">-</Text>
                    </Pressable>
                    <Text className="text-xl font-bold text-center min-w-[24px] text-gray-800">
                      {plateCounts[plate.weight]}
                    </Text>
                    <Pressable
                      className="flex items-center justify-center w-9 h-9 rounded-[18px] bg-purple-800"
                      onPress={() => handleIncrement(plate.weight)}
                    >
                      <Text className="text-xl text-white">+</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
